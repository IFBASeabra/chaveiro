import type { RoomSchemaType } from "@/schemas/room"
import type { Database } from "./supabase"

export interface SupabaseResponse {
  success: boolean
  message: string
}

export interface RoomsContextType {
  rooms: Room[] | null
  getRooms: () => Promise<void>
  addUser: (roomId: number, user: string, valid_until?: string) => Promise<SupabaseResponse>
  addRoom: (data: RoomSchemaType) => Promise<SupabaseResponse>
  removeUser: (id: number) => Promise<SupabaseResponse>
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
    valid_until?: string | null
  }[]
}