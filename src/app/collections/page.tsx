import type { Metadata } from "next";
import { getCatalogue } from "@/lib/catalogue";
import { ProductFilters } from "@/components/site/product-filters";

export const metadata: Metadata = {
  title: "Collections — SPEEDERSMANIA",
  description:
    "Browse every SPEEDERSMANIA instrument — watches and sunglasses, assembled, adjusted and signed in the Milan atelier.",
};

export const revalidate = 30;

export default async function CollectionsPage(
  props: PageProps<"/collections">
) {
  const searchParams = await props.searchParams;
  const initialView = String(searchParams?.view ?? "all");
  const catalogue = await getCatalogue();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <ProductFilters initialView={initialView} products={catalogue} />
    </div>
  );
}
