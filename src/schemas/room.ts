import * as z from 'zod'
import { Constants, type Database } from '@/types/supabase'

export const RoomSchema = z.object({
  name: z.string().min(3, {message: "Você precisa informar um nome"}).nonempty(),
  number: z.string({message: "Informe um número válido"}),
  location: z.enum(
    Constants.public.Enums.location as unknown as [Database["public"]["Enums"]["location"], ...Database["public"]["Enums"]["location"][]],
    { message: "Selecione a localização do espaço" }
  ),
  type: z.enum(
    Constants.public.Enums.room_type as unknown as [Database["public"]["Enums"]["room_type"], ...Database["public"]["Enums"]["room_type"][]],
    { message: "Selecione o tipo de espaço" }
  ),
})

export type RoomSchemaType = z.infer<typeof RoomSchema>

