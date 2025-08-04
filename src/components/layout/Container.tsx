import type { ReactNode } from "react"

const Container = ({children, align="items-center", verticalAlign = "justify-start"}: {children: ReactNode, verticalAlign?: string, align?: string}) => {
  return (
    <section className={`w-full max-w-[90vw] mx-auto flex flex-col min-h-screen gap-2 py-6 ${verticalAlign} ${align}`}>
      {children}
    </section>
  )
}

export default Container