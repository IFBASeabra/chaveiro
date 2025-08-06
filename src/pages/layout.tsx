import Header from "@/components/layout/header"
import { Outlet } from "react-router"

const Layout = () => {
  return (
    <>
    <Header />
    <main className="flex flex-col">
      <Outlet />
    </main>
    </>
  )
}

export default Layout