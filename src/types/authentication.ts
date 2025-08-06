import type { loginSchemaType } from "@/schemas/user"
import type { AuthError, Session } from "@supabase/supabase-js"

export interface LoginResponse {
  success: boolean
  error: AuthError | null
}

export interface AuthContextType {
  login: (data: loginSchemaType) => Promise<LoginResponse>
  logout: () => void
  session: Session | null
  loading: boolean
}
