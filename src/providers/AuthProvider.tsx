import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import AuthContext from '@/contexts/AuthContext'
import supabase from '@/lib/supabase'

import type { Session } from '@supabase/supabase-js'
import type { loginSchemaType } from '@/schemas/user'


const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let unsubscribe: () => void

    const checkAuth = async () => {
      setLoading(true)
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })

        unsubscribe = subscription.unsubscribe
      } catch (error) {
        console.error("Erro ao recuperar sessão:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const login = async ({ email, password }: loginSchemaType) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    console.log('auth error: ', error)

    if (error) {
      return { success: false, error }
    }

    setSession(data.session)

    return {
      success: true,
      error: null
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider