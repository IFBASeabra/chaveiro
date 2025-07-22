import Container from "@/components/layout/container"
import { Skeleton } from "@/components/ui/skeleton"
import supabase from "@/lib/supabase"
import type { Room } from "@/types/rooms"
import { useEffect, useState } from "react"

const Home = () => {
  const [rooms, setRooms] = useState<Room[] | null>(null)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data, error } = await supabase.from("rooms").select("name, number, type, location, allowed_users(user)")
        if (error) {
          setLoadingError(error.message)
        }
        setRooms(data)
      } catch (e) {
        console.error('Houve um erro ao processar a requisição.', e)
      }
      finally {
        setLoading(false)
      }
    }
    fetchRooms()
  }, [])

  if (loadingError) {

    console.error('A página não pode ser carregada devido a um erro: ', loadingError)
    return <>A página não pode ser carregada devido a um erro. Tente novamente mais tarde</>
  }

  if (loading) {
    return <Skeleton />
  }

  return (
    <Container >
      {
        rooms?.map((room) => <div>{room.name}</div>)
      }
    </Container>
  )
}

export default Home