"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Refund } from "@prisma/client/wasm"

type AdminDashboardProps = {
  refunds: Refund[]
}

export default function AdminDashboard({ refunds: initialRefunds }: AdminDashboardProps) {
  const [refunds, setRefunds] = useState(initialRefunds)
  const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null)

  const handleApprove = async (id: string) => {
    const response = await fetch(`/api/admin/approve-refund`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })

    if (response.ok) {
      setRefunds(refunds.map((refund) => (refund.id === id ? { ...refund, status: "APPROVED" } : refund)))
    } else {
      alert("Failed to approve refund")
    }
  }

  const handleReject = async (id: string) => {
    const response = await fetch(`/api/admin/reject-refund`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })

    if (response.ok) {
      setRefunds(refunds.map((refund) => (refund.id === id ? { ...refund, status: "REJECTED" } : refund)))
    } else {
      alert("Failed to reject refund")
    }
  }

  return (
    <div>
      <Table >
        <TableHeader>
          <TableRow >
            <TableHead >ID</TableHead>
            <TableHead>Taxpayer Name</TableHead>
            <TableHead>Tax ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {refunds.map((refund) => (
            <TableRow key={refund.id}>
              <TableCell>{refund.id}</TableCell>
              <TableCell>{refund.taxpayerName}</TableCell>
              <TableCell>{refund.taxId}</TableCell>
              <TableCell>{refund.refundAmount}</TableCell>
              <TableCell>{refund.status}</TableCell>
              <TableCell>
                <Dialog trigger={<Button variant="outline" onClick={() => setSelectedRefund(refund)}>View</Button>}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle >Refund Details</DialogTitle>
                    </DialogHeader>
                    {selectedRefund && (
                      <div>
                        <p className="text-black">
                          <strong>Taxpayer Name:</strong> {selectedRefund.taxpayerName}
                        </p>
                        <p className="text-black">
                          <strong>Tax ID:</strong> {selectedRefund.taxId}
                        </p>
                        <p className="text-black">
                          <strong>Amount:</strong> {selectedRefund.refundAmount}
                        </p>
                        <p className="text-black">
                          <strong>Reason:</strong> {selectedRefund.reason}
                        </p>
                        <p className="text-black">
                          <strong>Status:</strong> {selectedRefund.status}
                        </p>
                        <p className="text-black">
                          <strong>Document:</strong>{" "}
                          
                          <a
                            href={`/api/admin/document?path=${selectedRefund.documentPath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </a>
                        </p>
                        {selectedRefund.status === "PENDING" && (
                          <div className="mt-4 space-x-2">
                            <Button onClick={() => handleApprove(selectedRefund.id)}>Approve</Button>
                            <Button variant="destructive" onClick={() => handleReject(selectedRefund.id)}>
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
