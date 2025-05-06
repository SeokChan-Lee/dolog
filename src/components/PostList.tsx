import { getDatabase } from "@/lib/notion"; // 실제 경로에 맞게 수정

export default async function PostList() {
  const response = await getDatabase();

  return (
    <ul className="space-y-4">
      {response.results.map((page: any) => {
        const title =
          page.properties?.Title?.title?.[0]?.plain_text || "제목 없음";

        return (
          <li key={page.id} className="border-b pb-2">
            {title}
          </li>
        );
      })}
    </ul>
  );
}
