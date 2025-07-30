import supabase from '@/lib/supabase'
import type { loginSchemaType } from '@/schemas/user'
import type { Session } from '@supabase/supabase-js'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

interface AuthContextType {
  login: (data: loginSchemaType) => Promise<void>
  logout: () => void
  session: Session | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    const checkAuth = async () => {
      setLoading(true)
      try {
        await supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
        
        return () => subscription.unsubscribe()

      } catch (e) {
        console.error('There was an error while retrieving the session', e)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async ({ email, password }: loginSchemaType) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return navigate(`/login`)
    }

    setSession(data.session)

    navigate(`/admin`)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ session, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider