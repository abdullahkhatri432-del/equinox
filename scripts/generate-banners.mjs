// Generates Equinox launch banners (3 art directions x 7 formats) as self-contained HTML.
// Usage: node scripts/generate-banners.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "assets", "banners", "equinox-launch");
mkdirSync(outDir, { recursive: true });

const IMG = "../../../public/images/products";

const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">';

const SIZES = [
  { name: "hero", w: 1920, h: 800, tier: "full" },
  { name: "twitter", w: 1500, h: 500, tier: "full" },
  { name: "facebook", w: 820, h: 312, tier: "full" },
  { name: "insta-story", w: 1080, h: 1920, tier: "full" },
  { name: "insta-post", w: 1080, h: 1080, tier: "full" },
  { name: "ad-leader", w: 728, h: 90, tier: "compact" },
  { name: "ad-rect", w: 300, h: 250, tier: "compact" },
];

const COPY = {
  eyebrow: "NEW SEASON",
  headline: "The Hour & The Light",
  sub: "Watches engineered to the second. Sunglasses tuned to the light.",
  cta: "Explore the collections",
  brand: "EQUINOX",
  brandTag: "TIME & LIGHT",
};

// Wide (>= 1.8 ratio) gets a horizontal flow; otherwise vertical/centered.
const isWide = (w, h) => w / h >= 1.8;

function baseCss(w, h) {
  return `
  :root { --bg:#0b0b0d; --soft:#131316; --ink:#ece8df; --mist:#a6a195;
          --faint:#6f6b62; --gold:#c9a25f; --goldb:#e6c383; --copper:#b0713c; --line:#26262b; }
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:100%; height:100%; overflow:hidden; background:var(--bg); }
  body {
    font-family:'Manrope', system-ui, sans-serif; color:var(--ink);
    font-size:${Math.round(w / 100)}px;
    -webkit-font-smoothing:antialiased;
  }
  .canvas { position:relative; width:100%; height:100%; overflow:hidden;
            display:flex; flex-direction:column; justify-content:center; padding: 4em 5em; }
  .serif { font-family:'Playfair Display', Georgia, serif; font-weight:400; }
  .eyebrow { font-size:.72em; letter-spacing:.42em; text-transform:uppercase;
             color:var(--gold); font-weight:600; }
  .hairline { height:1px; background:linear-gradient(90deg, transparent, var(--line) 18%, var(--line) 82%, transparent); }
  .cta { display:inline-flex; align-items:center; gap:.6em; padding:.9em 1.8em;
         border-radius:999px; font-size:.78em; font-weight:700; letter-spacing:.08em;
         background:var(--gold); color:#0b0b0d; text-decoration:none; }
  .cta::after { content:"→"; }
  .faint { color:var(--faint); }
`;
}

// ---------------------------------------------------------------- Direction 01
function vault(w, h) {
  const wide = isWide(w, h);
  const img = `${IMG}/meridian-38.jpg`;
  const cta = COPY.cta;
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${baseCss(w, h)}
  .canvas { padding:3.5em 5.5em; }
  .frame { position:relative; width:min(42%,34em); aspect-ratio:1/1; border-radius:50%;
           border:1px solid var(--line); padding:.55em; background:radial-gradient(circle at 50% 35%, #17171b, var(--bg) 78%);
           box-shadow:0 1.5em 4em rgba(0,0,0,.55); }
  .frame img { width:100%; height:100%; object-fit:cover; border-radius:50%; filter:grayscale(.25) contrast(1.05); }
  .frame::after { content:""; position:absolute; inset:-1.2em; border-radius:50%;
                  border:1px solid color-mix(in srgb, var(--gold) 45%, transparent); }
  .copy { position:relative; z-index:2; }
  ${wide ? ".canvas{flex-direction:row; align-items:center; gap:5em;} .frame{flex:0 0 auto;} .copy{max-width:34em;} .frame + .copy{margin-left:auto;}"
        : ".canvas{align-items:center; text-align:center;} .frame{width:min(72%,22em); margin:0 auto 2.5em;} .copy{max-width:24em;}"}
  .headline { margin-top:.55em; font-size:clamp(1.9em, 4.4em, 5.2em); line-height:1.04; letter-spacing:-.01em; }
  .headline em { font-style:italic; color:var(--goldb); }
  .sub { margin-top:1.1em; color:var(--mist); line-height:1.55; max-width:30em;
         ${wide ? "" : "margin-inline:auto;"} font-size:1em; }
  .cta { margin-top:1.6em; }
  .top { position:absolute; top:0; left:0; right:0; display:flex; justify-content:space-between;
         align-items:center; padding:1.6em 2.2em; font-size:.62em; }
  .top .brand { letter-spacing:.4em; }
  .bottom { position:absolute; bottom:0; left:0; right:0; padding:1.4em 2.2em; font-size:.58em;
            display:flex; justify-content:space-between; color:var(--faint); letter-spacing:.18em; }
</style></head><body>
  <div class="canvas">
    <div class="top"><span class="brand">EQUINOX</span><span class="eyebrow">${COPY.eyebrow}</span></div>
    <div class="frame"><img src="${img}" alt="Meridian 38 watch"></div>
    <div class="copy">
      <h1 class="serif headline">The <em>Hour</em> & The <em>Light</em></h1>
      <p class="sub">${COPY.sub}</p>
      <a class="cta" href="#">${cta}</a>
    </div>
    <div class="bottom"><span>MILANO — SINCE 2019</span><span>EQUINOX.ATELIER</span></div>
  </div>
</body></html>`;
}

// ---------------------------------------------------------------- Direction 02
function haze(w, h) {
  const wide = isWide(w, h);
  const img = `${IMG}/aurelia-bone.jpg`;
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${baseCss(w, h)}
  .bg { position:absolute; inset:0; }
  .bg img { width:100%; height:100%; object-fit:cover; filter:saturate(.85) contrast(1.06); }
  .veil { position:absolute; inset:0; background:
    linear-gradient(90deg, rgba(11,11,13,.96) 0%, rgba(11,11,13,.78) 38%, rgba(11,11,13,.25) 68%, rgba(11,11,13,.35) 100%),
    radial-gradient(120% 90% at 85% 20%, rgba(201,162,95,.28), transparent 55%),
    radial-gradient(120% 120% at 20% 110%, rgba(176,113,60,.22), transparent 60%); }
  .copy { position:relative; z-index:2; max-width:34em; }
  ${wide ? ".canvas{padding:4em 6em;}" : ".canvas{justify-content:flex-end; padding:4em 3.2em 5em; text-align:left;}"}
  .headline { margin-top:.5em; font-size:clamp(2em,4.6em,5.4em); line-height:1.02; }
  .headline em { font-style:italic; color:var(--goldb); }
  .sub { margin-top:1.1em; color:var(--mist); line-height:1.55; font-size:1em; max-width:26em; }
  .cta { margin-top:1.7em; }
  .top { position:absolute; top:0; left:0; right:0; display:flex; justify-content:space-between;
         align-items:center; padding:1.6em 2.2em; font-size:.62em; }
  .top .brand { letter-spacing:.4em; }
  .index { position:absolute; right:2.2em; bottom:1.4em; font-size:.6em; color:var(--faint);
           letter-spacing:.3em; }
</style></head><body>
  <div class="canvas">
    <div class="bg"><img src="${img}" alt="Aurelia Bone watch"></div>
    <div class="veil"></div>
    <div class="top"><span class="brand">EQUINOX</span><span class="eyebrow">${COPY.eyebrow}</span></div>
    <div class="copy">
      <h1 class="serif headline">The Hour<br>& The <em>Light</em></h1>
      <p class="sub">${COPY.sub}</p>
      <a class="cta" href="#">${COPY.cta}</a>
    </div>
    <div class="index">COLLECTION 01 — 02</div>
  </div>
</body></html>`;
}

// ---------------------------------------------------------------- Direction 03
function editorial(w, h) {
  const wide = isWide(w, h);
  const imgA = `${IMG}/meridian-38.jpg`;
  const imgB = `${IMG}/gleam-aviator.jpg`;
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${baseCss(w, h)}
  .top { position:absolute; top:0; left:0; right:0; display:flex; justify-content:space-between;
         align-items:center; padding:1.5em 2.2em; font-size:.62em; border-bottom:1px solid var(--line); }
  .top .brand { letter-spacing:.4em; }
  .grid { position:relative; display:grid; height:100%; width:100%; }
  ${wide ? `.grid{grid-template-columns:1.05fr .95fr;}
    .rail { display:flex; flex-direction:column; justify-content:center; padding:4em 3em 4em 5em; }
    .tiles { display:grid; grid-template-columns:1fr 1fr; gap:1em; align-items:center;
             padding:4em 4em 4em 1em; position:relative; }
    .tiles::before { content:""; position:absolute; left:0; top:14%; bottom:14%;
                     width:1px; background:var(--line); }
    .tile { height:100%; min-height:0; }
    .tile img { width:100%; height:100%; object-fit:cover; filter:grayscale(.18) contrast(1.05); }
    .cap { margin-top:.7em; font-size:.52em; color:var(--faint); letter-spacing:.22em; }`
        : `.grid{grid-template-rows:auto 1fr;}
    .rail { padding:4em 3em 1em; text-align:center; }
    .tiles { display:grid; grid-template-columns:1fr 1fr; gap:1em; align-items:center;
             padding:1em 3em 4em; position:relative; }
    .tile img { width:100%; height:100%; object-fit:cover; filter:grayscale(.18) contrast(1.05); }
    .cap { margin-top:.6em; font-size:.5em; color:var(--faint); letter-spacing:.2em; }`}
  .headline { font-size:clamp(1.7em,3.6em,4.4em); line-height:1.06; }
  .headline em { font-style:italic; color:var(--goldb); }
  .sub { margin-top:1em; color:var(--mist); line-height:1.5; max-width:26em; font-size:.95em;
         ${wide ? "" : "margin-inline:auto;"} }
  .cta { margin-top:1.5em; }
  .num { font-size:.6em; letter-spacing:.3em; color:var(--gold); }
  .num + .num { margin-top:.4em; }
</style></head><body>
  <div class="grid">
    <div class="top"><span class="brand">EQUINOX</span><span class="eyebrow">${COPY.eyebrow}</span><span class="faint">${COPY.brandTag}</span></div>
    <div class="rail">
      <div class="num">01 / THE HOUR</div>
      <h1 class="serif headline">Two houses of<br><em>time &amp; light.</em></h1>
      <p class="sub">${COPY.sub}</p>
      <a class="cta" href="#">${COPY.cta}</a>
    </div>
    <div class="tiles">
      <div><div class="tile" style="height:${wide ? "58%" : "70%"};"><img src="${imgA}" alt="Meridian 38 watch"></div>
           <div class="cap">THE HOUR — MERIDIAN 38</div></div>
      <div><div class="tile" style="height:${wide ? "58%" : "70%"};"><img src="${imgB}" alt="Gleam Aviator sunglasses"></div>
           <div class="cap">THE LIGHT — GLEAM AVIATOR</div></div>
    </div>
  </div>
</body></html>`;
}

const DIRECTIONS = [
  { id: "vault", label: "The Vault — gold-framed minimal", render: vault },
  { id: "haze", label: "Golden Haze — photographic gradient", render: haze },
  { id: "editorial", label: "Editorial Grid — magazine split", render: editorial },
];

const files = [];
for (const dir of DIRECTIONS) {
  for (const size of SIZES) {
    const html = dir.render(size.w, size.h, size.tier);
    const name = `${dir.id}-${size.name}-${size.w}x${size.h}.html`;
    writeFileSync(join(outDir, name), html, "utf8");
    files.push(name);
  }
}
console.log(`Wrote ${files.length} HTML banners to ${outDir}`);
