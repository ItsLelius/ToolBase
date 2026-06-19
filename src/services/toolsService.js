import { supabase } from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getTools({ categoryId = null, search = "" } = {}) {
  let query = supabase
    .from("tools")
    .select("id, name, description, link, created_at, category_id, categories(name)")
    .eq("is_deleted", false)
    .order("name", { ascending: true });
  if (categoryId) query = query.eq("category_id", categoryId);
  if (search.trim()) query = query.ilike("name", `%${search.trim()}%`);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createTool(tool) {
  const { data, error } = await supabase.from("tools").insert([tool]).select().single();
  if (error) throw error;
  return data;
}

export async function updateTool(id, updates) {
  const { data, error } = await supabase.from("tools").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteTool(id) {
  const { error } = await supabase.from("tools").update({ is_deleted: true }).eq("id", id);
  if (error) throw error;
}