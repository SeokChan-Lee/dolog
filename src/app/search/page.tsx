import { getDatabase } from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import SearchClient from "@/components/SearchClient";

export default async function SearchPage() {
  const response = await getDatabase();
  const pages = response.results.filter(
    (page): page is PageObjectResponse => "properties" in page
  );

  return <SearchClient posts={pages} />;
}
