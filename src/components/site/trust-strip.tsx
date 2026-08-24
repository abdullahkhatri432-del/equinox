import { Lock, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Insured delivery", body: "Complimentary over €1,500" },
  { icon: RotateCcw, title: "30-day returns", body: "No questions asked" },
  { icon: ShieldCheck, title: "Lifetime warranty", body: "Service for every piece" },
  { icon: Lock, title: "Secure checkout", body: "256-bit encryption" },
];

export function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4 ${className}`}
      aria-label="Store guarantees"
    >
      {ITEMS.map((item) => (
        <li key={item.title} className="flex items-start gap-3">
          <item.icon size={18} className="mt-0.5 shrink-0 text-gold" />
          <div>
            <p className="text-sm font-semibold text-foreground">{item.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-faint">{item.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
