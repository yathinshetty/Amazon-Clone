"use client"

import { useCart } from "@/lib/cart-context"

interface CartSummaryProps {
  showCheckoutButton?: boolean
  onCheckout?: () => void
}

export function CartSummary({ showCheckoutButton = false, onCheckout }: CartSummaryProps) {
  const { getTotalPrice, getTotalItems } = useCart()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-20">
      <h2 className="text-xl font-bold mb-4 text-card-foreground">Order Summary</h2>

      <div className="space-y-3 mb-4 pb-4 border-b border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({getTotalItems()} items)</span>
          <span className="font-semibold text-card-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-semibold text-card-foreground">
            {shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-semibold text-card-foreground">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <span className="font-bold text-card-foreground">Total</span>
        <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
      </div>

      {showCheckoutButton && (
        <button
          onClick={onCheckout}
          className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold py-3 rounded-lg transition"
        >
          Proceed to Checkout
        </button>
      )}

      {subtotal > 0 && subtotal <= 100 && (
        <div className="mt-4 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
          <span className="font-semibold text-primary">${(100 - subtotal).toFixed(2)}</span> more for free shipping!
        </div>
      )}
    </div>
  )
}
