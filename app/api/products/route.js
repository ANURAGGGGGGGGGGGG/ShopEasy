import { NextResponse } from "next/server";
import { getProducts } from "@/lib/store";

export const revalidate = 300;

export async function GET() {
  const products = await getProducts({ revalidate: 300 });

  if (!products) {
    return NextResponse.json(
      { error: "The product feed did not respond." },
      { status: 502 }
    );
  }

  return NextResponse.json(products);
}
