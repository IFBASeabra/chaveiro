import { Controller, useForm } from 'react-hook-form'

import FormField from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { userSchema, type userSchemaType } from '@/schemas/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import Container from '@/components/layout/container'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Constants } from '@/types/supabase'
import { useUsers } from '@/hooks/useUsers'

const NewUser = () => {
  const {addUser, loading} = useUsers()
  // const [isTemp, setIsTemp] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<userSchemaType>({
    resolver: zodResolver(userSchema)
  })

  const addNewUser = async (data: userSchemaType) => {
    // const {success, message} = await addUser(activeRoom!.id, data.user, isTemp ? `${data.valid_until}` : undefined)
    const {success, message} = await addUser(data)
    if (success) {
      toast.success(message)
    } else{
      toast.error(message)
    }
    close()
  }

  return (
    <Container>
      <div className="w-full max-w-[600px]">
        <form onSubmit={handleSubmit(addNewUser)} className="flex flex-col gap-6">
          <FormField title="Nome Completo do Usuário" id="user" {...register('name')} error={errors.name} />
          <FormField title="Matrícula/CPF" id="register" {...register('register')} error={errors.register} />
        <div className="flex flex-col gap-2">
          <Label htmlFor="type">Tipo de Usuário</Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo de Usuário" />
                </SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.profile.map((item) => (
                    <SelectItem value={item} key={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <span className="text-sm text-red-500">{errors.type.message}</span>
          )}
        </div>
          {/* <div className="flex items-center gap-4 cursor-pointer">
            <Switch id="isTemp" checked={isTemp} onCheckedChange={() => { setIsTemp(!isTemp) }} />
            <Label htmlFor="isTemp">Liberação temporária</Label>
          </div>
          {isTemp && <FormField title="Liberado até" type="date" id="valid_until" {...register("valid_until")} error={errors.valid_until} />} */}
          <Button type="submit" disabled={loading}>{loading ? "Aguarde..." : "Cadastrar"}</Button>
        </form>
      </div>
    </Container>
  )
}

export default NewUser