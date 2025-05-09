"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface Props {
  posts: PageObjectResponse[];
}

export function SearchGrid({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {posts.map((page) => {
        const titleProp = page.properties?.Title;
        const slugProp = page.properties?.Slug;
        const coverProp = page.cover;
        const dateProp = page.properties?.Date;

        const title =
          titleProp?.type === "title" && titleProp.title.length > 0
            ? titleProp.title[0].plain_text
            : "제목 없음";

        const slug =
          slugProp?.type === "rich_text" && slugProp.rich_text.length > 0
            ? slugProp.rich_text[0].plain_text
            : "";

        const date = dateProp?.type === "date" ? dateProp.date?.start : "";

        const coverImage =
          coverProp?.type === "external"
            ? coverProp.external.url
            : coverProp?.type === "file"
              ? coverProp.file.url
              : "/assets/default_img/default_img.png";

        return (
          <Link
            href={`/posts/${slug}`}
            key={page.id}
            className="block rounded overflow-hidden mx-5 sm:mx-0 "
          >
            <Image
              src={coverImage}
              alt={title}
              width={600}
              height={300}
              className="w-full h-48 object-cover transition-transform duration-200 hover:scale-105"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-sm text-gray-500 mb-6">
                {date ? formatDate(date) : ""}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
