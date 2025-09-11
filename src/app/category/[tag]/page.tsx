import { getDatabase } from "@/lib/notion";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CategoryPostList from "@/components/CategoryPostList";

interface Params {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  const response = await getDatabase();
  const pages = response.results.filter(
    (page): page is PageObjectResponse =>
      page.object === "page" && "properties" in page
  );

  const tagSet = new Set<string>();
  let hasUntagged = false;
  pages.forEach((page) => {
    const tagProp = page.properties["Tags"];
    if (tagProp.type === "multi_select" && tagProp.multi_select.length > 0) {
      tagProp.multi_select.forEach((t) => {
        if (t.name) tagSet.add(t.name);
      });
    } else {
      hasUntagged = true;
    }
  });
  if (hasUntagged) {
    tagSet.add("ETC");
  }

  return Array.from(tagSet).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `${tag} 카테고리 포스트`,
  };
}

export default async function CategoryPage({ params }: Params) {
  const { tag } = await params;
  const response = await getDatabase();
  const pages = response.results.filter(
    (page): page is PageObjectResponse =>
      page.object === "page" && "properties" in page
  );

  let filtered;
  if (tag.toLowerCase() === "etc") {
    filtered = pages.filter((page) => {
      const tagProp = page.properties["Tags"];
      return !(
        tagProp.type === "multi_select" && tagProp.multi_select.length > 0
      );
    });
  } else {
    filtered = pages.filter((page) => {
      const tagProp = page.properties["Tags"];
      return (
        tagProp.type === "multi_select" &&
        tagProp.multi_select.some(
          (tagItem) =>
            typeof tagItem.name === "string" &&
            tagItem.name.toLowerCase() === tag.toLowerCase()
        )
      );
    });
  }

  if (filtered.length === 0) return notFound();

  return (
    <main className="max-w-3xl mx-auto  py-40">
      <h1 className="text-3xl font-bold mb-10">{tag}</h1>
      <CategoryPostList posts={filtered} />
    </main>
  );
}
