"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import SearchInput from "./SearchInput";
import { SearchGrid } from "./SearchGrid";

type ApiPage = {
  results: PageObjectResponse[];
  has_more: boolean;
  next_cursor?: string | null;
};

async function fetchAllPosts(): Promise<PageObjectResponse[]> {
  let cursor: string | undefined;
  const all: PageObjectResponse[] = [];
  do {
    const qs = new URLSearchParams({ limit: "50" });
    if (cursor) qs.set("cursor", cursor);
    const res = await fetch(`/api/posts?${qs.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data: ApiPage = await res.json();
    all.push(...data.results);
    cursor = data.has_more ? (data.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return all;
}

export default function SearchClient() {
  const [keyword, setKeyword] = useState("");
  const hasQuery = keyword.trim().length > 0;

  const {
    data: allPosts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", "all"],
    queryFn: fetchAllPosts,
    staleTime: 5 * 60 * 1000,
  });

  const filtered = useMemo(() => {
    if (!hasQuery) return [];
    const terms = keyword.toLowerCase().split(/\s+/).filter(Boolean);
    return allPosts.filter((post) => {
      const title =
        post.properties?.Title?.type === "title"
          ? post.properties.Title.title.map((t) => t.plain_text).join(" ")
          : "";
      return terms.every((t) => title.toLowerCase().includes(t));
    });
  }, [hasQuery, keyword, allPosts]);

  return (
    <div className="max-w-3xl mx-auto py-40">
      <h1 className="text-4xl font-bold mb-3 mx-5 sm:mx-0">Search Post</h1>
      <SearchInput keyword={keyword} setKeyword={setKeyword} />
      {!hasQuery ? null : isLoading ? (
        <p className="text-gray-500 mt-5 text-center md:text-xl text-lg">
          불러오는 중…
        </p>
      ) : isError ? (
        <p className="text-red-400 mt-5 text-center md:text-xl text-lg">
          에러가 발생했습니다.
        </p>
      ) : filtered.length > 0 ? (
        <SearchGrid posts={filtered} />
      ) : (
        <p className="text-gray-500 mt-5 text-center md:text-xl text-lg">
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
}
