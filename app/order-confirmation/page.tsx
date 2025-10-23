"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Check, Package, Truck, Home } from "lucide-react"

export default function OrderConfirmationPage() {
  const orderNumber = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Check size={48} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-card-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-4">Thank you for your purchase</p>
          <div className="bg-muted rounded-lg p-4 inline-block">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="text-2xl font-bold text-card-foreground">#{orderNumber}</p>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 text-card-foreground">What's Next?</h2>
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Order Confirmed</h3>
                <p className="text-sm text-muted-foreground">
                  We've received your order and are preparing it for shipment.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted text-muted-foreground font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Processing</h3>
                <p className="text-sm text-muted-foreground">Your items are being packed and prepared for delivery.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted text-muted-foreground font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Shipped</h3>
                <p className="text-sm text-muted-foreground">
                  Your order is on its way! You'll receive a tracking number via email.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted text-muted-foreground font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">Delivered</h3>
                <p className="text-sm text-muted-foreground">Your order has been delivered. Enjoy your purchase!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Package size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground mb-1">Items</p>
            <p className="text-2xl font-bold text-card-foreground">3</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Truck size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
            <p className="text-2xl font-bold text-card-foreground">3-5 days</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <Home size={24} className="mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground mb-1">Shipping To</p>
            <p className="text-sm font-bold text-card-foreground">Your Address</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
