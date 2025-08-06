import Logo from '@/assets/Logo'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { HomeIcon, LogIn, LogOut, User2Icon } from 'lucide-react'
import { NavLink } from 'react-router'

const Desktop = () => {
  const { session, logout } = useAuth()
  
  return (
    <header className="flex items-center justify-between gap-6 py-4 px-8 border">
      <Logo />
      <nav className="flex items-center justify-end gap-6 px-8 h-full">
        <NavLink to="home" className="flex gap-2 items-center">
          <Button variant={"outline"}>
            <HomeIcon size={18} /> Home
          </Button>
        </NavLink>
        {
          session ?
            <div className="flex gap-2">
              <div className="flex gap-2 items-center">
                <User2Icon />
                {session.user.email}
              </div>
              <Button onClick={logout}>
                <LogOut />
                Sair
              </Button>
            </div>
            :
            <NavLink to="login" className="flex gap-2 items-center">
              <LogIn size={18} /> Login
            </NavLink>
        }
      </nav>
    </header>
  )
}

export default Desktop