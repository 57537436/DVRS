"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"


export default function SignOUT()
{
    const router = useRouter()

    const handleLogout = async () => {
      await fetch("/logout") // Triggers middleware to clear cookies
      router.replace("/") // Redirect to home
    }
    return(
       < div className="flex justify-between items-center mb-8">
  <h1 className="text-4xl font-bold">Admin Dashboard</h1>
 <Button className="ml-auto" onClick={handleLogout} >Sign Out</Button>
</div>
    )
}