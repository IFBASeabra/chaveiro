import Container from "@/components/layout/container"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRooms } from "@/hooks/useRooms"
import { FolderUp, HousePlus } from "lucide-react"
import { useMemo, useState } from "react"
import { Link } from "react-router"

type RoomFields = "name" | "number" | "location" | "type"

const Rooms = () => {
  const { rooms } = useRooms()
  const [orderBy, setOrderBy] = useState<RoomFields>("number")

  const orderedRooms = useMemo(() => {
    if (!rooms) return []

    return rooms?.sort((a, b) => a[orderBy] > b[orderBy] ? 1 : -1)
  }, [rooms, orderBy])

  return (
      <Container>
        <div className="w-full py-4 flex items-center justify-end gap-4">
            <Link to="/admin/rooms/import" className="flex gap-2"><FolderUp /> Importar Salas</Link>
            <Link to="/admin/rooms/new" className="flex gap-2"><HousePlus /> Nova Sala</Link>
        </div>
        <Table>
          <TableHeader className="text-md text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-2">
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => { setOrderBy("number") }}>
                  Número
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => { setOrderBy("name") }}>
                  Nome
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => { setOrderBy("type") }}>
                  Tipo
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => { setOrderBy("location") }}>
                  Localização
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderedRooms?.map((room) =>
                <TableRow
                  className="bg-white border-b group dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 group"
                  key={room.id}
                >
                  <TableCell>
                    <Link
                      to={`/rooms/${room.id}`}
                      role="button"
                    >
                      {room.number}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/rooms/${room.id}`}
                      role="button"
                    >
                      {room.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/rooms/${room.id}`}
                      role="button"
                    >
                      {room.type}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/rooms/${room.id}`}
                      role="button"
                    >
                      {room.location}
                    </Link>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Container >
  )
}

export default Rooms