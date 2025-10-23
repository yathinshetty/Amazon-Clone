"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useOrders } from "@/lib/orders-context"
import { User, Package, Settings, LogOut, ChevronRight, CheckCircle, Clock, Truck } from "lucide-react"
import type { Order } from "@/lib/orders-context"

export default function AccountPage() {
  const router = useRouter()
  const { user, isLoading, logout } = useAuth()
  const { getUserOrders } = useOrders()
  const [activeTab, setActiveTab] = useState("overview")
  const [userOrders, setUserOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      const orders = getUserOrders(user.id)
      setUserOrders(orders)
    }
  }, [user, getUserOrders])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
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

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock size={20} className="text-yellow-600" />
      case "processing":
        return <Package size={20} className="text-blue-600" />
      case "shipped":
        return <Truck size={20} className="text-purple-600" />
      case "delivered":
        return <CheckCircle size={20} className="text-green-600" />
    }
  }

  const getStatusLabel = (status: Order["status"]) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-card-foreground mb-2">My Account</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 h-fit sticky top-20">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "overview"
                      ? "bg-primary text-primary-foreground"
                      : "text-card-foreground hover:bg-muted"
                  }`}
                >
                  <User size={20} />
                  <span className="font-semibold">Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "orders"
                      ? "bg-primary text-primary-foreground"
                      : "text-card-foreground hover:bg-muted"
                  }`}
                >
                  <Package size={20} />
                  <span className="font-semibold">Orders</span>
                  {userOrders.length > 0 && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                      {userOrders.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "settings"
                      ? "bg-primary text-primary-foreground"
                      : "text-card-foreground hover:bg-muted"
                  }`}
                >
                  <Settings size={20} />
                  <span className="font-semibold">Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition"
                >
                  <LogOut size={20} />
                  <span className="font-semibold">Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-card-foreground">Profile Information</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p className="text-lg font-semibold text-card-foreground">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="text-lg font-semibold text-card-foreground">{user.email}</p>
                    </div>
                    {user.phone && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                        <p className="text-lg font-semibold text-card-foreground">{user.phone}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                      <p className="text-lg font-semibold text-card-foreground">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setActiveTab("settings")}
                    className="mt-6 bg-primary hover:bg-primary-dark text-primary-foreground"
                  >
                    Edit Profile
                  </Button>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/cart">
                    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                      <h3 className="font-semibold text-card-foreground mb-2">Shopping Cart</h3>
                      <p className="text-sm text-muted-foreground mb-4">View and manage your cart</p>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        Go to Cart <ChevronRight size={18} />
                      </div>
                    </div>
                  </Link>
                  <Link href="/products">
                    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                      <h3 className="font-semibold text-card-foreground mb-2">Continue Shopping</h3>
                      <p className="text-sm text-muted-foreground mb-4">Browse our products</p>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        Shop Now <ChevronRight size={18} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 text-card-foreground">Your Orders</h2>
                {userOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
                    <Link href="/products">
                      <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                        Start Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <div key={order.id} className="border border-border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Order ID</p>
                            <p className="font-semibold text-card-foreground">{order.id}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <span className="font-semibold text-card-foreground">{getStatusLabel(order.status)}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Order Date</p>
                            <p className="font-semibold text-card-foreground">{formatDate(order.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Amount</p>
                            <p className="font-semibold text-card-foreground">{formatPrice(order.totalAmount)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Items</p>
                            <p className="font-semibold text-card-foreground">{order.items.length}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Shipping To</p>
                            <p className="font-semibold text-card-foreground">{order.shippingAddress.city}</p>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <p className="text-sm font-semibold text-card-foreground mb-2">Items Ordered:</p>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.product.id} className="flex justify-between text-sm text-muted-foreground">
                                <span>
                                  {item.product.name} x {item.quantity}
                                </span>
                                <span>{formatPrice(item.product.price * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                {/* Edit Profile */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-card-foreground">Edit Profile</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-card-foreground mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-card-foreground mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user.email}
                          disabled
                          className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-muted-foreground outline-none cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-card-foreground mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue={user.phone || ""}
                          placeholder="(555) 123-4567"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-card-foreground mb-2">City</label>
                        <input
                          type="text"
                          defaultValue={user.city || ""}
                          placeholder="New York"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-card-foreground mb-2">State</label>
                        <input
                          type="text"
                          defaultValue={user.state || ""}
                          placeholder="NY"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-card-foreground mb-2">ZIP Code</label>
                        <input
                          type="text"
                          defaultValue={user.zipCode || ""}
                          placeholder="10001"
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-card-foreground mb-2">Address</label>
                      <input
                        type="text"
                        defaultValue={user.address || ""}
                        placeholder="123 Main Street"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">Save Changes</Button>
                  </form>
                </div>

                {/* Security */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-card-foreground">Security</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-card-foreground mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-card-foreground mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-card-foreground mb-2">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
