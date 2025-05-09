"use client";

import { useState, useMemo } from "react";
import { SearchGrid } from "./SearchGrid";
import SearchInput from "./SearchInput";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface Props {
  posts: PageObjectResponse[];
}

export default function SearchClient({ posts }: Props) {
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => {
    if (!keyword.trim()) return posts;

    const terms = keyword.toLowerCase().split(/\s+/).filter(Boolean);

    return posts.filter((post) => {
      const title =
        post.properties?.Title?.type === "title"
          ? post.properties.Title.title.map((t) => t.plain_text).join(" ")
          : "";

      return terms.every((term) => title.toLowerCase().includes(term));
    });
  }, [keyword, posts]);

  return (
    <div className="max-w-3xl mx-auto py-40 ">
      <h1 className="text-4xl font-bold mb-3 mx-5 sm:mx-0">Search Post</h1>
      <SearchInput keyword={keyword} setKeyword={setKeyword} />
      {filtered.length > 0 ? (
        <SearchGrid posts={filtered} />
      ) : (
        <p className="text-gray-500 mt-10 text-center text-2xl">
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
}
