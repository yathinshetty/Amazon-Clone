"use client"

import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { CartItem as CartItemType } from "@/lib/cart-context"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-b-0">
      {/* Product Image */}
      <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-card-foreground mb-1">{item.product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{item.product.category}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-primary">${item.product.price.toFixed(2)}</span>
          {item.product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${item.product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-transparent"
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus size={16} />
          </Button>
          <span className="w-8 text-center font-semibold text-card-foreground">{item.quantity}</span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-transparent"
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>

      {/* Subtotal and Remove */}
      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <div className="text-sm text-muted-foreground mb-1">Subtotal</div>
          <div className="text-xl font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => removeItem(item.product.id)}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  )
}
