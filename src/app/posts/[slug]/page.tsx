import { getDatabase, getPageContentBySlug } from "@/lib/notion";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { NotionRenderer } from "@/components/NotionRenderer";
import { formatDate } from "@/utils/formatDate";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function generateStaticParams() {
  const response = await getDatabase();
  const pages = response.results.filter(
    (page): page is PageObjectResponse => "properties" in page
  );

  return pages
    .map((page) => {
      const slug =
        page.properties?.Slug?.type === "rich_text"
          ? page.properties.Slug.rich_text[0]?.plain_text
          : undefined;
      return slug ? { slug } : null;
    })
    .filter(Boolean) as { slug: string }[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getPageContentBySlug(slug);
  if (!content) return {};
  return {
    title: content.title,
    description: content.excerpt || "Notion Post Detail",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageData = await getPageContentBySlug(slug);

  if (!pageData) return notFound();

  return (
    <main className="max-w-3xl mx-auto py-50 px-7 md:px-0">
      <h1 className="text-4xl font-bold mb-2">{pageData.title}</h1>
      <p className="text-md text-gray-500 mb-10 border-b-2 pb-10">
        {formatDate(pageData.date)}
      </p>
      <NotionRenderer blocks={pageData.blocks} />
    </main>
  );
}
