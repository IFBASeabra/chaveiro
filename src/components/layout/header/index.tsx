import useDevice from "@/hooks/useDevice"
import Desktop from "./desktop"
import Mobile from "./mobile"

const Header = () => {
  const { isMobile } = useDevice()

  console.log('isMobile: ', isMobile)
  return isMobile ? <Mobile /> : <Desktop />

}

export default Header