import React, { useEffect, useState } from 'react'

import RoomsContext from '@/contexts/RoomsContext'
import supabase from '@/lib/supabase'
import { fetchRooms } from '@/api/fetchRooms'

import type { Room } from '@/types/rooms'

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

  const addUser = async (roomId: number, user: string) => {
    try {
      const { error } = await supabase.from("allowed_users").insert({ room: roomId, user })

      if (error) {
        console.error("Houve um erro ao cadastrar o usuário: ", error)

        return {
          success: false,
          message: `Houve um erro ao cadastrar o usuário: ${JSON.stringify(error)}`
        }
      }

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
    <RoomsContext.Provider value={{ rooms, getRooms, addUser, loading, fetchError }}>
      {children}
    </RoomsContext.Provider>
  )
}

export default RoomsProvider