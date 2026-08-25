export type ProductCategory = "watches" | "sunglasses";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  /** Your wholesale cost from the supplier, for margin tracking */
  costPrice?: number;
  image: string;
  tagline: string;
  description: string;
  features: string[];
  materials: string[];
  palette: {
    body: string;
    glow: string;
    accent: string;
    dial?: string;
  };
  featured?: boolean;
  badge?: string;
}

export const collections: Array<{
  slug: "watches" | "sunglasses";
  name: string;
  tagline: string;
  description: string;
  index: string;
}> = [
  {
    slug: "watches",
    name: "The Hour",
    tagline: "Time, held precisely.",
    description:
      "Chronometer-grade movements cased in bronze, steel and bone ceramic. Four hands, one standard: the second must never wait for the minute.",
    index: "01",
  },
  {
    slug: "sunglasses",
    name: "The Light",
    tagline: "Sunlight, understood.",
    description:
      "Zeiss-class lenses ground to filter brilliance without flattening it. Frames of titanium and bio-acetate, balanced for the longest afternoons.",
    index: "02",
  },
];

export const products: Product[] = [
  // ---------------------------------------------------------------- Watches
  {
    slug: "meridian-38",
    name: "Meridian 38",
    category: "watches",
    price: 1850,
    costPrice: 1050,
    image: "/images/products/meridian-38.jpg",
    tagline: "The quiet chronometer",
    description:
      "A 38 mm dress watch with a sun-brushed dial, blued steel hands and a 70-hour reserve. Thin enough to forget, accurate enough to trust.",
    features: [
      "38 mm bronze case, 9.1 mm thick",
      "In-house calibre SM-01, 70 h reserve",
      "Sun-brushed silver dial, blued hands",
      "Sapphire crystal, 5 ATM",
    ],
    materials: ["Bronze", "Sapphire", "Alligator leather"],
    palette: {
      body: "#2a2a30",
      glow: "#e6c383",
      accent: "#b0713c",
      dial: "#d8d2c4",
    },
    featured: true,
    badge: "Chronometer",
  },
  {
    slug: "solstice-diver",
    name: "Solstice Diver",
    category: "watches",
    price: 1240,
    costPrice: 690,
    image: "/images/products/solstice-diver.jpg",
    tagline: "Depth, illuminated",
    description:
      "A 300 m diver with a rotating elapsed-time bezel in dark ceramic and lume that burns long after the sun has gone.",
    features: [
      "41 mm steel case, 300 m water resistance",
      "Elapsed-time bezel in black ceramic",
      "Super-LumiNova indices and hands",
      "Screw-down crown, 120-click bezel",
    ],
    materials: ["316L steel", "Ceramic", "Tropic rubber"],
    palette: {
      body: "#171a1f",
      glow: "#d97742",
      accent: "#4f8a8b",
      dial: "#0f1216",
    },
    featured: true,
  },
  {
    slug: "aurelia-bone",
    name: "Aurelia Bone",
    category: "watches",
    price: 2970,
    costPrice: 1680,
    image: "/images/products/aurelia-bone.jpg",
    tagline: "Ceramic, warm as daylight",
    description:
      "A skeletonised tourbillon framed in bone-white ceramic. Complexity worn lightly, rendered legible by a champagne bridge.",
    features: [
      "Tourbillon with 60-second carousel",
      "Bone-white ceramic case, 40 mm",
      "Skeletonised dial, champagne bridges",
      "120 h power reserve indicator",
    ],
    materials: ["Ceramic", "18k gold", "Sapphire"],
    palette: {
      body: "#ece7da",
      glow: "#c9a25f",
      accent: "#8a2f3d",
      dial: "#f4f0e6",
    },
    featured: true,
    badge: "Tourbillon",
  },
  {
    slug: "umbra-auto",
    name: "Umbra Automatic",
    category: "watches",
    price: 980,
    costPrice: 540,
    image: "/images/products/umbra-auto.jpg",
    tagline: "Night, automated",
    description:
      "A matte-black automatic with a smoked gradient dial. Understated until the light catches the crimson seconds hand.",
    features: [
      "40 mm matte black steel case",
      "Automatic calibre, 41 h reserve",
      "Smoked gradient dial, crimson seconds",
      "Anti-reflective sapphire, 10 ATM",
    ],
    materials: ["Black steel", "Sapphire", "NATO weave"],
    palette: {
      body: "#0d0d10",
      glow: "#7a3240",
      accent: "#c9a25f",
      dial: "#15151a",
    },
  },
  {
    slug: "thalassa-quartz",
    name: "Thalassa Quartz",
    category: "watches",
    price: 540,
    costPrice: 290,
    image: "/images/products/thalassa-quartz.jpg",
    tagline: "A sea-green everyday",
    description:
      "A lightweight quartz in brushed steel with a sea-green dial. The everyday companion that never demands winding.",
    features: [
      "37 mm brushed steel case",
      "Swiss quartz, 7-year battery",
      "Sea-green lacquer dial",
      "Integrated steel bracelet",
    ],
    materials: ["Steel", "Lacquer", "Sapphire"],
    palette: {
      body: "#17322f",
      glow: "#4f8a8b",
      accent: "#e5a83d",
      dial: "#1e403c",
    },
  },
  {
    slug: "helios-gmt",
    name: "Helios GMT",
    category: "watches",
    price: 1490,
    costPrice: 820,
    image: "/images/products/helios-gmt.jpg",
    tagline: "Two cities, one dial",
    description:
      "A traveller GMT with a 24-hour city ring in gold. Keep home time on the main hand, adventure on the tip of the red one.",
    features: [
      "39 mm steel case, true GMT",
      "24 h gold city ring",
      "Traveller-calibre jumping hour",
      "5 ATM, exhibition caseback",
    ],
    materials: ["Steel", "Gold", "Sapphire"],
    palette: {
      body: "#1b1b20",
      glow: "#e6c383",
      accent: "#7a3240",
      dial: "#20202a",
    },
  },

  // ------------------------------------------------------------ Sunglasses
  {
    slug: "radiant-1",
    name: "Radiant 01",
    category: "sunglasses",
    price: 320,
    costPrice: 175,
    image: "/images/products/radiant-01.jpg",
    tagline: "The original gradient",
    description:
      "A round acetate frame with a rose-gold gradient lens. The first of the house, still the benchmark of the morning commute.",
    features: [
      "Bio-acetate frame, 52 mm",
      "Gradient rose lens, category 2",
      "Hand-polished, five-stage buff",
      "Nickel-free titanium hinge",
    ],
    materials: ["Bio-acetate", "CR-39 lens"],
    palette: {
      body: "#3a2a24",
      glow: "#c96a4b",
      accent: "#e6c383",
    },
    featured: true,
  },
  {
    slug: "gleam-aviator",
    name: "Gleam Aviator",
    category: "sunglasses",
    price: 410,
    costPrice: 230,
    image: "/images/products/gleam-aviator.jpg",
    tagline: "Above the weather",
    description:
      "A double-bridge aviator in gold titanium with a green photochromic lens that darkens in seconds at altitude.",
    features: [
      "Titanium double-bridge frame",
      "Photochromic green lens, cat. 1–3",
      "Anti-reflective, polarised core",
      "Adjustable rubberised temples",
    ],
    materials: ["Titanium", "Mineral lens"],
    palette: {
      body: "#31291b",
      glow: "#c9a25f",
      accent: "#3f6b46",
    },
    featured: true,
    badge: "Photochromic",
  },
  {
    slug: "noir-square",
    name: "Noir Square",
    category: "sunglasses",
    price: 285,
    costPrice: 155,
    image: "/images/products/noir-square.jpg",
    tagline: "The architectural frame",
    description:
      "A sharp square frame in matte black with a grey smoke lens. Structure for the face that wants geometry.",
    features: [
      "Matte black acetate, 50 mm",
      "Grey smoke lens, category 3",
      "Recessed metal corewire",
      "100% UV400 protection",
    ],
    materials: ["Acetate", "Nylon lens"],
    palette: {
      body: "#141416",
      glow: "#6f6b62",
      accent: "#c9a25f",
    },
  },
  {
    slug: "dune-tortoise",
    name: "Dune Tortoise",
    category: "sunglasses",
    price: 350,
    costPrice: 195,
    image: "/images/products/dune-tortoise.jpg",
    tagline: "Warmth in the amber",
    description:
      "An amber tortoise frame with a bronze gradient lens. Sunlight slowed down to the speed of a long weekend.",
    features: [
      "Tortoise acetate, hand-mottled",
      "Bronze gradient lens, category 2",
      "Comfort-fit sculpted nose bridge",
      "100% UV400 protection",
    ],
    materials: ["Acetate", "CR-39 lens"],
    palette: {
      body: "#4a3320",
      glow: "#b0713c",
      accent: "#e5a83d",
    },
  },
  {
    slug: "crest-vision",
    name: "Crest Vision",
    category: "sunglasses",
    price: 460,
    costPrice: 260,
    image: "/images/products/crest-vision.jpg",
    tagline: "For the long horizon",
    description:
      "A sport shield in matte graphite with a mirror amber lens and hydrophilic grip for days that start before dawn.",
    features: [
      "Graphite nylon frame, wrap coverage",
      "Mirror amber lens, category 3",
      "Hydrophilic rubberised grip",
      "Interchangeable vented lens",
    ],
    materials: ["Nylon", "Polycarbonate lens"],
    palette: {
      body: "#1d1f22",
      glow: "#e5a83d",
      accent: "#4f8a8b",
    },
  },
  {
    slug: "lume-half",
    name: "Lume Half",
    category: "sunglasses",
    price: 260,
    costPrice: 140,
    image: "/images/products/lume-half.jpg",
    tagline: "Half frame, full view",
    description:
      "A rimless-meets-metal half frame in polished silver with a clear-to-smoke photochromic lens. Minimal, architectural, precise.",
    features: [
      "Polished silver metal, half-rim",
      "Photochromic lens, cat. 1–3",
      "Ultra-light, ~18 g",
      "100% UV400 protection",
    ],
    materials: ["Stainless steel", "Nylon lens"],
    palette: {
      body: "#23242a",
      glow: "#c9a25f",
      accent: "#8a2f3d",
    },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
