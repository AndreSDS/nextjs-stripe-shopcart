"use client";
import Image from "next/image";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "../../types";

export function ProductCard({
  id,
  name,
  description,
  price,
  currency,
  image,
  images,
}: Product) {
  const { toast } = useToast();
  const { addItem } = useShoppingCart();
  const formattedPrice = formatCurrencyString({
    value: Number(price),
    currency,
    language: "pt-BR",
  });

  async function addToCart(e: React.MouseEvent<HTMLButtonElment>) {
    e.preventDefault();

    await addItem({
      name,
      description,
      id,
      price,
      currency,
      image,
    });

    toast({
      title: "Produto adicionado ao carrinho",
      description: name,
    });
  }

  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle className="flex items-center justify-center min-h-14">
          {name}
        </CardTitle>
        <CardDescription className="relative w-full h-60">
          <Image
            src={image}
            fill
            sizes="100%"
            alt={name}
            className="object-contain"
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p className="min-h-[6rem]">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <p>Preço</p>
          <p>{formattedPrice}</p>
        </div>
        <Button size="lg" variant="default" onClick={addToCart}>
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
}
