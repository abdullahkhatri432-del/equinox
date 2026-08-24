import { ProductFilters } from "@/components/site/product-filters";

export const metadata = {
  title: "Collections — Equinox",
  description:
    "Browse every Equinox instrument — watches and sunglasses, assembled, adjusted and signed in the Milan atelier.",
};

export default async function CollectionsPage(
  props: PageProps<"/collections">
) {
  const searchParams = await props.searchParams;
  const initialView = String(searchParams?.view ?? "all");

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <ProductFilters initialView={initialView} />
    </div>
  );
}
