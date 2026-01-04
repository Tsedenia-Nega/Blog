'use client';
import { useState,useEffect } from "react";
import { supabase } from "@/lib/supabase";


export default function AdminPanel(){
    const [title,setTitle]= useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent]= useState('');
    const [imageUrl,setImageUrl]= useState('');
    const [loading,setLoading]= useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [currentAuthorId, setCurrentAuthorId] = useState("");

    const handlePublish= async(e)=>{
        e.preventDefault();
        if (!selectedCategoryId) {
          alert("Please select a category!");
          return;
        }
        setLoading(true);
        const { error } = await supabase.from("posts").insert([
          {
            title,
            slug,
            content,
            image_url: imageUrl,
            isPublished: true,
            category_id: Number(selectedCategoryId),
          },
        ]);
        if(error){
            alert(error.message);
        } else{
            alert('Post published successfully');
            setTitle('');
            setSlug(''); setContent(''); setImageUrl('');
        } setLoading(false);
    };
useEffect(() => {
  async function getCategories() {
    console.log("Fetching categories..."); // Debug 1
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      console.error("Supabase Error:", error.message);
    } else {
      console.log("Categories received:", data); // Debug 2
      setCategories(data || []);
      if (data && data.length > 0) {
        setSelectedCategoryId(data[0].id);
      }
    }
  }
  getCategories();
}, []);
return (
  <main className="max-w-4xl mx-auto px-6 py-20">
    <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
    <form
      onSubmit={handlePublish}
      className="space-y-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
    >
      <div>
        <label className="block text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          placeholder="Title of your blog"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 "
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Slug (URL path)</label>
        <input
          type="text"
          value={slug}
          placeholder="how you do it"
          onChange={(e) => setSlug(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 "
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Cover Image URL</label>
        <input
          type="text"
          value={imageUrl}
          placeholder="Title of your blog"
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 "
        />
      </div>
      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="p-4 rounded-xl border border-slate-200"
      >
        <option value="">Select a Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <div>
        <label className="block text-sm font-bold mb-2">
          Content (Markdown supported)
        </label>
        <textarea
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          placeholder="Write your story..."
        />
      </div>
      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transtion disabled:bg-slate-300"
      >
        {loading ? "Publishing..." : "Publish Post"}
      </button>
    </form>
  </main>
);


}