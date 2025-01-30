
import AdminDashboard from "@/components/AdminDashboard"
import { getRefunds } from "@/lib/refunds"


export default async function AdminPage() {
  const refunds = await getRefunds()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <AdminDashboard refunds={refunds} />
    </div>
  )
}

