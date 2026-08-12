import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-soft">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="display text-xl">Equinox</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Watches engineered to the second. Sunglasses tuned to the light.
              One house, two instruments of time and sun.
            </p>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><Link className="transition-colors hover:text-gold" href="/collections">All collections</Link></li>
              <li><Link className="transition-colors hover:text-gold" href="/collections?view=watches">Watches</Link></li>
              <li><Link className="transition-colors hover:text-gold" href="/collections?view=sunglasses">Sunglasses</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">House</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><Link className="transition-colors hover:text-gold" href="/contact">Contact</Link></li>
              <li><Link className="transition-colors hover:text-gold" href="/contact">Bespoke requests</Link></li>
              <li><Link className="transition-colors hover:text-gold" href="/contact">Care &amp; repair</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Atelier</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              12 Avenida del Sol<br />
              Milano, 20121<br />
              <a href="mailto:atelier@equinox.shop" className="text-foreground transition-colors hover:text-gold">
                atelier@equinox.shop
              </a>
            </p>
          </div>
        </div>

        <div className="hairline mt-12" />
        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-faint sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Equinox Atelier. All rights reserved.</p>
          <p>Crafted between the ticks of a second and the fall of a shadow.</p>
        </div>
      </div>
    </footer>
  );
}
