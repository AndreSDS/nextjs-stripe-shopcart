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

export default function Cart() {
  const { cartCount, cartDetails, redirectToCheckout, removeItem } =
    useShoppingCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const products =
    cartDetails && Object.keys(cartDetails).map((key) => cartDetails[key]);

  function checkout() {
    console.log("");
  }

  return (
    <section className="flex flex-col items-center justify-center">
      {products.map((product) => (
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
                  <p className="text-md font-medium leading-none" Preço></p>
                  <p className="text-md text-muted-foreground">
                    {product.formattedValue}
                  </p>
                </div>
              </div>
              <Trash2
                onClick={() => removeItem()}
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
