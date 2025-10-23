"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartItem } from "@/components/cart-item"
import { CartSummary } from "@/components/cart-summary"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, ChevronLeft } from "lucide-react"

export default function CartPage() {
  const router = useRouter()
  const { items, clearCart, getTotalItems } = useCart()

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-card-foreground mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link href="/products">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <ChevronLeft size={18} />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <CartSummary showCheckoutButton onCheckout={handleCheckout} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingCart size={64} className="text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-card-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to get started!</p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
