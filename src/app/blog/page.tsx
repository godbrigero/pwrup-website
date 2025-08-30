import { SimpleBlogPost } from "@/components/BlogPost";
import { discoverPosts } from "@/lib/blog";

export const dynamic = "error";

export default function BlogPage() {
  const posts = discoverPosts();
  return (
    <main className="text-white p-5 flex flex-col gap-5 lg:mt-10 md:mt-16 mt-20 transition-all duration-300">
      <div className="flex justify-center items-center">
        <h1 className="lg:text-7xl md:text-5xl text-4xl font-medium">
          PWRUP Blog
        </h1>
      </div>

      <div className="flex flex-col gap-2">
        <div className="lg:text-5xl md:text-3xl text-2xl font-medium mb-5">
          2025 Posts
        </div>
        <div className="flex flex-wrap gap-5 lg:mx-5 md:mx-3">
          {posts.map((post, idx) => (
            <SimpleBlogPost key={idx} {...post} prefetch={idx < 5} />
          ))}
        </div>
      </div>
    </main>
  );
}
