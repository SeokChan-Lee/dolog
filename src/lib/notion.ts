import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { ExtendedBlock } from "@/types/notionTypes";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getDatabase(cursor?: string, pageSize = 10) {
  if (!process.env.NOTION_TOKEN) throw new Error("Missing NOTION_TOKEN");
  if (!process.env.NOTION_DATABASE_ID)
    throw new Error("Missing NOTION_DATABASE_ID");

  return await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
    page_size: pageSize,
    start_cursor: cursor,
  });
}

async function getAllBlocks(blockId: string): Promise<ExtendedBlock[]> {
  const blocks: ExtendedBlock[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });

    for (const block of response.results) {
      if (block.object === "block" && "type" in block) {
        const extendedBlock: ExtendedBlock = {
          ...(block as BlockObjectResponse),
        };

        if (extendedBlock.has_children) {
          const children = await getAllBlocks(extendedBlock.id);
          extendedBlock.children = children;
        }

        blocks.push(extendedBlock);
      }
    }

    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return blocks;
}

export async function getPageContentBySlug(slug: string): Promise<{
  title: string;
  excerpt: string;
  date: string;
  author: string;
  blocks: ExtendedBlock[];
}> {
  const response = await getDatabase();

  const page = response.results.find(
    (page): page is PageObjectResponse =>
      "properties" in page &&
      page.properties?.Slug?.type === "rich_text" &&
      Array.isArray(page.properties.Slug.rich_text) &&
      page.properties.Slug.rich_text[0]?.plain_text === slug
  );

  if (!page) throw new Error("Page not found");

  const blocks = await getAllBlocks(page.id);

  const titleProp = page.properties?.Title;
  const title =
    titleProp?.type === "title" && titleProp.title.length > 0
      ? titleProp.title[0].plain_text
      : "제목 없음";

  const excerptProp = page.properties?.Content;
  const excerpt =
    excerptProp?.type === "rich_text" && excerptProp.rich_text.length > 0
      ? excerptProp.rich_text[0].plain_text
      : "";

  const dateProp = page.properties?.Date;
  const date = dateProp?.type === "date" ? (dateProp.date?.start ?? "") : "";

  const authorProp = page.properties?.Author;
  const author =
    authorProp?.type === "rich_text" && authorProp.rich_text.length > 0
      ? authorProp.rich_text[0].plain_text
      : "작성자 없음";

  return {
    title,
    excerpt,
    date,
    author,
    blocks,
  };
}
