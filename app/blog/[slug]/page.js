import { getPostWithComments } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await getPostWithComments(slug); // Fetch from Supabase

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600 mb-8 inline-block">
          ← Back
        </Link>

        <article>
          <img src={post.image_url} className="w-full rounded-[32px] mb-8" />
          <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>

          {/* Author info */}
          <div className="flex items-center gap-3 mb-10">
            <img
              src={post.authors?.avatar_url}
              className="w-10 h-10 rounded-full"
            />
            <p className="font-medium">{post.authors?.name}</p>
          </div>

          {/* This renders the text you typed in the Admin Panel */}
          <div className="prose prose-slate lg:prose-lg max-w-none">
            {post.content}
          </div>
        </article>
      </div>
    </main>
  );
}
