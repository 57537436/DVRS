"use client"

import { ReactNode, useState } from "react"

type DialogProps = {
  children: ReactNode
  trigger: ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({ children, trigger, isOpen: controlledOpen, onOpenChange }: DialogProps) {
  const [open, setOpen] = useState(false)
  const isOpen = controlledOpen ?? open

  const handleOpenChange = (state: boolean) => {
    if (onOpenChange) {
      onOpenChange(state)
    } else {
      setOpen(state)
    }
  }

  return (
    <>
      <span onClick={() => handleOpenChange(true)}>{trigger}</span>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => handleOpenChange(false)}
            >
              ✖
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export function DialogTrigger({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
  return <>{children}</>
}

export function DialogContent({ children }: { children: ReactNode }) {
  return <div className="mt-2">{children}</div>
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold text-black">{children}</h2>
}
