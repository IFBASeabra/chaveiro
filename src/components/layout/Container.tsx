import type { ReactNode } from "react"

const Container = ({children}: {children: ReactNode}) => {
  return (
    <section className="w-full max-w-[90vw] mx-auto flex flex-col items-center justify-start min-h-screen gap-2 py-6">
      {children}
    </section>
  )
}

export default Container