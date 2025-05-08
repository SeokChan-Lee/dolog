import { getDatabase, getPageContentBySlug } from "@/lib/notion";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { NotionRenderer } from "@/components/NotionRenderer";
import { formatDate } from "@/utils/formatDate";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const revalidate = 60;

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
  params: { slug: string };
}): Promise<Metadata> {
  const content = await getPageContentBySlug(params.slug);
  if (!content) return {};
  return {
    title: content.title,
    description: content.excerpt || "Notion Post Detail",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const pageData = await getPageContentBySlug(params.slug);
  if (!pageData) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">{pageData.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {formatDate(pageData.date)} · by {pageData.author}
      </p>
      <NotionRenderer blocks={pageData.blocks} />
    </main>
  );
}
