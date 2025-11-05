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
        id,
        room_id,
        user_id,
        expires_in,
        users(id, name, register)
    ),
    reservations (
      id,
      status,
      user_id,
      room_id,
      updated_at,
      created_at,
      users(name)
    )`
    )
    .order('location', { ascending: false })
    .limit(1, { foreignTable: 'reservations' });
}