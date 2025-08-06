import * as z from 'zod'

export const RoomSchema = z.object({
  name: z.string().min(3, {message: "Você precisa informar um nome"}).nonempty(),
  number: z.string({message: "Informe um número válido"}),
  location: z.string().nonempty({message: "Selecione a localização do espaço"}),
  type: z.string().nonempty({message: "Selecione o tipo de espaço"})
})

export type RoomSchemaType = z.infer<typeof RoomSchema>

