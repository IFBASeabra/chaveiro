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
  endReservation: (id: number) => Promise<void>
  createReservation: (user: number, id: number) => Promise<void>
  loading: boolean
  fetchError: string
}

export interface Room {
  id: number
  name: string
  number: string
  type: Database["public"]["Enums"]["room_type"]
  location: Database["public"]["Enums"]["location"]
  user_rooms?: UserRooms[]
  reservations?: Reservation[] | null
}

export interface Reservation {
  id: number
  user_id: number
  room_id: number
  status: string
  created_at: string
  updated_at: string | null
  users?: {
    name: string
  }
}

export interface UserRooms {
  id: number
  room_id: number
  user_id: number
  expires_in?: number | null
  rooms?: Room
  users?: User
}
export interface User {
  id: number
  name: string
  register: string
  type?: Database["public"]["Enums"]["profile"]
  user_rooms?: UserRooms[]
  reservations?: Reservation[]
}