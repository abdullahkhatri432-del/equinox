import { getProduct } from "@/lib/products";
import { ContactForm } from "@/components/site/contact-form";

export default async function ContactPage(
  props: PageProps<"/contact">
) {
  const searchParams = await props.searchParams;
  const productSlug = Array.isArray(searchParams?.product)
    ? searchParams.product[0]
    : searchParams?.product;
  const product = productSlug ? getProduct(productSlug) : undefined;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-14 max-w-2xl">
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-3 text-5xl sm:text-6xl">
          Begin a conversation
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Private viewings, bespoke commissions, care and repair. Tell us what
          you are looking for and the atelier will answer within one working
          day.
        </p>
      </header>

      <ContactForm product={product} />
    </div>
  );
}
