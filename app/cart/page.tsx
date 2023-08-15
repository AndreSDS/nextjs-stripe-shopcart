"use client";
import Image from "next/image";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

export default function Cart() {
  const { cartCount, cartDetails, redirectToCheckout, removeItem } =
    useShoppingCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const products =
    cartDetails && Object.keys(cartDetails).map((key) => cartDetails[key]);

  async function checkout() {
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartDetails),
      });

      const { id } = await response.json();

      await redirectToCheckout(id);
      setIsCheckingOut(false);
    } catch (error) {
      console.log("Erro na funcão de checkout - ", error);
      setIsCheckingOut(false);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center">
      {products.map((product: Product) => (
        <Card key={product.name}>
          <CardHeader>
            <CardTitle className="tracking-wide">
              {product.name} - {product.quantity}
            </CardTitle>
            <CardDescription className="text-md tracking-wide">
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-28 h-28">
                  <Image
                    src={product.image || ""}
                    fill
                    alt={product.name}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-md font-medium leading-none">Preço</p>
                  <p className="text-md text-muted-foreground">
                    {product.formattedValue}
                  </p>
                </div>
              </div>
              <Trash2
                onClick={() => removeItem(product.id)}
                className="text-red-400 hover:text-red-600"
              />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between"></CardFooter>
        </Card>
      ))}

      <div
        className={cn(
          "flex items-center justify-end",
          cartCount === undefined || cartCount <= 0 ? "hidden" : ""
        )}
      >
        <Button
          variant="default"
          size="lg"
          onClick={checkout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? "Finalizando..." : "Finalizar"}
        </Button>
      </div>
    </section>
  );
}
