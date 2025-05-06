import { getDatabase } from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default async function PostList() {
  const response = await getDatabase();

  const pages = response.results.filter(
    (page): page is PageObjectResponse => "properties" in page
  );

  return (
    <ul className="space-y-4">
      {pages.map((page) => {
        const title =
          page.properties?.Title?.type === "title"
            ? page.properties.Title.title[0]?.plain_text
            : "제목 없음";

        return (
          <li key={page.id} className="border-b pb-2">
            {title}
          </li>
        );
      })}
    </ul>
  );
}
