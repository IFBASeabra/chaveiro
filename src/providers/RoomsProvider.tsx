/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'

import RoomsContext from '@/contexts/RoomsContext'
import supabase from '@/lib/supabase'
import { fetchRooms } from '@/api/fetchRooms'

import type { Room } from '@/types/rooms'
import type { RoomSchemaType } from '@/schemas/room'

const RoomsProvider = ({ children }: { children: React.ReactNode }) => {
  const [rooms, setRooms] = useState<Room[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState("")

  const getRooms = async () => {
    const { data, error } = await fetchRooms()

    if (error) {
      setFetchError(`Houve um erro ao buscar as salas: ${error.message}`)
    }

    setRooms(data)
  }

  const addUser = async (roomId: number, user: string, valid_until: string | null = null) => {

    console.log('valid_until: ', valid_until)
    try {
      const { error } = await supabase.from("allowed_users").insert({ room: roomId, user, valid_until })

      if (error) {
        console.error("Houve um erro ao cadastrar o usuário: ", error)

        return {
          success: false,
          message: `Houve um erro ao cadastrar o usuário: ${JSON.stringify(error)}`
        }
      }

      await getRooms()

      return {
        success: true,
        message: `Cadastro efetuado com sucesso`
      }

    } catch (e) {
      console.error("Houve um erro ao tentar cadastrar o usuário", e)
      return {
        success: false,
        message: `Houve um erro ao tentar cadastrar o usuário. ${JSON.stringify(e)}`
      }
    }
  }

  const removeUser = async (id: number) => {
    try {
      const { error } = await supabase.from("allowed_users").delete({ count: "exact" }).eq("id", id)
      if (error) {
        return {
          success: false,
          message: `Houve um erro ao remover o usuário. ${error.message}`
        }
      }

      return {
        success: true,
        message: "Usuário removido com sucesso."
      }
    }
    catch (e) {
      return {
        success: false,
        message: `Houve um erro ao remover o usuário. ${JSON.stringify(e)}`
      }
    }
  }

  const addRoom = async({name, number, type, location}: RoomSchemaType) => {
    console.log("Adding room")
    try {
      setLoading(true)
      //@ts-ignore
      const {error} = await supabase.from("rooms").insert({name, location, type, number })

        if (error) {
          return {
            success: false,
            message: error.message
          }
        }

        return {
          success: true,
          message: "Espaço criado com sucesso"
        }
    } catch(e) {
      return {
        success: false,
        message: `Houve um problema ao cadastrar o espaço. ${JSON.stringify(e)}`
      }
    } finally {
      await getRooms()
      setLoading(false)
    }
  }

  useEffect(() => {
    const getRooms = async () => {
      setLoading(true)
      try {
        const { data, error } = await fetchRooms()

        if (error) {
          setFetchError(`Houve um erro ao buscar as salas: ${error.message}`)
        }

        setRooms(data)

      } catch (e) {
        setFetchError(`Houve um erro ao buscar as salas: ${JSON.stringify(e)}`)
      } finally {
        setLoading(false)
      }
    }

    getRooms()

  }, [])

  return (
    <RoomsContext.Provider value={{ rooms, getRooms, addUser, removeUser, addRoom, loading, fetchError }}>
      {children}
    </RoomsContext.Provider>
  )
}

export default RoomsProvider