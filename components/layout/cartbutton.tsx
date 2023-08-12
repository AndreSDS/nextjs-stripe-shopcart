"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { Badge } from "@/components/ui/badge";

export function CartButton() {
  const { cartCount, formattedTotalPrice } = useShoppingCart();

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline">{cartCount}</Badge>
      <Link href="/cart" className="flex items-center justify-center gap-2">
        <ShoppingCart className="font-extrabold h-6 w-6" />
        <span>{formattedTotalPrice}</span>
      </Link>
    </div>
  );
}
