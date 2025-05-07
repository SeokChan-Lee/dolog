import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getDatabase() {
  return await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
}

export async function getPageContentBySlug(slug: string) {
  const response = await getDatabase();

  const page = response.results.find(
    (page): page is PageObjectResponse =>
      "properties" in page &&
      page.properties?.Slug?.type === "rich_text" &&
      Array.isArray(page.properties.Slug.rich_text) &&
      page.properties.Slug.rich_text[0]?.plain_text === slug
  );

  if (!page) throw new Error("Page not found");

  // blocks 가져오기
  const blocksRes = await notion.blocks.children.list({ block_id: page.id });
  const blocks = await Promise.all(
    blocksRes.results.map(async (block) => {
      if (
        block.object === "block" &&
        "type" in block &&
        block.type === "table"
      ) {
        const childrenRes = await notion.blocks.children.list({
          block_id: block.id,
        });
        return {
          ...block,
          children: childrenRes.results as BlockObjectResponse[],
        };
      }
      return block;
    })
  );

  // title
  const titleProp = page.properties?.Title;
  const title =
    titleProp?.type === "title" &&
    Array.isArray(titleProp.title) &&
    titleProp.title.length > 0
      ? titleProp.title[0].plain_text
      : "제목 없음";

  // excerpt
  const excerptProp = page.properties?.Content;
  const excerpt =
    excerptProp?.type === "rich_text" &&
    Array.isArray(excerptProp.rich_text) &&
    excerptProp.rich_text.length > 0
      ? excerptProp.rich_text[0].plain_text
      : "";

  // date
  const dateProp = page.properties?.Date;
  const date = dateProp?.type === "date" ? dateProp.date?.start || "" : "";

  // author
  const authorProp = page.properties?.Author;
  const author =
    authorProp?.type === "rich_text" &&
    Array.isArray(authorProp.rich_text) &&
    authorProp.rich_text.length > 0
      ? authorProp.rich_text[0].plain_text
      : "작성자 없음";

  return {
    title,
    excerpt,
    date,
    author,
    blocks: blocks as (BlockObjectResponse | PartialBlockObjectResponse)[],
  };
}
