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
  updateUser: (id: number, user: string, valid_until?: string) => Promise<SupabaseResponse>
  updateRoom: (data: Omit<Room, "allowed_users">) => Promise<SupabaseResponse>
  addRoom: (data: RoomSchemaType) => Promise<SupabaseResponse>
  removeUser: (id: number) => Promise<SupabaseResponse>
  removeRoom: (id: number) => Promise<SupabaseResponse>
  endReservation: (id: number) => Promise<SupabaseResponse>
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
    id: number
    user: string
    valid_until?: string | null
  }[]
  reservations?: Reservation[]
}

export interface Reservation {
  id: number
  user_id: number
  room_id: number
  status: string
  created_at: string
  updated_at: string
  users?: {
    name: string
  }
}

export interface UserRooms {
  id: number
  room_id: number
  user_id: number
  expires_in: string
  rooms?: Room
}
export interface User {
  id: number
  name: string
  type: Database["public"]["Enums"]["profile"]
  user_rooms?: UserRooms[]
  reservations?: Reservation[]
}