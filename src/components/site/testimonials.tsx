const QUOTES = [
  {
    quote:
      "The Meridian keeps within two seconds a month on the wrist. I stopped checking against the radio clock — that is the compliment.",
    name: "Henrik M.",
    detail: "Meridian 38, Copenhagen",
  },
  {
    quote:
      "Ordered on Tuesday, wearing them by Friday. The lenses make noon light bearable without draining the colour out of the city.",
    name: "Amara O.",
    detail: "Radiant 01, Lagos",
  },
  {
    quote:
      "A hairline scratch on the clasp after a year — they serviced it, polished it and returned it in nine days, free.",
    name: "Sofia R.",
    detail: "Solstice Diver, Milano",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 text-center">
        <p className="eyebrow">From the wrist &amp; the face</p>
        <h2 className="display mx-auto mt-3 max-w-xl text-4xl sm:text-5xl">
          Worn, judged, kept.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {QUOTES.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-md border border-line bg-soft p-7"
          >
            <div
              className="text-gold"
              aria-label="5 out of 5 stars"
              role="img"
            >
              {"★★★★★"}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 border-t border-line pt-4">
              <p className="text-sm font-semibold tracking-wide">{t.name}</p>
              <p className="mt-0.5 text-xs text-faint">{t.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
