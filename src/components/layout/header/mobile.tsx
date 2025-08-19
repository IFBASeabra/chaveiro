import Logo from "@/assets/Logo"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"

import Menu from "./menu"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"

const Mobile = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false);
  }, [location]);


  return (
    <header className="flex items-center justify-between gap-6 py-4 px-8 border fixed top-0 bg-white w-full">
      <Logo />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="cursor-pointer">
          <MenuIcon size={32}/>
        </SheetTrigger>
        <SheetContent className="px-4 py-4">
          <Menu />
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Mobile