import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Link, Outlet, useMatches } from "react-router"

const RoomsLayout = () => {
  const matches = useMatches()

  console.log('matches: ', matches)

  return (
    <>
    <Breadcrumb className='mb-4 w-full py-4 px-20 bg-gray-100'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Salas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    <Outlet />
    </>
  )
}

export default RoomsLayout