"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems } = useCart()

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      {/* Top Bar */}
      <div className="bg-primary-dark py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span>Deliver to United States</span>
            <span>Hello, Sign in</span>
          </div>
          <div className="flex gap-6">
            <span>Returns & Orders</span>
            <span>Try Prime</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-primary py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-primary-foreground">amazon</div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 flex items-center bg-white rounded-md overflow-hidden">
            <select className="px-3 py-2 bg-gray-100 text-foreground border-r border-gray-300 text-sm">
              <option>All</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Clothing</option>
              <option>Home</option>
            </select>
            <input type="text" placeholder="Search Amazon" className="flex-1 px-4 py-2 text-foreground outline-none" />
            <button className="bg-accent hover:bg-accent/90 px-4 py-2 text-primary-foreground">
              <Search size={20} />
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Account */}
            <Link href="/account" className="flex items-center gap-1 hover:opacity-80 transition">
              <User size={24} />
              <span className="text-sm hidden sm:inline">Account</span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="flex items-center gap-1 hover:opacity-80 transition relative">
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
              <span className="text-sm hidden sm:inline">Cart</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="bg-accent text-accent-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto">
          <button className="flex items-center gap-2 hover:opacity-80 transition whitespace-nowrap">
            <Menu size={18} />
            <span>All</span>
          </button>
          <Link href="#" className="hover:opacity-80 transition whitespace-nowrap">
            Best Sellers
          </Link>
          <Link href="#" className="hover:opacity-80 transition whitespace-nowrap">
            Today's Deals
          </Link>
          <Link href="#" className="hover:opacity-80 transition whitespace-nowrap">
            New Releases
          </Link>
          <Link href="#" className="hover:opacity-80 transition whitespace-nowrap">
            Customer Service
          </Link>
          <Link href="#" className="hover:opacity-80 transition whitespace-nowrap">
            Electronics
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-primary border-t border-primary-dark">
          <div className="px-4 py-3 space-y-3">
            <Link href="/account" className="block py-2 hover:opacity-80">
              Your Account
            </Link>
            <Link href="/orders" className="block py-2 hover:opacity-80">
              Your Orders
            </Link>
            <Link href="/returns" className="block py-2 hover:opacity-80">
              Returns & Orders
            </Link>
            <Link href="/help" className="block py-2 hover:opacity-80">
              Help
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
