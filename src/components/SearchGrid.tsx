"use client";

import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function SearchGrid({ posts }: { posts: PageObjectResponse[] }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {posts.map((page) => {
        const titleProp = page.properties?.Title;
        const slugProp = page.properties?.Slug;
        const dateProp = page.properties?.Date;
        const tagsProp = page.properties?.Tags;

        const title =
          titleProp?.type === "title" && titleProp.title.length > 0
            ? titleProp.title[0].plain_text
            : "제목 없음";

        const slug =
          slugProp?.type === "rich_text" && slugProp.rich_text.length > 0
            ? slugProp.rich_text[0].plain_text
            : "";

        const date = dateProp?.type === "date" ? dateProp.date?.start : "";

        const tags =
          tagsProp?.type === "multi_select" ? tagsProp.multi_select : [];

        return (
          <Link
            href={`/posts/${slug}`}
            key={page.id}
            className="block rounded-xl overflow-hidden mx-5 sm:mx-0 hover:scale-105 transition-transform outline-1 hover:text-blue-200"
          >
            <div className="p-4">
              <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
              <p className="text-sm text-gray-500 my-1">
                {date ? formatDate(date) : ""}
              </p>
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 text-xs rounded-lg bg-blue-200 text-gray-700 font-bold"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
