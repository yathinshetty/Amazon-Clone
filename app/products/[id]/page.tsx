"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductReviews } from "@/components/product-reviews"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Star, ShoppingCart, Heart, Share2, ChevronLeft } from "lucide-react"
import { getProductById, getRelatedProducts } from "@/lib/products"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  const relatedProducts = getRelatedProducts(productId)
  const { addItem } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    addItem(product!, quantity)
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">Back to Products</Button>
            </Link>
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
        {/* Breadcrumb */}
        <Link href="/products" className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ChevronLeft size={18} />
          Back to Products
        </Link>

        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden aspect-square">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category */}
            <div className="text-sm text-muted-foreground mb-2">{product.category}</div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4 text-card-foreground">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-destructive font-semibold">
                  Save ${(product.originalPrice - product.price).toFixed(2)} (
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className={`text-sm font-semibold ${product.inStock ? "text-green-600" : "text-destructive"}`}>
                {product.inStock ? "✓ In Stock" : "Out of Stock"}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-sm font-semibold text-card-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-muted transition"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold text-card-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted transition">
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                className="flex-1 bg-primary hover:bg-primary-dark text-primary-foreground py-6 text-lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="px-6 py-6 bg-transparent"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart size={20} className={isWishlisted ? "fill-destructive text-destructive" : ""} />
              </Button>
              <Button variant="outline" className="px-6 py-6 bg-transparent">
                <Share2 size={20} />
              </Button>
            </div>

            {/* Description */}
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">{product.fullDescription || product.description}</p>
            </div>
          </div>
        </div>

        {/* Features and Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-card-foreground">Key Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-card-foreground">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-start border-b border-border pb-3 last:border-b-0"
                  >
                    <span className="font-semibold text-card-foreground">{key}</span>
                    <span className="text-muted-foreground text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <ProductReviews productName={product.name} rating={product.rating} reviewCount={product.reviews} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-card-foreground">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
