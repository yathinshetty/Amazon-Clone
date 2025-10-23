"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: BarChart3 },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-slate-400 text-sm">Amazon Clone</p>
      </div>

      <nav className="space-y-2 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-orange-500 text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <button
        onClick={logout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  )
}
