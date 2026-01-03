import { getPostBySlug } from "@/lib/posts";
import { marked } from "marked";
import Link from "next/link";
export default async function Post({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const htmlContent = marked(post.content);

  return (
    <main className="bg-white min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-lg font-medium text-blue-600 hover:text-blue-700 mb-4 inline-block"
        >
          ← Back
        </Link>

        <article>
          {post.data.image && (
            <img
              src={post.data.image}
              className="w-full h-[400px] object-cover rounded-[32px] mb-8 shadow-2xl"
              alt={post.data.title}
            />
          )}
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4 sm:text-5xl">
              {post.data.title}
            </h1>
            <time className="text-slate-400 text-sm">{post.data.date}</time>
          </header>

          <div
            className="prose prose-slate lg:prose-lg max-w-none
            prose-headings:text-slate-900 prose-headings:font-bold
            prose-p:text-slate-600 prose-p:leading-8
            prose-strong:text-slate-900
            prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </main>
  );
}
