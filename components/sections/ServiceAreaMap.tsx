import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { content } from "@/lib/content";
import { citySlug } from "@/lib/landing-pages";
import { LeafMark } from "@/components/site/LeafMark";
import { Reveal } from "@/components/site/Reveal";

// Aesthetic placement of the six real service cities around the Sterling hub.
const points: Record<string, { x: number; y: number; lx: number; ly: number; anchor: "start" | "end" | "middle" }> = {
  Sterling: { x: 120, y: 122, lx: 120, ly: 108, anchor: "middle" },
  Leesburg: { x: 70, y: 72, lx: 64, ly: 62, anchor: "middle" },
  Ashburn: { x: 70, y: 158, lx: 62, ly: 176, anchor: "middle" },
  Herndon: { x: 128, y: 192, lx: 128, ly: 210, anchor: "middle" },
  Reston: { x: 180, y: 168, lx: 192, ly: 182, anchor: "middle" },
  "Great Falls": { x: 198, y: 110, lx: 206, ly: 100, anchor: "middle" },
};

export function ServiceAreaMap() {
  const cities = content.business.service_area_zips.map((c) => c.city);

  return (
    <section
      id="service-area"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-kva-forest-deep via-kva-forest to-kva-forest-deep py-12 text-kva-cream sm:py-16"
    >
      <Reveal className="kva-container grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
        {/* Illustrated map */}
        <div className="mx-auto w-full max-w-[18rem]">
          <svg viewBox="0 0 260 260" role="img" aria-labelledby="kva-map-title" className="h-auto w-full">
            <title id="kva-map-title">KVA Landscaping service area around Sterling, Virginia</title>
            <circle cx="130" cy="130" r="112" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" />
            <circle cx="130" cy="130" r="78" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeDasharray="3 5" />
            {Object.entries(points).map(([city, p]) => {
              const isHub = city === "Sterling";
              return (
                <g key={city}>
                  <line x1="120" y1="122" x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHub ? 6 : 4}
                    fill={isHub ? "var(--kva-gold)" : "#fff"}
                    stroke="var(--kva-forest)"
                    strokeWidth={isHub ? 3 : 2.5}
                  />
                  <text
                    x={p.lx}
                    y={p.ly}
                    textAnchor={p.anchor}
                    fontSize="10"
                    fontWeight={isHub ? 700 : 500}
                    fill={isHub ? "var(--kva-gold)" : "rgba(255,255,255,0.85)"}
                    fontFamily="system-ui, sans-serif"
                  >
                    {city}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Copy + chips */}
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-kva-cream/70">Service area</p>
          <h2 className="mt-3 font-display text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            Proudly serving Northern Virginia.
          </h2>
          <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-kva-cream/80">
            Based in Sterling, KVA works the towns within about {content.business.service_area_radius_mi} miles — keeping
            properties looking their best across Loudoun and western Fairfax all year long.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/locations/${citySlug(city)}`}
                className="rounded-full border border-kva-cream/35 px-3 py-1.5 text-xs font-medium text-kva-cream/90 transition-colors hover:border-kva-cream hover:bg-kva-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream"
              >
                {city}
              </Link>
            ))}
          </div>
          <Link
            href="/locations"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-kva-cream transition-colors hover:text-kva-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-forest"
          >
            View full service area
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        {/* Local trust card */}
        <aside className="flex items-start gap-4 rounded-2xl bg-kva-cream p-6 text-kva-ink shadow-xl shadow-black/20">
          <LeafMark className="h-12 w-12 flex-none" />
          <div>
            <h3 className="font-display text-xl font-medium leading-tight text-kva-ink">
              A local crew — not a call center.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-kva-stone">
              Nine years working the same ten-mile radius around Sterling. We know the Loudoun clay, the HOA paver
              rules, and when to schedule hardscape around the freeze-thaw — because we live here too.
            </p>
          </div>
        </aside>
      </Reveal>
    </section>
  );
}
