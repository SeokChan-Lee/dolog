import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostsByTag } from "@/lib/notion";
import CategoryPostList from "@/components/CategoryPostList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return { title: `${tag} 카테고리 포스트` };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  const posts = await getAllPostsByTag(tag);
  if (posts.length === 0) return notFound();

  return (
    <main className="max-w-3xl mx-auto pt-50 pb-30 px-5 md:px-0">
      <h1 className="text-3xl font-bold mb-10">{tag}</h1>
      <CategoryPostList posts={posts} />
    </main>
  );
}
