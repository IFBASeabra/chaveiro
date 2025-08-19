import Logo from '@/assets/Logo'
import Menu from './menu'

const Desktop = () => {
  
  return (
    <header className="flex items-center justify-between gap-6 py-4 px-8 border fixed top-0 w-full bg-white">
      <Logo />
      <Menu />
    </header>
  )
}

export default Desktop