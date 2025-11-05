import { Constants, type Database } from '@/types/supabase'
import * as z from 'zod'

// Schema padrão para cadastro de usuários
export const registerSchema = z.object({
  email: z.email({message: "Informe um e-mail válido"}).nonempty({message: "Informe um e-mail válido"}),
  password: z.string().min(8, {message: "As senhas contém pelo menos 8 dígitos"}),
  confirm: z.string().min(8, {message: "Você precisa confirmar sua senha"})
})
.refine((data) => data.password === data.confirm, {
  message: "As senhas não coincidem. Verifique os dados e tente novamente"
})

//Usando a função omit, eu posso reaproveitar o schema de cadastro para o login, removendo (omitindo) os campos que não são necessários nesse cenário.
export const loginSchema = registerSchema.omit({confirm: true})

export const allowedUserSchema = z.object({
  user: z.string().regex(/[A-Z][a-z].* [A-Z][a-z].*/, {message: "Forneça nome e sobrenome"}),
  valid_until: z.string().optional()
})

export const userSchema = z.object({
  name: z.string().regex(/[A-Z][a-z].* [A-Z][a-z].*/, {message: "Forneça nome e sobrenome"}),
  register: z.string().regex(/[0-9].*/, {message: "Forneça a matrícula ou CPF"}),
  type: z.enum(
    Constants.public.Enums.profile as unknown as [Database["public"]["Enums"]["profile"], ...Database["public"]["Enums"]["profile"][]],
    { message: "Selecione o tipo Usuário" }
  ),
})

export type loginSchemaType = z.infer<typeof loginSchema>
export type registerSchemaType = z.infer<typeof registerSchema>
export type allowedUserType = z.infer<typeof allowedUserSchema>
export type userSchemaType = z.infer<typeof userSchema>

export  interface AllowedUser {
  id: number
  user: string
  valid_until?: string | null
}