import type { Database } from "./supabase"

export interface RoomsContextType {
  rooms: Room[] | null
  getRooms: () => Promise<void>
  addUser: (roomId: number, user: string) => Promise<{success: boolean, message: string}>
  loading: boolean
  fetchError: string
}

export interface Room {
  id: number
  name: string
  location: Database["public"]["Enums"]["location"]
  number: string
  type: Database["public"]["Enums"]["room_type"]
  allowed_users: {
    user: string
  }[]
}