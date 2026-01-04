import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// FETCH ALL (For Home Page)
// export async function getActivePosts() {
//   const { data, error } = await supabase
//     .from("posts")
//     .select("*, categories(name), authors(name, avatar_url)")
//     .eq("is_published", true)
//     .order("created_at", { ascending: false });
//   if (error) return [];
//   return data || [];
// }
export async function getActivePosts() {
  const { data, error } = await supabase.from("posts").select("*"); // NO filters, NO joins. Just raw data.

  if (error) {
    console.error("SUPABASE ERROR:", error.message);
    return [];
  }

  console.log("SUCCESS! DATA FOUND:", data);
  return data || [];
}
export async function getPostBySlug(slug) {
  // We decode the slug in case there are spaces or special characters
  const decodedSlug = decodeURIComponent(slug);

  const { data, error } = await supabase
    .from("posts")
    .select("*") // Remove authors/categories for a second to test
    .eq("slug", decodedSlug)
    .single();

  if (error) {
    console.error("Database error:", error.message);
    return null;
  }
  return data;
}
// FETCH ONE (For Article Page)
export async function getPostWithComments(slug) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, categories(name), authors(*), comments(*)")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

// UPDATE LIKES
export async function incrementLikes(postId, currentLikes) {
  const { data, error } = await supabase
    .from("posts")
    .update({ likes: currentLikes + 1 })
    .eq("id", postId)
    .select();
  return { data, error };
}
