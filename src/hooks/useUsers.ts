import { fetchUsers } from "@/api/fetchUsers"
import supabase from "@/lib/supabase"
import type { Room, UserRooms } from "@/types/rooms"
import { useEffect, useState } from "react"

export const useUsers = () => {
  const [users, setUsers] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState("")

  const getUsers = async () => {
    setLoading(true)
    const { data, error } = await fetchUsers()

    if (error) {
      setFetchError(`Houve um erro ao buscar as salas: ${error.message}`)
    }

    setUsers(data)

    setLoading(false)
  }
  const addRoomsToUser = async (rooms: Room[], user: number) => {
    const payload = rooms.map(room => ({ room_id: room.id, user_id: user }))

    const { data, error } = await supabase.from('user_rooms').insert(payload)

    await getUsers()

    return { data, error }
  }

  const removeRoomsFromUser = async (rooms: UserRooms[], user: number) => {
    const roomIds = rooms.map(({ rooms }) => rooms!.id)

    const { data, error } = await supabase
      .from('user_rooms')
      .delete()
      .eq('user_id', user)
      .in('room_id', roomIds)

    await getUsers()

    return { data, error }
  }

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true)
      const { data, error } = await fetchUsers()

      if (error) {
        setFetchError(`Houve um erro ao buscar as salas: ${error.message}`)
      }

      setUsers(data)

      setLoading(false)
    }

    getUsers()

  }, [])

  return { users, fetchError, loading, addRoomsToUser, removeRoomsFromUser }
}