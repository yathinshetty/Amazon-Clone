import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { AdminProvider } from "@/lib/admin-context"
import { OrdersProvider } from "@/lib/orders-context"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Amazon Clone - Shop Online",
  description: "Your one-stop shop for everything",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} bg-background text-foreground`}>
        <AuthProvider>
          <AdminProvider>
            <OrdersProvider>
              <CartProvider>{children}</CartProvider>
            </OrdersProvider>
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
