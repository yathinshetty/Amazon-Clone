"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearch } from "@/components/product-search"
import { products } from "@/lib/products"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [minRating, setMinRating] = useState(0)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      // Rating filter
      const matchesRating = product.rating >= minRating

      return matchesSearch && matchesCategory && matchesPrice && matchesRating
    })
  }, [searchQuery, selectedCategory, priceRange, minRating])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <ProductSearch onSearch={setSearchQuery} />
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="w-64 hidden lg:block">
            <ProductFilters
              onCategoryChange={setSelectedCategory}
              onPriceChange={(min, max) => setPriceRange([min, max])}
              onRatingChange={setMinRating}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">Products</h1>
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg text-muted-foreground mb-2">No products found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
