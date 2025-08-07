import Container from '@/components/layout/container'
import Loading from '@/components/layout/loading'
import { useAuth } from '@/hooks/useAuth'
import {  Outlet, useNavigate } from 'react-router'

const AdminLayout = () => {
  const { session, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return <Loading />
  }

  if (!session && !loading) {
    navigate("/login")
  }

  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export default AdminLayout