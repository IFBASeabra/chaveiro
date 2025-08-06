import Logo from "@/assets/Logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@/hooks/useAuth"
import { LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react"
import { NavLink } from "react-router"

const Mobile = () => {
  const { session, logout } = useAuth()

  return (
    <header className="flex items-center justify-between gap-6 py-4 px-8 border">
      <Logo />
      {
        session ? <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="px-4 py-4">
            <SheetHeader className="flex flex-row items-center gap-4 justify-start">
              <UserIcon />
              {session?.user.email}
            </SheetHeader>
            <nav className="flex flex-col gap-4">
              <Button variant="destructive" onClick={logout}>
                <LogOutIcon />
                Sair
              </Button>
            </nav >
          </SheetContent>
        </Sheet> :
          <NavLink to="/login" className="flex items-center gap-4">
            <LogInIcon />
            Login
          </NavLink>
      }

    </header>
  )
}

export default Mobile