import React from 'react'

const Modal = ({children, onClick}: {children: React.ReactNode, onClick: React.MouseEventHandler<HTMLDivElement>}) => {
  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100svh] bg-black/80 flex items-center justify-center p-2" onClick={onClick}>
      {children}
    </div>
  )
}

export default Modal