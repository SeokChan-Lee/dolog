import { getDatabase } from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import PostList from "@/components/PostList";

export default async function Home() {
  const response = await getDatabase();

  const posts = response.results.filter(
    (page): page is PageObjectResponse => "properties" in page
  );

  return (
    <div className="mx-auto max-w-3xl py-40">
      <PostList posts={posts} />
    </div>
  );
}
