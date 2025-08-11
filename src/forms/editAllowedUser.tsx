import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import FormField from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useRooms } from '@/hooks/useRooms'
import { allowedUserSchema, type AllowedUser, type allowedUserType } from '@/schemas/user'
import type { Room } from '@/types/rooms'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

const EditAllowedUser = ({activeRoom, userId, close }: { activeRoom: Room, userId: number, close: () => void }) => {
  const { updateUser, loading } = useRooms()
  const [isTemp, setIsTemp] = useState(false)

  const activeUser: AllowedUser | undefined = useMemo(() => {
    return activeRoom.allowed_users.find((user) => user.id === userId)
  }, [userId, activeRoom])

  useEffect(() => {
    if (activeUser) {
      setIsTemp(!!activeUser.valid_until)
    }
  }, [activeUser])

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<allowedUserType>({
    resolver: zodResolver(allowedUserSchema)
  })

  const updateUserInfo = async (data: allowedUserType) => {
    const {success, message} = await updateUser(userId, data.user, isTemp ? data.valid_until : undefined)
    if (success) {
      toast.success(message)
    } else{
      toast.error(message)
    }    
    close()
  }

  return (
    <>
      <form onSubmit={handleSubmit(updateUserInfo)} className="flex flex-col gap-6">
        <FormField title="Nome Completo do Usuário" id="user" {...register('user')} error={errors.user} defaultValue={activeUser!.user} />
        <div className="flex items-center gap-4 cursor-pointer">
          <Switch id="isTemp" checked={isTemp} onCheckedChange={() => { setIsTemp(!isTemp) }} />
          <Label htmlFor="isTemp">Liberação temporária</Label>
        </div>
        {isTemp && <FormField title="Liberado até" type="date" id="valid_until" {...register("valid_until")} error={errors.valid_until} defaultValue={activeUser?.valid_until}/>}
        <Button type="submit" disabled={loading}>{loading ? "Aguarde..." : "Cadastrar"}</Button>
      </form>
    </>
  )
}

export default EditAllowedUser