import { ShieldCheck, Award, Hammer, Leaf } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Class A VA Contractor",
    body: "Licensed Class A in Virginia, insured — background-checked crew",
  },
  {
    icon: Award,
    title: "Thumbtack Top Pro",
    body: "Top Pro 2025 & 2023 · 4.7★ across 165+ reviews",
  },
  {
    icon: Hammer,
    title: "9 Years · 206 Jobs",
    body: "Nearly a decade in NoVA, 206 jobs hired through Thumbtack",
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
      <div className="kva-container grid grid-cols-1 divide-y divide-kva-stone-light sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {items.map(({ icon: Icon, title, body }, index) => (
          <div
            key={title}
            className={`flex items-center gap-4 py-5 sm:px-5 sm:py-6 ${
              index % 2 === 1 ? "sm:border-l sm:border-kva-stone-light lg:border-l-0" : ""
            } ${index >= 2 ? "border-t border-kva-stone-light sm:border-t lg:border-t-0" : ""}`}
          >
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
