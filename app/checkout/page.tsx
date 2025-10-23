"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartSummary } from "@/components/cart-summary"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ChevronLeft, Check } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalItems, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setOrderPlaced(true)

    // Clear cart and redirect after 2 seconds
    setTimeout(() => {
      clearCart()
      router.push("/order-confirmation")
    }, 2000)
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-card-foreground mb-4">Your cart is empty</h1>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <Check size={48} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-card-foreground mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-6">Redirecting to confirmation page...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <Link href="/cart" className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ChevronLeft size={18} />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold text-card-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-card-foreground">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="col-span-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="col-span-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="col-span-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="col-span-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-card-foreground">Payment Method</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-3 text-lg font-semibold"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
