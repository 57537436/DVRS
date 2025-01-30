
import AdminDashboard from "@/components/AdminDashboard"
import SignOUT from "@/components/AdminSignOut"
import { Button } from "@/components/ui/button"
import { getRefunds } from "@/lib/refunds"
import Link from "next/link"


export default async function AdminPage() {
  const refunds = await getRefunds()
  
  return (
    <div className="container mx-auto py-10">
      <SignOUT/>
      <AdminDashboard refunds={refunds} />
    </div>
  )
}

