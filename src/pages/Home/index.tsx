import Container from "@/components/layout/container"
import Modal from "@/components/layout/modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/useAuth"
import { useRooms } from "@/hooks/useRooms"
import supabase from "@/lib/supabase"
import type { Room } from "@/types/rooms"
import React, { useMemo, useState } from "react"
import { Link } from "react-router"

const Home = () => {
  const {rooms, fetchError, loading} = useRooms()
  const [activeRoom, setActiveRoom] = useState<Room | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [allowedUser, setAllowedUser] = useState("")
  const { session } = useAuth()

  const roomList = useMemo(() => {
        return rooms?.reduce((acc, room) => {
          const loc = room.location || "unknown";
          if (!acc[loc]) acc[loc] = [];
          acc[loc].push(room);
          return acc;
        }, {} as Record<string, typeof rooms>);
  }, [rooms])


  console.log('rooms: ', rooms)
  console.log('roomList: ', roomList)
  console.log('loading: ', loading)

  const permitirAcesso = () => {
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('activeRoom: ', activeRoom)

    try {
      const {data, error} = await supabase.from("allowed_users").insert({room: activeRoom!.id, user: allowedUser})
      
      console.log('data: ', data)
      console.log('error: ', error)
    
    } catch (e) {
      console.error("Houve um erro: ", e)
    } finally {
      setShowForm(false)
      setAllowedUser("")
    }
  }

  if (fetchError) {

    console.error('A página não pode ser carregada devido a um erro: ', fetchError)
    return <>A página não pode ser carregada devido a um erro. Tente novamente mais tarde</>
  }

  if (loading) {
    return <Skeleton />
  }

  return (
    <Container >
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
                        <Link
                          to={`/rooms/${room.id}`}
                          key={room.id}
                          role="button"
                          className="p-4 border-2 flex flex-auto max-w-28 items-center justify-center cursor-pointer rounded-sm flex-col"
                          onClick={() => setActiveRoom(room)}
                        >
                          <h3 className="text-xl font-bold">
                            {room.number}
                          </h3>
                          <p className="text-sm text-center">
                            {room.name}
                          </p>
                        </Link>
                      )}
                    </div>
                  </div>
              ) :
            <></>
        }
      </div>
      {
        activeRoom &&
        <Modal onClick={() => { setActiveRoom(null) }}>
          <Card className="w-full md:w-1/2 md:max-w-3/4" onClick={(e) => e.stopPropagation()}>
            <CardContent>
              <CardTitle className="flex gap-4 text-2xl w-full justify-between">
                <Badge className="text-xl">{activeRoom.number}</Badge>
                {activeRoom.name}
                {
                  session &&
                  <Button variant="default" onClick={permitirAcesso}>Permitir acesso</Button>
                }
              </CardTitle>
              <CardDescription className="my-4">
                <table className="table-fixed w-full text-black">
                  <thead className="text-md text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-2">
                    <th>Pessoas autorizadas:</th>
                  </thead>
                  <tbody>
                    {
                      activeRoom.allowed_users?.map(({ user }) =>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 font-medium text-[16px] text-gray-900 whitespace-nowrap dark:text-white">
                            {user}
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </CardDescription>
            </CardContent>
          </Card>
        </Modal>
      }
      {
        showForm &&
        <Modal onClick={() => { setShowForm(false) }}>
          <div className="p-4 bg-white" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <Input title="Nome do Usuário" id="user" onChange={({target}) => setAllowedUser(target.value)}  />
              <Button type="submit">Cadastrar</Button>
            </form>
          </div>
        </Modal>
      }
    </Container>
  )
}

export default Home