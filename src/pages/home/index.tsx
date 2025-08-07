import Container from "@/components/layout/_temp"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/hooks/useAuth"
import { useRooms } from "@/hooks/useRooms"
import { HousePlus } from "lucide-react"
import { useMemo } from "react"
import { Link } from "react-router"

const Home = () => {
  const {rooms, fetchError, loading} = useRooms()
  const {session} = useAuth()

  const roomList = useMemo(() => {
        return rooms?.reduce((acc, room) => {
          const loc = room.location || "unknown";
          if (!acc[loc]) acc[loc] = [];
          acc[loc].push(room);
          return acc;
        }, {} as Record<string, typeof rooms>);
  }, [rooms])


  if (fetchError) {

    console.error('A página não pode ser carregada devido a um erro: ', fetchError)
    return <>A página não pode ser carregada devido a um erro. Tente novamente mais tarde</>
  }

  if (loading) {
    return <Skeleton />
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
                        <Link
                          to={`/rooms/${room.id}`}
                          key={room.id}
                          role="button"
                          className="p-4 border-2 border-gray-200 flex flex-auto max-w-28 items-center justify-center cursor-pointer rounded-sm flex-col"
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
      
    </Container>
  )
}

export default Home