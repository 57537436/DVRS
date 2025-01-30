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
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Revenue Services Lesotho - DVRS</h1>
        </header>
        <nav className="bg-blue-500 p-2">
          <Link href="/" className="text-white mr-4">
            Home
          </Link>
          <Link href="/apply" className="text-white mr-4">
            Apply for Refund
          </Link>
          <Link href="/track" className="text-white mr-4">
            Track Refund
          </Link>
          <Link href="/admin" className="text-white">
            Admin Dashboard
          </Link>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}

