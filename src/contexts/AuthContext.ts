import { createContext } from 'react'

import type { AuthContextType } from '@/types/authentication'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default AuthContext