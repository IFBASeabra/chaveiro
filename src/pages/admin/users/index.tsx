import TransferList from "@/components/form/TransferList"
import Container from "@/components/layout/container"
import Modal from "@/components/layout/modal"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRooms } from "@/hooks/useRooms"
import { useUsers } from "@/hooks/useUsers"
import type { Room, User } from "@/types/rooms"
import { Edit2, EyeIcon, UserPlus2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"

const Users = () => {
  const { users, loading, fetchError, removeRoomsFromUser, addRoomsToUser } = useUsers()
  const { rooms } = useRooms()

  const [user, setUser] = useState<User | null>(null)

  const validateChanges = async (newRooms: Room[]) => {
    console.log('validateChanges: ', newRooms);

    const roomsToRemove = user?.user_rooms?.filter(
      (userRoom) =>
        !newRooms?.some((r: Room) => r.id === userRoom?.rooms?.id)
    );

    const roomsToAdd = newRooms?.filter(
      (room: Room) => !(user?.user_rooms?.some((r) => r?.rooms?.id === room.id))
    );

    console.log('roomsToAdd: ', roomsToAdd);
    console.log('roomsToRemove: ', roomsToRemove);

    if (roomsToRemove && roomsToRemove.length > 0) {
      await removeRoomsFromUser(roomsToRemove, user!.id);
    }

    if (roomsToAdd?.length) {
      await addRoomsToUser(roomsToAdd, user!.id);
    }
  };

  useEffect(() => {
    if (user) {
      const foundUser = users.find((u: User) => u.id === user.id)
      setUser(foundUser)
    }

  }, [users])

  return (
    <Container>
      <div className="w-full py-4 flex items-center justify-end gap-4">
        <Link to="/admin/users/new" className="flex gap-2">
          <Button variant="blue"><UserPlus2 /> Novo Usuário</Button>
        </Link>
      </div>
      {
        loading ?
          <>Carregando...</> :
          (
            fetchError ?
              <Alert variant="destructive">{fetchError}</Alert>
              :
              <Table>
                <TableHeader className="text-sm text-left text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-2">
                  <TableRow>
                    <TableHead>
                      <p className="text-sm">Nome</p>
                    </TableHead>
                    <TableHead>
                      <p className="text-sm">Matricula</p>
                    </TableHead>
                    <TableHead>
                      <p className="text-sm">Perfil</p>
                    </TableHead>
                    <TableHead>
                      <p className="text-sm">Salas Autorizadas</p>
                    </TableHead>
                    <TableHead>
                      <p className="text-sm">Ações</p>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    users?.map((user: User) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          {user.name}
                        </TableCell>
                        <TableCell>
                          {user.register}
                        </TableCell>
                        <TableCell>
                          {user.type}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => setUser({ ...user })} variant="primary">
                            <EyeIcon />Ver Salas Autorizadas
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => setUser({ ...user })} variant="tertiary">
                            <Edit2 />Editar Usuário
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
          )
      }
      {
        user && rooms &&
        <Modal onClick={() => setUser(null)}>
          <TransferList
            value={user.user_rooms?.map(userRoom => userRoom.rooms!)}
            available={rooms}
            onChange={validateChanges}
          />
        </Modal>
      }
    </Container>
  )
}

export default Users