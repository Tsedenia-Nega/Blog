// lib/posts.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getAllPosts() {
  const files = fs.readdirSync(path.join(process.cwd(), "content"));
  return files.map((filename) => {
    const fileContent = fs.readFileSync(
      path.join("content", filename),
      "utf-8"
    );
    const { data } = matter(fileContent);
    return { slug: filename.replace(".md", ""), ...data ,
        image: data.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    };
  });
}

export function getPostBySlug(slug) {
  const fileContent = fs.readFileSync(
    path.join("content", `${slug}.md`),
    "utf-8"
  );
  const { data, content } = matter(fileContent);
  return { data, content };
}
