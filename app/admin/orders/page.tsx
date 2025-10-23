"use client"

import { CheckCircle, Clock, Truck, Package } from "lucide-react"

const orders = [
  { id: "ORD-001", customer: "John Doe", total: "$245.99", status: "delivered", date: "2024-01-15" },
  { id: "ORD-002", customer: "Jane Smith", total: "$189.50", status: "shipped", date: "2024-01-14" },
  { id: "ORD-003", customer: "Bob Johnson", total: "$567.80", status: "processing", date: "2024-01-13" },
  { id: "ORD-004", customer: "Alice Brown", total: "$123.45", status: "pending", date: "2024-01-12" },
  { id: "ORD-005", customer: "Charlie Wilson", total: "$456.70", status: "delivered", date: "2024-01-11" },
]

const statusConfig = {
  pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800", label: "Pending" },
  processing: { icon: Package, color: "bg-blue-100 text-blue-800", label: "Processing" },
  shipped: { icon: Truck, color: "bg-purple-100 text-purple-800", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "Delivered" },
}

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-600 mt-2">Manage and track customer orders</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Total</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => {
              const config = statusConfig[order.status as keyof typeof statusConfig]
              const Icon = config.icon
              return (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">{order.id}</td>
                  <td className="px-6 py-4 text-slate-600">{order.customer}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{order.total}</td>
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
                    >
                      <Icon size={16} />
                      {config.label}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{order.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
