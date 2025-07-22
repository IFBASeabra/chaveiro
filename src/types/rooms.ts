import type { Database } from "./supabase"

export interface Room {
  id?: number
  name: string
  location: Database["public"]["Enums"]["location"]
  number: string
  type: Database["public"]["Enums"]["room_type"]
  allowed_users: {
    user: string
  }[]
}