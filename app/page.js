import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-6xl mx-auto py-20 px-6">
      <header className="mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Latest Stories
        </h1>
        <p className="mt-4 text-slate-500 text-lg">
          Detailed guides and technical deep-dives.
        </p>
      </header>

      {/* The Card Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="h-full flex flex-col p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                <img
                  src={
                    post.image ||
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                  }
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <time className="text-xs font-bold uppercase tracking-widest text-blue-600">
                {post.date}
              </time>
              <h2 className="text-2xl font-bold text-slate-900 mt-4 group-hover:text-blue-600 transition">
                {post.title}
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm line-clamp-3">
                Exploring the architecture of {post.title}. A deep dive into
                modern development practices and performance optimization.
              </p>

              <div className="mt-auto pt-8 flex items-center text-sm font-semibold text-slate-900">
                Read Full Post
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
