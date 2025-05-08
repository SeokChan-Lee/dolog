import PostList from "@/components/PostList";

export default async function Home() {
  return (
    <div className=" mx-auto max-w-3xl pt-30">
      <PostList />
    </div>
  );
}
