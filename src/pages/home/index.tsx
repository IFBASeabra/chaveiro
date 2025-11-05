
import { HousePlus } from "lucide-react"
import { useMemo, useState } from "react"
import { Link } from "react-router"
import Container from "@/components/layout/container"
import Modal from "@/components/layout/modal"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/useAuth"
import { useRooms } from "@/hooks/useRooms"
import type { Room } from "@/types/rooms"
import { time } from "@/utils/timestamp"
import { ReservationList } from "@/components/form/ReservationList"

const Home = () => {
  const { rooms, fetchError, loading, endReservation, getRooms } = useRooms()
  const { session } = useAuth()
  const [room, setRoom] = useState<Room | null>(null)
  const [showReservation, setShowReservation] = useState(false)

  const activeReservation = useMemo(() => {
    if (!room || !(room.reservations && room.reservations.length > 0)) return null

    if (room.reservations[0].status !== "aberto") return null

    return room.reservations[0]
  }, [room])

  const roomList = useMemo(() => {
    return rooms?.reduce((acc, room) => {
      const loc = room.location || "unknown";
      if (!acc[loc]) acc[loc] = [];
      acc[loc].push(room);
      return acc;
    }, {} as Record<string, typeof rooms>);
  }, [rooms])

  console.log('rooms: ', rooms)


  if (fetchError) {

    console.error('A página não pode ser carregada devido a um erro: ', fetchError)
    return <>A página não pode ser carregada devido a um erro. Tente novamente mais tarde</>
  }

  if (loading) {
    return <Skeleton />
  }

  const confirmEnd = async () => {
    await endReservation(activeReservation!.id)
    setRoom(null)
  }

  return (
    <Container >
      {
        session &&
        <div className="flex w-full items-center justify-end py-4">
          <Link to="/admin/rooms/new" className="flex gap-2"><HousePlus /> Nova Sala</Link>
        </div>
      }
      <div className="flex flex-col w-full flex-wrap">
        {
          roomList ?
            Object.entries(roomList)
              .map(
                ([location, rooms]) =>
                  <div className="py-2" key={location}>
                    <h2 className="text-2xl mb-6">{location}</h2>
                    <div className="flex flex-wrap gap-4">
                      {rooms?.sort((a, b) => Number(a.number) - Number(b.number))?.map((room) =>
                        <button
                          key={room.id}
                          role="button"
                          onClick={() => { setRoom(room) }}
                          className={`p-4 border-2 border-gray-200 flex flex-auto max-w-28 items-center justify-center cursor-pointer rounded-sm flex-col ${room.reservations?.[0]?.status === "aberto" ? "border-red-600" : "border-green-500"}`}
                        >
                          <h3 className="text-xl font-bold">
                            {room.number}
                          </h3>
                          <p className="text-sm text-center">
                            {room.name}
                          </p>
                        </button>
                      )}
                    </div>
                  </div>
              ) :
            <></>
        }
      </div>
      {
        room &&
        <Modal onClick={(e) => {
          e.preventDefault()
          setRoom(null)
        }}>
          <Card className="p-10 w-full max-w-[800px]" onClick={(e) => { e.stopPropagation() }}>
            <ul>
              <li>
                <strong>Espaço: </strong>{room.name}
              </li>
              <li>
                <strong>Status: </strong>{activeReservation && activeReservation.status === "aberto" ? "Reservado" : "Livre"}
              </li>
              {
                activeReservation ?
                <>
                  <li>
                    <strong>Reservado por: </strong>{activeReservation?.users?.name}
                  </li>
                  <li>
                    <strong>Reservado em: </strong>{time(activeReservation?.created_at)}
                  </li>
                  <li>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button variant={"destructive"}>Devolver</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Deseja confirmar a devolução?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação não pode ser desfeita. Confirme apenas se a chave foi devidamente devolvida.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={confirmEnd} disabled={loading}>
                            {loading ? "Confirmando..." : "Confirmar"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </li>
                </>
                :
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="primary" onClick={() => setShowReservation(true)}>Registrar reserva</Button>
                  {
                    showReservation && 
                    <ReservationList room={room} onEnd={async () => {await getRooms(); setShowReservation(false); setRoom(null);  }} />
                  }
                </div>
              }
            </ul>
          </Card>
        </Modal>
      }

    </Container>
  )
}

export default Home