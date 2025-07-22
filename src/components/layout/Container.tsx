import type { ReactNode } from "react"

const Container = ({children}: {children: ReactNode}) => {
  return (
    <section className="w-full max-w-[90vw] mx-auto flex items-center justify-center min-h-screen gap-2">
      {children}
    </section>
  )
}

export default Container