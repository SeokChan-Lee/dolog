"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Spinner from "./Spinner";
import Image from "next/image";

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
  if (!res.ok) throw new Error("게시물을 불러올 수 없습니다.");
  return res.json();
}

export default function PostList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<ApiPage>({
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

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-40 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto py-40 flex flex-col justify-center">
        <Image
          src={"/assets/notFound_img/dolog_notFound_img.png"}
          width={300}
          height={300}
          alt="물음표 이미지"
          className="rounded-full"
        />
        <p className="font-bold text-2xl">오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-6 px-5 md:px-0">
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

          const date =
            dateProp?.type === "date" ? dateProp.date?.start || "" : "";

          const tags =
            tagsProp?.type === "multi_select" ? tagsProp.multi_select : [];

          return (
            <Link
              href={`/posts/${slug}`}
              key={page.id}
              className="block rounded-xl overflow-hidden hover:scale-105 transition-transform outline-1 hover:text-blue-200"
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-gray-500 my-1">
                  {date ? formatDate(date) : ""}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-1 text-xs rounded-lg bg-blue-200 text-gray-700 font-bold"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
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
