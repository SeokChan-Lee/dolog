import Link from "next/link";
import { getAllTags } from "@/lib/getAllTags";

export default async function CategoryList() {
  const tags = await getAllTags();

  return (
    <div className="flex gap-4 font-bold text-xl items-center">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/category/${encodeURIComponent(tag)}`}
          className="hover:text-blue-200 transition-transform duration-200 hover:scale-105"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
