import Link from "next/link";

export default function Home() {
  return (
    <div>
       <header className="bg-orange-500 text-white p-8 rounded-lg">
  <div className="flex justify-between items-center mx-auto  w-3/4">
    <Link href="/" >
      <h1 className="text-2xl font-bold  hover:text-blue-900">Revenue Services Lesotho - DVRS</h1>
    </Link>
    
    <div className="flex ml-auto">
      <Link href="/" className="text-white mr-4  hover:text-blue-900">
        Home
      </Link>
      <Link href="/apply" className="text-white mr-4 hover:text-blue-900">
        Apply for Refund
      </Link>
      <Link href="/track" className="text-white  hover:text-blue-900">
        Track Refund
      </Link>
    </div>
  </div>
</header>
<div className="flex flex-col items-center space-y-4 mt-20 p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Digital VAT Refund Processing System</h1>
      <p className="mb-4">This system allows you to apply for VAT refunds and track their status.</p>
      <div className="flex gap-4">
        <a href="/apply" className="bg-blue-500 text-white px-4 py-2 rounded">
          Apply for Refund
        </a>
        <a href="/track" className="bg-green-500 text-white px-4 py-2 rounded">
          Track Refund
        </a>
      </div>
      </div>
    </div>
  )
}

