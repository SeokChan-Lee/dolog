import PostList from "@/components/PostList";

export default async function Home() {
  return (
    <main className="mx-auto max-w-3xl pt-50 pb-30">
      <PostList />
    </main>
  );
}
