import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { InfoIcon, LocationEdit, Trash2Icon } from 'lucide-react'

import Container from '@/components/layout/container'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import Modal from '@/components/layout/modal'

import { useAuth } from '@/hooks/useAuth'
import { useRooms } from '@/hooks/useRooms'

import EditRoom from '@/forms/editRoom'
import RemoveRoom from '@/forms/removeRoom'

type activeFormType = "editRoom" | "removeRoom" | undefined

const Room = () => {
  const { id } = useParams()
  const { session } = useAuth()
  const { rooms, loading } = useRooms()
  const [activeForm, setActiveForm] = useState<activeFormType>(undefined)

  const activeRoom = useMemo(() => rooms?.find(room => room.id === Number(id)), [id, rooms])

  const close = () => {
    setActiveForm(undefined)
  }

  const ActiveForms = {
    "editRoom": () => <EditRoom activeRoom={activeRoom!} close={close} />,
    "removeRoom": () => <RemoveRoom activeRoom={activeRoom!} close={close} />
  }

  if (loading) {
    return <>Carregando...</>
  }

  if (!id) {
    return (<Container verticalAlign='items-center'>
      <Alert variant="destructive" className='max-w-[300px]'>
        <InfoIcon size={16} />
        ID não encontrado
      </Alert>
    </Container>)
  }

  if (!activeRoom) {
    return (
      <Container verticalAlign='items-center'>
        <Alert variant="destructive" className='max-w-[300px]'>
          <InfoIcon size={16} />
          Sala não encontrada
        </Alert>
      </Container>)
  }

  return (
    <>
      <Breadcrumb className='mb-4 w-full py-4 px-20 bg-gray-100'>
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
      <Container align='flex-start'>
        <div className="flex flex-col items-center gap-4 mt-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between w-full">
            <h1 className="text-2xl font-semibold flex gap-2 items-center">
              <Badge className='text-2xl'>{activeRoom?.number}</Badge>{activeRoom?.name}
            </h1>
            {session &&
            <div className="flex gap-4 items-center justify-end"> 
              <Button onClick={() => { setActiveForm("editRoom") }} variant="teal">
                <LocationEdit /> Editar Espaço
              </Button>
              <Button onClick={() => { setActiveForm("removeRoom") }} variant="destructive">
                <Trash2Icon /> Remover Espaço
              </Button>
            </div>
            }
          </div>
        </div>

      </Container>

      {activeForm &&
        <Modal onClick={() => { setActiveForm(undefined) }}>
          <div className="p-4 bg-white w-full md:max-w-1/2" onClick={(e) => e.stopPropagation()}>
            {ActiveForms[activeForm]()}
          </div>
        </Modal>}
    </>

  )
}

export default Room