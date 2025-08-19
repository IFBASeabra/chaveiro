import Loading from '@/components/layout/loading'
import { useAuth } from '@/hooks/useAuth'
import {  Outlet, useLocation, useNavigate, useOutlet } from 'react-router'

const AdminLayout = () => {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
    const location = useLocation();
    const outlet = useOutlet()

  console.log("outlet: ", outlet)
  console.log("location: ", location)
  if (loading) {
    return <Loading />
  }

  if (!session && !loading) {
    navigate("/login")
  }

  return (
    <Outlet />
  )
}

export default AdminLayout