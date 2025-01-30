"use client"

import { ReactNode } from "react"

export function Table({ children }: { children: ReactNode }) {
  return <table className="w-full border-collapse border border-gray-300">{children}</table>
}

export function TableHeader({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-200 text-black">{children}</thead>
}

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className="border border-gray-300">{children}</tr>
}

export function TableHead({ children }: { children: ReactNode }) {
  return <th className="px-4 py-2 border border-gray-300 text-left">{children}</th>
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

export function TableCell({ children }: { children: ReactNode }) {
  return <td className="px-4 py-2 border border-gray-300">{children}</td>
}
