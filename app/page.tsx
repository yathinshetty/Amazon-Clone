import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { products } from "@/lib/products"

export default function Home() {
  const featuredProducts = products.slice(0, 4)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">Welcome to Amazon </h1>
              <p className="text-xl text-gray-300 mb-6">
                Discover millions of products at unbeatable prices. Shop now and save big!
              </p>
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 text-lg">
                  Start Shopping
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-6xl mb-4">🛍️</div>
                  <p className="text-lg">Fast Shipping • Easy Returns • Secure Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer h-full">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                      Sale
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-slate-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Electronics", "Home", "Books", "Sports"].map((category) => (
              <Link key={category} href={`/products?category=${category}`}>
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="text-4xl mb-3">
                    {category === "Electronics" && "📱"}
                    {category === "Home" && "🏠"}
                    {category === "Books" && "📚"}
                    {category === "Sports" && "⚽"}
                  </div>
                  <h3 className="font-semibold text-slate-900">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore more?</h2>
          <p className="text-lg mb-6 opacity-90">Browse our complete catalog of thousands of products</p>
          <Link href="/products">
            <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
