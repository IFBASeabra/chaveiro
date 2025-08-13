import { useRooms } from '@/hooks/useRooms'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import type { Room } from '@/types/rooms'
import { useNavigate } from 'react-router'

const RemoveRoom = ({activeRoom, close }: {activeRoom: Room, close: () => void }) => {
  const { removeRoom, loading } = useRooms()
  const navigate = useNavigate()

  const handleRemove = async () => {
    const {success, message} = await removeRoom(activeRoom.id)
    if (success) {
      toast.success(message)
    } else{
      toast.error(message)
    }
    navigate("/")
  }

  if (!activeRoom) {
    return <>Espaço não encontrado</>
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>Tem certeza que deseja remover o espaço {activeRoom.name}?</h2>
      <div className="flex items-center gap-4">
        <Button onClick={handleRemove} variant={"destructive"}>{loading ? "Aguarde..." : "Sim"}</Button>
        <Button onClick={close} variant={"ghost"}>Não</Button>
      </div>
    </div>
  )
}

export default RemoveRoom