import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useDevice from "@/hooks/useDevice"
import type { Room } from "@/types/rooms"
import { useRooms } from "@/hooks/useRooms"
import { toast } from "sonner"


export function ReservationList({room, onEnd}: {room: Room,  onEnd: () => void}) {
  const [open, setOpen] = useState(false)
  const {isMobile} = useDevice()
  const [selectedUser, setSelectedUser] = useState<{id: number, name: string} | null>(
    null
  )

  const {createReservation} = useRooms()

const userList = useMemo(() => {
  return (
    room.user_rooms
      ?.flatMap(user_room => user_room.users ? [user_room.users] : [])
      ?? []
  )
}, [room])

const registerReservation = async () => {
  await createReservation(selectedUser!.id, room.id)
  toast.success("Reserva realizada")
  onEnd()
}


  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedUser ? <>{selectedUser.name}</> : <>Escolher usuário</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <UserList setOpen={setOpen} setSelectedUser={setSelectedUser} userList={userList} />
        </PopoverContent>
        {
          selectedUser && 
          <Button onClick={registerReservation}>Confirmar</Button>
        }
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full justify-start">
          {selectedUser ? <>{selectedUser.name}</> : <>Escolher usuário</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <UserList setOpen={setOpen} setSelectedUser={setSelectedUser} userList={userList} />
        </div>
        {
          selectedUser && 
          <Button onClick={registerReservation}>Confirmar</Button>
        }
      </DrawerContent>
    </Drawer>
  )
}

function UserList({
  setOpen,
  setSelectedUser,
  userList
}: {
  setOpen: (open: boolean) => void
  setSelectedUser: (props: {id: number, name: string} | null) => void
  userList: {id: number, name: string}[] | undefined
}) {
  return (
    <Command>
      <CommandInput placeholder="Filtrar usuários..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup>
          {userList?.map((user) => (
            <CommandItem
              key={user.id}
              value={user.name}
              onSelect={(value) => {
                setSelectedUser(
                  userList.find((user) => user.name === value) || null
                )
                setOpen(false)
              }}
            >
              {user.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
