import ShopHome from "@/components/ShopHome";
import { ShopProvider } from "@/components/ShopContext";
import { getProducts } from "@/lib/store";

export const revalidate = 300;

export default async function Home() {
  const products = await getProducts({ revalidate: 300 });

  return (
    <ShopProvider initialProducts={products || []} initialError={!products}>
      <ShopHome />
    </ShopProvider>
  );
}
