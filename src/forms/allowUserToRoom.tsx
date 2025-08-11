import { useState } from 'react'
import { useForm } from 'react-hook-form'

import FormField from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useRooms } from '@/hooks/useRooms'
import { allowedUserSchema, type allowedUserType } from '@/schemas/user'
import type { Room } from '@/types/rooms'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

const AllowUserToRoom = ({ activeRoom, close }: { activeRoom: Room, close: () => void }) => {
  const { addUser, loading } = useRooms()
  const [isTemp, setIsTemp] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<allowedUserType>({
    resolver: zodResolver(allowedUserSchema)
  })

  const addNewUser = async (data: allowedUserType) => {
    const {success, message} = await addUser(activeRoom!.id, data.user, isTemp ? `${data.valid_until}` : undefined)
    if (success) {
      toast.success(message)
    } else{
      toast.error(message)
    }
    close()
  }

  return (
    <>
      <form onSubmit={handleSubmit(addNewUser)} className="flex flex-col gap-6">
        <FormField title="Nome Completo do Usuário" id="user" {...register('user')} error={errors.user} />
        <div className="flex items-center gap-4 cursor-pointer">
          <Switch id="isTemp" checked={isTemp} onCheckedChange={() => { setIsTemp(!isTemp) }} />
          <Label htmlFor="isTemp">Liberação temporária</Label>
        </div>
        {isTemp && <FormField title="Liberado até" type="date" id="valid_until" {...register("valid_until")} error={errors.valid_until} />}
        <Button type="submit" disabled={loading}>{loading ? "Aguarde..." : "Cadastrar"}</Button>
      </form>
    </>
  )
}

export default AllowUserToRoom