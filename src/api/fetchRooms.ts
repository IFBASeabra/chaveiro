import supabase from "@/lib/supabase";

export const fetchRooms = async () => {
return await supabase
  .from("rooms")
  .select(`
    id,
    name,
    number,
    type,
    location,
    allowed_users (
      id,
      user,
      valid_until
    ),
    reservations (
      id,
      status,
      updated_at,
      created_at,
      users(name)
    )`
  )
  .order('created_at', { foreignTable: 'reservations', ascending: false })
  .limit(1, { foreignTable: 'reservations' });}