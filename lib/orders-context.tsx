"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem } from "./cart-context"

export interface Order {
  id: string
  userId: string
  userName: string
  userEmail: string
  items: CartItem[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered"
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  createdAt: string
  updatedAt: string
}

interface OrdersContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  getUserOrders: (userId: string) => Order[]
  getAllOrders: () => Order[]
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (error) {
        console.error("Failed to load orders from localStorage:", error)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("orders", JSON.stringify(orders))
    }
  }, [orders, isHydrated])

  const addOrder = (orderData: Omit<Order, "id" | "createdAt" | "updatedAt">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setOrders((prevOrders) => [newOrder, ...prevOrders])
  }

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order,
      ),
    )
  }

  const getUserOrders = (userId: string) => {
    return orders.filter((order) => order.userId === userId)
  }

  const getAllOrders = () => {
    return orders
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, getUserOrders, getAllOrders }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
