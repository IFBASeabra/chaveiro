import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { Info, InfoIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import Container from '@/components/layout/_temp'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'


import FormattedDate from '@/components/layout/formattedDate'
import FormField from '@/components/form/FormField'
import Modal from '@/components/layout/modal'

import { useRooms } from '@/hooks/useRooms'

import { allowedUserSchema, type allowedUserType } from '@/schemas/user'
import { Switch } from "@/components/ui/switch"
import { Label } from '@radix-ui/react-label'

import style from "./styles.module.css"

const Room = () => {
  const { id } = useParams()
  const { rooms, addUser, loading } = useRooms()
  const [showModal, setShowModal] = useState(false)
  const [isTemp, setIsTemp] = useState(false)
  const [status, setStatus] = useState({
    success: false,
    message: ""
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<allowedUserType>({
    resolver: zodResolver(allowedUserSchema)
  })

  const addNewUser = async (data: allowedUserType) => {
    const result = await addUser(activeRoom!.id, data.user, isTemp ? `${data.valid_until}` : undefined)
    setStatus(result)
  }

  const activeRoom = useMemo(() => rooms?.find(room => room.id === Number(id)), [id, rooms])

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
          <div className="flex justify-between w-full">
            <h1 className="text-2xl font-semibold flex gap-2 items-center">
              <Badge className='text-2xl'>{activeRoom?.number}</Badge>{activeRoom?.name}
            </h1>
            <Button onClick={() => { setShowModal(true) }}>
              Adicionar usuário
            </Button>
          </div>
          {activeRoom.allowed_users?.length > 0 ?

            <table className="table-fixed w-full text-black">
              <thead className="text-md text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 py-2">
                <tr>
                  <th colSpan={2} className="py-4 text-center text-2xl">Pessoas autorizadas</th>
                </tr>
                <tr>
                  <th className={style.celula}>Nome</th>
                  <th className={style.celula}>Validade</th>
                </tr>
              </thead>
              <tbody>
                {
                  activeRoom.allowed_users?.map(({ user, valid_until }) =>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 group">
                      <td className={style.tableItem}>
                        {user}
                      </td>
                      <td className={style.tableItem}>
                        {valid_until ? <FormattedDate date={valid_until} /> : "Indeterminada"}
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
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

      {showModal &&
        <Modal onClick={() => { setShowModal(false) }}>
          <div className="p-4 bg-white w-full md:max-w-1/2" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit(addNewUser)} className="flex flex-col gap-6">
              <FormField title="Nome Completo do Usuário" id="user" {...register('user')} error={errors.user} />
              <div className="flex items-center gap-4 cursor-pointer">
                <Switch id="isTemp" checked={isTemp} onCheckedChange={() => { setIsTemp(!isTemp) }} />
                <Label htmlFor="isTemp">Liberação temporária</Label>
              </div>
              {isTemp && <FormField title="Liberado até" type="date" id="valid_until" {...register("valid_until")} error={errors.valid_until} />}
              <Button type="submit" disabled={loading}>{loading ? "Aguarde..." : "Cadastrar"}</Button>
            </form>
            {
              (!loading && status.message) &&
              <Alert variant={status.success ? "default" : "destructive"} className='mt-4'>
                <InfoIcon />
                {status.message}
              </Alert>
            }
          </div>
        </Modal>}
    </>

  )
}

export default Room