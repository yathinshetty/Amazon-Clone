"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface ProductFiltersProps {
  onCategoryChange: (category: string) => void
  onPriceChange: (min: number, max: number) => void
  onRatingChange: (rating: number) => void
}

export function ProductFilters({ onCategoryChange, onPriceChange, onRatingChange }: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    rating: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const categories = ["All", "Electronics", "Home", "Books", "Clothing"]
  const priceRanges = [
    { label: "Under $25", min: 0, max: 25 },
    { label: "$25 - $50", min: 25, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "Over $100", min: 100, max: 10000 },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-4 h-fit sticky top-20">
      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full mb-3 font-semibold text-card-foreground hover:text-primary"
        >
          <span>Category</span>
          <ChevronDown size={18} className={`transition-transform ${expandedSections.category ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-muted-foreground hover:text-foreground">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full mb-3 font-semibold text-card-foreground hover:text-primary"
        >
          <span>Price</span>
          <ChevronDown size={18} className={`transition-transform ${expandedSections.price ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  onChange={() => onPriceChange(range.min, range.max)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-muted-foreground hover:text-foreground">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div>
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full mb-3 font-semibold text-card-foreground hover:text-primary"
        >
          <span>Rating</span>
          <ChevronDown size={18} className={`transition-transform ${expandedSections.rating ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.rating && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="rating" onChange={() => onRatingChange(rating)} className="w-4 h-4" />
                <span className="text-sm text-muted-foreground hover:text-foreground">{rating}★ & up</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
