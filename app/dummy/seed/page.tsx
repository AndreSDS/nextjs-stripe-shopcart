import { stripe } from "@/lib/stripe";
import { Product, DummyProduct } from "../../../types";

async function getDummyProducts() {
  const response = await fetch("https://dummyjson.com/products?limit=9");
  const dummyData = await response.json();
  const products = dummyData.products.map(
    ({ id, title, description, price, images }: DummyProduct) => {
      return {
        id,
        name: title,
        description,
        images,
        default_price_data: {
          unit_amount_decimal: price,
          currency: "BRL",
        },
      };
    }
  );

  return products;
}

async function seedDummyData() {
  const products = await getDummyProducts();

  await products.map(async (product: any) => {
    try {
      await stripe.products.create(product);
    } catch (error: any) {
      console.log("Stripe_Create_Error: ", error.message);
    }
  });
}

export default async function Seed() {
  await seedDummyData();

  return (
    <div className="container flex items-center justify-center">
      <h1 className="text-3xl text-green-600 font-extrabold">
        Dummy data created.
      </h1>
    </div>
  );
}
