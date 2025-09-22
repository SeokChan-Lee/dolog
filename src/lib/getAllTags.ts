"use server";

import { getAllPages } from "@/lib/notion";

export async function getAllTags(): Promise<string[]> {
  const pages = await getAllPages();

  const tagSet = new Set<string>();
  for (const page of pages) {
    const tagProp = page.properties?.Tags;
    if (tagProp?.type === "multi_select" && tagProp.multi_select.length > 0) {
      tagProp.multi_select.forEach((tag) => tagSet.add(tag.name));
    }
  }

  return Array.from(tagSet);
}
