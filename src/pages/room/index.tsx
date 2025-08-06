import Container from '@/components/layout/container'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useRooms } from '@/hooks/useRooms'
import { InfoIcon } from 'lucide-react'
import { useMemo } from 'react'
import { Link, useParams } from 'react-router'

const Room = () => {
  const {id} = useParams()
  const {rooms} = useRooms()

  const activeRoom = useMemo(() => rooms?.find(room => room.id === Number(id)), [id, rooms]) 

  if(!id) {
      return (<Container verticalAlign='items-center'>
        <Alert variant="destructive" className='max-w-[300px]'>
          <InfoIcon size={16}/>
          ID não encontrado
        </Alert>
      </Container>  )
  }

  if (!activeRoom) {
    return (
      <Container verticalAlign='items-center'>
        <Alert variant="destructive" className='max-w-[300px]'>
          <InfoIcon size={16}/>
          Sala não encontrada
        </Alert>
      </Container>)
  }

  return (
    <Container align='flex-start'>
      <Breadcrumb className='mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{activeRoom?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold flex gap-2 items-center">
          <Badge className='text-2xl'>{activeRoom?.number}</Badge>{activeRoom?.name}
        </h1>

      </div>

    </Container>
  )
}

export default Room