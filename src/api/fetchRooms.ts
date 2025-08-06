import supabase from "@/lib/supabase";

export const fetchRooms = async () => {
  return await supabase.from("rooms").select("id, name, number, type, location, allowed_users(id, user, valid_until)");
}