import { SimpleBlogPost } from "@/components/BlogPost";

export default function BlogPage() {
  return (
    <main className="text-white p-5 flex flex-col gap-5">
      <div className="flex justify-center items-center">
        <h1 className="text-7xl font-medium">PWRUP Blog</h1>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-5xl font-medium mb-5">2025 Posts</div>
        <SimpleBlogPost
          title="Hello Post"
          description="This is a description of the post"
          date="2025-01-01"
          href="/blog/content/2025/hello"
        />
      </div>
    </main>
  );
}
