import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { products as staticProducts, type Product, type ProductCategory } from "@/lib/products";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

export interface RemoteProduct extends Product {
  id: string;
}

const COLLECTION = "products";

function toProduct(id: string, data: Record<string, unknown>): RemoteProduct {
  return {
    id,
    slug: (data.slug as string) || id,
    name: (data.name as string) || "Unnamed",
    category: ((data.category as string) || "watches") as ProductCategory,
    price: Number(data.price) || 0,
    costPrice: data.costPrice != null ? Number(data.costPrice) : undefined,
    image: (data.image as string) || "/file.svg",
    tagline: (data.tagline as string) || "",
    description: (data.description as string) || "",
    features: (data.features as string[]) ?? [],
    materials: (data.materials as string[]) ?? [],
    badge: (data.badge as string) || undefined,
    featured: Boolean(data.featured),
    palette:
      (data.palette as Product["palette"]) ??
      ({ body: "#2a2a30", glow: "#c9a25f", accent: "#b0713c" } as const),
  };
}

/** Static catalogue + live Firestore products (Firestore wins on slug clash). */
export async function getCatalogue(): Promise<Product[]> {
  if (!isFirebaseConfigured()) return staticProducts;
  try {
    const remote = await listRemoteProducts();
    const remoteSlugs = new Set(remote.map((p) => p.slug));
    const merged = [
      ...remote.map(({ id: _id, ...p }) => p),
      ...staticProducts.filter((p) => !remoteSlugs.has(p.slug)),
    ];
    return merged;
  } catch {
    return staticProducts;
  }
}

export async function getCatalogueProduct(slug: string): Promise<Product | null> {
  const catalogue = await getCatalogue();
  return catalogue.find((p) => p.slug === slug) ?? null;
}

export async function listRemoteProducts(): Promise<RemoteProduct[]> {
  if (!isFirebaseConfigured()) return [];
  const db = getDb();
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map((d) => toProduct(d.id, d.data()));
}

export async function saveRemoteProduct(input: {
  id?: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  costPrice?: number;
  image: string;
  tagline: string;
  description: string;
  badge?: string;
  featured?: boolean;
}) {
  if (!isFirebaseConfigured()) throw new Error("Firebase not configured");
  const db = getDb();
  const id = input.id || input.slug;
  await setDoc(doc(db, COLLECTION, id), {
    slug: input.slug,
    name: input.name,
    category: input.category,
    price: input.price,
    costPrice: input.costPrice ?? null,
    image: input.image,
    tagline: input.tagline,
    description: input.description,
    badge: input.badge ?? null,
    featured: input.featured ?? false,
    updatedAt: Date.now(),
  });
  return id;
}

export async function removeRemoteProduct(id: string) {
  if (!isFirebaseConfigured()) throw new Error("Firebase not configured");
  const db = getDb();
  await deleteDoc(doc(db, COLLECTION, id));
}
