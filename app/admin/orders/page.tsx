"use client"

import { CheckCircle, Clock, Truck, Package, Eye } from "lucide-react"
import { useOrders } from "@/lib/orders-context"
import { useState, useEffect } from "react"
import type { Order } from "@/lib/orders-context"

const statusConfig = {
  pending: { icon: Clock, color: "bg-yellow-100 text-yellow-800", label: "Pending" },
  processing: { icon: Package, color: "bg-blue-100 text-blue-800", label: "Processing" },
  shipped: { icon: Truck, color: "bg-purple-100 text-purple-800", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "bg-green-100 text-green-800", label: "Delivered" },
}

export default function AdminOrders() {
  const { getAllOrders, updateOrderStatus } = useOrders()
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    const allOrders = getAllOrders()
    setOrders(allOrders)
  }, [getAllOrders])

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    updateOrderStatus(orderId, newStatus)
    setOrders(getAllOrders())
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-600 mt-2">Manage and track customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-slate-600 text-sm font-medium">Total Orders</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{orders.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-slate-600 text-sm font-medium">Pending</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {orders.filter((o) => o.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-slate-600 text-sm font-medium">Processing</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {orders.filter((o) => o.status === "processing").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-slate-600 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {formatPrice(orders.reduce((sum, o) => sum + o.totalAmount, 0))}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-600">No orders yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => {
                const config = statusConfig[order.status]
                const Icon = config.icon
                return (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{order.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{order.userName}</p>
                        <p className="text-sm text-slate-600">{order.userEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{formatPrice(order.totalAmount)}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${config.color}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{formatDate(order.createdAt)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600 text-2xl">
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-600 text-sm">Order ID</p>
                  <p className="font-semibold text-slate-900">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm">Date</p>
                  <p className="font-semibold text-slate-900">{formatDate(selectedOrder.createdAt)}</p>
                </div>
              </div>

              <div>
                <p className="text-slate-600 text-sm mb-2">Customer</p>
                <p className="font-semibold text-slate-900">{selectedOrder.userName}</p>
                <p className="text-slate-600">{selectedOrder.userEmail}</p>
              </div>

              <div>
                <p className="text-slate-600 text-sm mb-2">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-slate-900">
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Total</span>
                  <span>{formatPrice(selectedOrder.totalAmount)}</span>
                </div>
              </div>

              <div>
                <p className="text-slate-600 text-sm mb-2">Shipping Address</p>
                <p className="text-slate-900">
                  {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                </p>
                <p className="text-slate-600">{selectedOrder.shippingAddress.address}</p>
                <p className="text-slate-600">
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                  {selectedOrder.shippingAddress.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
