"use client"

import { useState } from "react"
import { products } from "@/lib/products"
import { Edit2, Trash2, Plus } from "lucide-react"

export default function AdminProducts() {
  const [productList, setProductList] = useState(products)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setProductList(productList.filter((p) => p.id !== id))
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-2">Manage your product inventory</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Product</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Rating</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {productList.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span className="font-medium text-slate-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{product.category}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">${product.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium text-slate-900">{product.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
