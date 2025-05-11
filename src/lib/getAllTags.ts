"use server";

import { getDatabase } from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function getAllTags(): Promise<string[]> {
  const response = await getDatabase();
  const pages = response.results.filter(
    (page): page is PageObjectResponse => "properties" in page
  );

  const tagSet = new Set<string>();
  let hasUntagged = false;
  for (const page of pages) {
    const tagProp = page.properties?.Tags;
    if (tagProp?.type === "multi_select" && tagProp.multi_select.length > 0) {
      tagProp.multi_select.forEach((tag) => tagSet.add(tag.name));
    } else {
      hasUntagged = true;
    }
  }
  if (hasUntagged) {
    tagSet.add("ETC");
  }

  return Array.from(tagSet);
}
