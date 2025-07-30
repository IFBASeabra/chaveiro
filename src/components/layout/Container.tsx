import type { ReactNode } from "react"

const Container = ({children, verticalAlign = "justify-start"}: {children: ReactNode, verticalAlign?: string}) => {
  return (
    <section className={`w-full max-w-[90vw] mx-auto flex flex-col items-center min-h-screen gap-2 py-6 ${verticalAlign}`}>
      {children}
    </section>
  )
}

export default Container