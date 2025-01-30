import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DVRS - Digital VAT Refund System",
  description: "Demo of the Digital VAT Refund Processing System for Revenue Services Lesotho",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
     
       
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}

