"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [joined, setJoined] = useState(false);

  if (joined) {
    return (
      <p className="mx-auto mt-10 max-w-md rounded-full border border-gold/40 bg-gold/10 px-6 py-3.5 text-sm text-foreground">
        You are on the list — see you at the next SPEEDERSMANIA.
      </p>
    );
  }

  return (
    <form
      className="mx-auto mt-10 flex max-w-md items-center gap-2 rounded-full border border-line bg-background p-1.5"
      onSubmit={(e) => {
        e.preventDefault();
        setJoined(true);
      }}
    >
      <label htmlFor="nl-email" className="sr-only">
        Email address
      </label>
      <input
        id="nl-email"
        type="email"
        required
        placeholder="you@example.com"
        className="w-full bg-transparent px-4 py-2 text-sm text-foreground outline-none placeholder:text-faint"
      />
      <button
        type="submit"
        className="btn-primary shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold"
      >
        Join
      </button>
    </form>
  );
}
