import { HomeIcon, LogIn } from "lucide-react"
import { NavLink, Outlet } from "react-router"

import Logo from "@/assets/Logo"
import { Button } from "@/components/ui/button"

const Layout = () => {
  return (
    <main className="flex flex-col">
      <header className="flex items-center justify-between gap-6 py-4 px-8 border">
        <Logo />
        <nav className="flex items-center justify-end gap-6 px-8 h-full">
          <NavLink to="home" className="flex gap-2 items-center">
            <Button variant={"outline"}>
              <HomeIcon size={18} /> Home
            </Button>
          </NavLink>
          <NavLink to="login" className="flex gap-2 items-center">
            <LogIn size={18} /> Login
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </main>
  )
}

export default Layout