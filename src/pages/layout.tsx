import Header from "@/components/layout/header"
import { Outlet } from "react-router"
import { Toaster } from "sonner"

const Layout = () => {
  return (
    <>
    <Header />
    <main className="flex flex-col mt-[68px]">
      <Outlet />
      <Toaster richColors />
    </main>
    </>
  )
}

export default Layout