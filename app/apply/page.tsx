"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"

export default function ApplyForRefund() {
  const [formData, setFormData] = useState({
    taxpayerName: "",
    taxId: "",
    refundAmount: "",
    reason: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"]
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile)
        setFileError(null)
      } else {
        setFile(null)
        setFileError("Please upload a PDF, JPG, or PNG file.")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!file) {
      setFileError("Please upload a document.")
      return
    }

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value)
    })
    formDataToSend.append("document", file)

    try {
      const response = await fetch("/api/submit-refund", {
        method: "POST",
        body: formDataToSend,
      })

      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError)
        throw new Error("Invalid response from server")
      }

      if (response.ok) {
        alert(`Refund application submitted successfully. Your tracking ID is: ${data.trackingId}`)
      } else {
        setSubmitError(`Error: ${data.error}. ${data.details || ""}`)
      }
    } catch (error) {
      console.error("Error:", error)
      setSubmitError(`An unexpected error occurred: ${(error as Error).message}. Please try again.`)
    }
  }

  return (
    <div>
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
         
        </nav>
      <h1 className="text-3xl font-bold mb-4">Apply for VAT Refund</h1>
      {submitError && <p className="text-red-500 mb-4">{submitError}</p>}
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="taxpayerName" className="block mb-2">
            Taxpayer Name
          </label>
          <input
            type="text"
            id="taxpayerName"
            name="taxpayerName"
            value={formData.taxpayerName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="taxId" className="block mb-2">
            Tax ID
          </label>
          <input
            type="text"
            id="taxId"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="refundAmount" className="block mb-2">
            Refund Amount
          </label>
          <input
            type="number"
            id="refundAmount"
            name="refundAmount"
            value={formData.refundAmount}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block mb-2">
            Reason for Refund
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="document" className="block mb-2">
            Upload Document (PDF, JPG, or PNG)
          </label>
          <input
            type="file"
            id="document"
            name="document"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
            className="w-full p-2 border rounded"
          />
          {fileError && <p className="text-red-500 mt-1">{fileError}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Application
        </button>
      </form>
    </div>
  )
}

