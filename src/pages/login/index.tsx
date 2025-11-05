import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import Container from "@/components/layout/container"

import { loginSchema, type loginSchemaType } from "@/schemas/user"
import FormField from '@/components/form/FormField'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router'
import { InfoIcon, LogIn } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Alert } from '@/components/ui/alert'

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: {errors}
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema)
  })

  const navigate = useNavigate()

  const [loginError, setLoginError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {login, session} = useAuth()

  const forgotPassword = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (session) {
      window.location.href = "/"
    }
  }, [session])

  const submitLogin = async (data: loginSchemaType) => {
    setLoading(true)
    try {
      const {success, error} = await login(data)

      if (!success) {
        if (error) {
          setLoginError("Usuário e/ou senha inválido(s). Verifique as credenciais e tente novamente.")
        } else {
          setLoginError('Houve um problema com o login. Tente novamente em alguns instantes')
        }
      } else {
        navigate("/")
      }
      

    } catch (e) {
      console.error('Houve um erro ao tentar logar', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container verticalAlign="justify-center">
      <form className="flex flex-col justify-start items-start gap-4 w-full md:max-w-1/4 border-2 p-4 rounded-sm" onSubmit={handleSubmit(submitLogin)}>
        <h2 className="flex justify-center items-center w-full text-center text-xl gap-2 py-4">
          <LogIn />Login
        </h2>
        <FormField 
          id="email"
          placeholder="ex: jose@email.com"
          {...register("email")}
          error={errors?.email}
          required={true}
        />
        <FormField 
          id="password"
          type="password"
          placeholder="Informe sua senha"
          {...register("password")}
          error={errors?.password}
          required={true}
        />
          <Button type="submit" variant={"default"} className='w-full' disabled={loading}>
            {loading ? 'Aguarde...' : 'Entrar'}
          </Button>
          <div className='text-xs mt-4'>
            Esqueceu sua senha?           
            <Button onClick={forgotPassword} variant={"link"} className='px-1'>
              <Link to="/password-recover" className="text-md font-medium text-gray-600">
                Clique aqui
              </Link>
            </Button>
          </div>
          {
            loginError &&
            <Alert variant="destructive">
              <InfoIcon />
              {
                loginError
              }
            </Alert>
          }
      </form>
    </Container>
  )
}

export default Login