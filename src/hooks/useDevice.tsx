import { useEffect, useState } from "react"

type DeviceType = "mobile" | "tablet" | "desktop"

const useDevice = () => {
  const [isMobile, setIsMobile] = useState(true)
  const [device, setDevice] = useState<DeviceType>("mobile")
  
  useEffect(() => {
    const checkDevice = () => {
      console.log('validating size')
        const breakpoint = document.body.clientWidth

        if (breakpoint >=1280) {
          setDevice("desktop")
          setIsMobile(false)
        } else if (breakpoint < 980) {
          setIsMobile(true)
          setDevice("mobile")
        } else {
          setIsMobile(false)
          setDevice("tablet")
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).addEventListener("resize", checkDevice)
    
    checkDevice()

  }, [])

  return {isMobile, device}
}

export default useDevice