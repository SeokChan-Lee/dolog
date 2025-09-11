"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Spinner from "./Spinner";

type ApiPage = {
  results: PageObjectResponse[];
  has_more: boolean;
  next_cursor?: string | null;
};

async function fetchPosts({
  pageParam,
  signal,
}: {
  pageParam?: string;
  signal?: AbortSignal;
}): Promise<ApiPage> {
  const qs = pageParam ? `&cursor=${pageParam}` : "";
  const res = await fetch(`/api/posts?limit=10${qs}`, {
    signal,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function PostList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ApiPage>({
      queryKey: ["posts"],
      queryFn: ({ pageParam, signal }) =>
        fetchPosts({ pageParam: pageParam as string | undefined, signal }),
      getNextPageParam: (lastPage) =>
        lastPage.has_more ? (lastPage.next_cursor ?? undefined) : undefined,
      initialPageParam: undefined,
    });

  const posts: PageObjectResponse[] =
    data?.pages.flatMap((page) => page.results) ?? [];

  const loadMoreRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div className="max-w-3xl mx-auto ">
      <div className="grid grid-cols-1 gap-6">
        {posts.map((page) => {
          const titleProp = page.properties?.Title;
          const slugProp = page.properties?.Slug;
          const dateProp = page.properties?.Date;

          const title =
            titleProp?.type === "title" && titleProp.title.length > 0
              ? titleProp.title[0].plain_text
              : "제목 없음";

          const slug =
            slugProp?.type === "rich_text" && slugProp.rich_text.length > 0
              ? slugProp.rich_text[0].plain_text
              : "";

          const date =
            dateProp?.type === "date" ? dateProp.date?.start || "" : "";

          return (
            <Link
              href={`/posts/${slug}`}
              key={page.id}
              className="block rounded-xl overflow-hidden hover:scale-105 transition-transform outline-1 hover:text-blue-200"
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {date ? formatDate(date) : ""}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="h-10 flex justify-center items-center"
        >
          {isFetchingNextPage && <Spinner className="mt-10" />}
        </div>
      )}
    </div>
  );
}
