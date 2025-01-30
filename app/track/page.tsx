"use client"

import { useState } from "react"

export default function TrackRefund() {
  const [trackingId, setTrackingId] = useState("")
  const [refundStatus, setRefundStatus] = useState<null | string>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/track-refund?trackingId=${trackingId}`)
      if (response.ok) {
        const data = await response.json()
        setRefundStatus(data.status)
      } else {
        setRefundStatus("Error: Refund not found")
      }
    } catch (error) {
      console.error("Error:", error)
      setRefundStatus("Error: Unable to fetch refund status")
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Track Your Refund</h1>
      <form onSubmit={handleSubmit} className="max-w-md mb-4">
        <div className="mb-4">
          <label htmlFor="trackingId" className="block mb-2">
            Tracking ID
          </label>
          <input
            type="text"
            id="trackingId"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Track Refund
        </button>
      </form>
      {refundStatus && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">Refund Status</h2>
          <p>{refundStatus}</p>
        </div>
      )}
    </div>
  )
}

