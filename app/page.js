import { getActivePosts } from "@/lib/supabase"; // Import database logic
import Link from "next/link";

export default async function Home() {
  const posts = await getActivePosts(); // Fetch from Supabase now

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <article className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image_url}
                  className="object-cover w-full h-full"
                  alt={post.title}
                />
              </div>
              <div className="p-6">
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                  {post.categories?.name}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  {post.title}
                </h2>
                <div className="flex items-center gap-2 mt-4">
                  <img
                    src={post.authors?.avatar_url}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-slate-500">
                    {post.authors?.name}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
