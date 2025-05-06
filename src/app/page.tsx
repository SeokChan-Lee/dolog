import PostList from "@/components/PostList";

export default async function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dolog</h1>
      <PostList />
    </div>
  );
}
