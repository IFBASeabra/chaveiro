import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { EditIcon, Info, InfoIcon, Trash2Icon } from 'lucide-react'

import Container from '@/components/layout/container'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import FormattedDate from '@/components/layout/formattedDate'
import Modal from '@/components/layout/modal'

import { useAuth } from '@/hooks/useAuth'
import { useRooms } from '@/hooks/useRooms'

import style from "./styles.module.css"
import AllowUserToRoom from '@/forms/allowUserToRoom'
import EditAllowedUser from '@/forms/editAllowedUser'
import RemoveAllowedUser from '@/forms/removeAllowedUser'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type activeFormType = "newUser" | "editUser" | "removeUser" | undefined

const Room = () => {
  const { id } = useParams()
  const { session } = useAuth()
  const { rooms, loading } = useRooms()
  const [activeForm, setActiveForm] = useState<activeFormType>(undefined)
  const [activeUser, setActiveUser] = useState<number>(0)

  const activeRoom = useMemo(() => rooms?.find(room => room.id === Number(id)), [id, rooms])

  const close = () => {
    setActiveForm(undefined)
  }

  const ActiveForms = {
    "newUser": () => <AllowUserToRoom activeRoom={activeRoom!} close={close} />,
    "editUser": () => <EditAllowedUser userId={activeUser} activeRoom={activeRoom!} close={close} />,
    "removeUser": () => <RemoveAllowedUser id={activeUser} activeRoom={activeRoom!} close={close} />
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
            {session && <Button onClick={() => { setActiveForm("newUser") }}>
              Adicionar usuário
            </Button>}
          </div>
          {activeRoom.allowed_users?.length > 0 ?

            <Table>
              <TableHeader className="text-md text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-2">
                <TableRow>
                  <TableHead colSpan={2} className="py-4 text-center text-2xl">Pessoas autorizadas</TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className={style.celula}>Nome</TableHead>
                  <TableHead className={style.celula}>Validade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  activeRoom.allowed_users?.map(({ id, user, valid_until }) =>
                    <TableRow className="bg-white border-b group dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 group">
                      <TableCell className={style.tableItem}>
                        {user}
                      </TableCell>
                      <TableCell className={`${style.tableItem} relative`}>
                        {valid_until ? <FormattedDate date={valid_until} /> : "Indeterminada"}

                        {session &&
                          <div className="invisible group-hover:visible absolute top-0 bottom-0 right-0 mx-auto flex items-center justify-end gap-2">
                            <Button onClick={() => {setActiveUser(id); setActiveForm("editUser")}}>
                              <EditIcon />
                            </Button>
                            <Button onClick={() => {setActiveUser(id); setActiveForm("removeUser")}}>
                              <Trash2Icon />
                            </Button>
                          </div>}
                      </TableCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
            :
            <div className="w-full md:max-w-1/2 flex items-center justify-center py-10">
              <Alert variant="destructive">
                <Info />
                Não existem usuários com permissão para esse espaço.
              </Alert>
            </div>
          }
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