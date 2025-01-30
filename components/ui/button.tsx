"use client"

import { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: "default" | "outline" | "destructive"
}

export function Button({ children, variant = "default", className, ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded font-medium transition-all"
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  }

  // Fixing clsx function: Combine class names
  function clsx(baseStyles: string, variantStyle: string, className?: string): string {
    return [baseStyles, variantStyle, className].filter(Boolean).join(" ")
  }

  return (
    <button className={clsx(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
