import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import React from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router"

const RoomsLayout = () => {
  const location = useLocation()

  console.log('location: ', location)

  const paths = location.pathname.split("/").filter(item => !!item)

  return (
    <>
      <Breadcrumb className='mb-4 w-full py-4 px-20 bg-gray-100'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          {
            paths.length > 1 &&
            <>
              <BreadcrumbSeparator />
              {
                paths?.map((path, index) => {
                  const hasAnotherSegment = index + 1 < paths.length
                  return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem className={`${hasAnotherSegment ? 'text-gray-500' : 'text-gray-800'}`}>
                      <NavLink to={path} className={`first-letter:uppercase`}>
                        {path}
                      </NavLink>
                    </BreadcrumbItem>
                    {
                      hasAnotherSegment && <BreadcrumbSeparator />
                    }
                  </React.Fragment>
                )})
              }

            </>
          }
        </BreadcrumbList>
      </Breadcrumb>
      <Outlet />
    </>
  )
}

export default RoomsLayout