import supabase from "@/lib/supabase";

export const fetchUsers = async () => {
  return supabase.from("users").select(`id, name, register, type, user_rooms(rooms(id, name, number))`)
}