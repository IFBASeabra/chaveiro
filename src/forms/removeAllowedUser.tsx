import { useMemo } from 'react'
import { useRooms } from '@/hooks/useRooms'
import { type AllowedUser} from '@/schemas/user'
import type { Room } from '@/types/rooms'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const RemoveAllowedUser = ({id, activeRoom, close }: { id: number, activeRoom: Room, close: () => void }) => {
  const { removeUser, loading } = useRooms()

  const user = useMemo(() => activeRoom?.allowed_users?.find((user: AllowedUser) => user.id === id), [activeRoom, id])

  const handleRemove = async () => {
    const {success, message} = await removeUser(id)
    if (success) {
      toast.success(message)
    } else{
      toast.error(message)
    }
    close()
  }

  if (!user) {
    return <>Usuário não encontrado</>
  }

  return (
    <div >
      <h2>Tem certeza que deseja remover o usuário {user.user}?</h2>
      <div className="flex items-center gap-2">
        <Button onClick={handleRemove} variant={"destructive"}>{loading ? "Aguarde..." : "Sim"}</Button>
        <Button onClick={() => console.log('fechar')} variant={"ghost"}>Não</Button>
      </div>
    </div>
  )
}

export default RemoveAllowedUser