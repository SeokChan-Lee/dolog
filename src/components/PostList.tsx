import { getDatabase } from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";

export default async function PostList() {
  const response = await getDatabase();

  const pages = response.results.filter(
    (page): page is PageObjectResponse => "properties" in page
  );

  return (
    <ul className="space-y-4">
      {pages.map((page) => {
        const titleProp = page.properties?.Title;
        const slugProp = page.properties?.Slug;

        const title =
          titleProp?.type === "title" && titleProp.title.length > 0
            ? titleProp.title[0].plain_text
            : "제목 없음";

        const slug =
          slugProp?.type === "rich_text" && slugProp.rich_text.length > 0
            ? slugProp.rich_text[0].plain_text
            : "";

        return (
          <li key={page.id} className="border-b pb-2">
            <Link href={`/posts/${slug}`} className=" hover:underline">
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
