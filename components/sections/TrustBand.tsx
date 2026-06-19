import { ShieldCheck, MapPin, Leaf } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    body: "Fully licensed in Virginia — COIs on request",
  },
  {
    icon: MapPin,
    title: "Local & Family-Run",
    body: "A Sterling crew, nine years in NoVA",
  },
  {
    icon: Leaf,
    title: "Free On-Site Estimates",
    body: "A real number after we walk the property",
  },
];

export function TrustBand() {
  return (
    <section aria-label="Why homeowners trust KVA" className="border-b border-kva-stone-light bg-kva-cream">
      <div className="kva-container grid grid-cols-1 divide-y divide-kva-stone-light sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-center gap-4 py-5 sm:justify-center sm:px-4 sm:py-6">
            <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full bg-kva-forest/10 text-kva-forest">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-kva-ink">{title}</p>
              <p className="mt-0.5 text-xs leading-snug text-kva-stone">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
