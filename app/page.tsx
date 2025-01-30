export default function Home() {
  return (
    <div>
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
  )
}

