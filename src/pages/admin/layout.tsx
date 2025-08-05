import Container from '@/components/layout/container'
import Loading from '@/components/layout/loading'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Blocks, BlocksIcon, HousePlusIcon, Users } from 'lucide-react'
import { Link, Outlet, useNavigate } from 'react-router'

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
      <nav className="flex gap-4 items-center justify-start w-full">
        <Button variant="link">
          <Users />
          <Link to="users">Usuários</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="link">
              <Blocks />
              <Link to="rooms">Salas</Link>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button variant="link">
                <BlocksIcon />
                <Link to="rooms">Salas</Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="link">
                <HousePlusIcon />
                <Link to="rooms/new">Nova Sala</Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </nav>
      <Outlet />
    </Container>
  )
}

export default AdminLayout