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
    user_rooms (
      users(id, name, register)
    ),
    reservations (
      id,
      status,
      updated_at,
      created_at,
      users(name)
    )`
  )
  .order('location', {ascending: true})
  .limit(1, { foreignTable: 'reservations' });}