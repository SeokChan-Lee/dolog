import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  QueryDatabaseParameters,
} from "@notionhq/client/build/src/api-endpoints";
import type { ExtendedBlock } from "@/types/notionTypes";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

type GetDbOpts = {
  cursor?: string;
  pageSize?: number;
  tag?: string;
};

export async function getDatabase({
  cursor,
  pageSize = 10,
  tag,
}: GetDbOpts = {}) {
  if (!process.env.NOTION_TOKEN) throw new Error("Missing NOTION_TOKEN");
  if (!process.env.NOTION_DATABASE_ID)
    throw new Error("Missing NOTION_DATABASE_ID");

  const filter: QueryDatabaseParameters["filter"] = {
    and: [
      { property: "Published", checkbox: { equals: true } },
      ...(tag
        ? [{ property: "Tags", multi_select: { contains: tag } } as const]
        : []),
    ],
  };

  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter,
    sorts: [{ property: "Date", direction: "descending" }],
    page_size: pageSize,
    start_cursor: cursor,
  });
}

export async function getAllPostsByTag(
  tag: string
): Promise<PageObjectResponse[]> {
  let cursor: string | undefined;
  const all: PageObjectResponse[] = [];

  do {
    const res = await getDatabase({ cursor, pageSize: 50, tag });
    const pages = res.results.filter(
      (p): p is PageObjectResponse => p.object === "page" && "properties" in p
    );
    all.push(...pages);
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return all;
}

async function getAllBlocks(blockId: string): Promise<ExtendedBlock[]> {
  const blocks: ExtendedBlock[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });

    for (const b of res.results) {
      if (b.object === "block" && "type" in b) {
        const block = b as ExtendedBlock;
        if (block.has_children) {
          block.children = await getAllBlocks(block.id);
        }
        blocks.push(block);
      }
    }

    cursor = res.next_cursor ?? undefined;
  } while (cursor);

  return blocks;
}

export async function getPageContentBySlug(slug: string): Promise<{
  title: string;
  excerpt: string;
  date: string;
  author: string;
  blocks: BlockObjectResponse[];
}> {
  if (!process.env.NOTION_DATABASE_ID)
    throw new Error("Missing NOTION_DATABASE_ID");

  const filter: QueryDatabaseParameters["filter"] = {
    and: [
      { property: "Published", checkbox: { equals: true } },
      { property: "Slug", rich_text: { equals: slug } },
    ],
  };

  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter,
    page_size: 1,
  });

  const page = res.results.find(
    (p): p is PageObjectResponse => p.object === "page" && "properties" in p
  );
  if (!page) throw new Error("Page not found");

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

  const blocks = await getAllBlocks(page.id);

  return { title, excerpt, date, author, blocks };
}
