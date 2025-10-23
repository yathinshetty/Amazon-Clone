"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

interface ProductSearchProps {
  onSearch: (query: string) => void
}

export function ProductSearch({ onSearch }: ProductSearchProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="relative">
      <div className="flex items-center bg-white border border-border rounded-lg overflow-hidden">
        <Search size={20} className="ml-3 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 px-4 py-2 outline-none text-foreground"
        />
        {query && (
          <button
            onClick={() => handleSearch("")}
            className="mr-3 text-muted-foreground hover:text-foreground transition"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
