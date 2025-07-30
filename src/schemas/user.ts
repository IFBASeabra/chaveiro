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

export type loginSchemaType = z.infer<typeof loginSchema>
export type registerSchemaType = z.infer<typeof registerSchema>