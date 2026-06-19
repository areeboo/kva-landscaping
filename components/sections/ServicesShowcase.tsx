import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  Layers,
  Scissors,
  Snowflake,
  Sprout,
  TreePine,
  type LucideIcon,
} from "lucide-react";
import { content } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Scissors,
  Sprout,
  Layers,
  TreePine,
  Droplets,
  Snowflake,
};

// Short card lines — punchier than the full service blurbs used on detail pages.
const cardBlurb: Record<string, string> = {
  "lawn-care": "Weekly mowing, edging, and trimming — sharp lines, healthy turf.",
  "mulch-beds-planting": "Fresh mulch, reshaped beds, and planting built for NoVA seasons.",
  "hardscape-patios": "Paver patios, walkways, and stone that stay level for years.",
  "tree-shrub": "Pruning, shaping, and removals by a crew that knows each species.",
  irrigation: "New installs, zone repairs, seasonal start-up, and winterization.",
  seasonal: "Snow plowing, ice melt, and spring & fall cleanups — one crew, four seasons.",
};

export function ServicesShowcase() {
  return (
    <section id="services" className="scroll-mt-24 bg-kva-cream py-20 sm:py-24">
      <div className="kva-container">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-kva-forest">Our services</p>
            <h2 className="mt-3 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-ink sm:text-5xl">
              Complete care for every season.
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex flex-none items-center gap-2 rounded-full text-sm font-bold text-kva-forest transition-colors hover:text-kva-forest-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
          >
            View all services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service) => {
            const Icon = iconMap[service.icon] ?? Sprout;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-kva-stone-light bg-kva-cream shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-kva-forest/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} by KVA Landscaping`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute -bottom-5 left-5 inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-kva-cream bg-kva-forest text-kva-cream shadow-md">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-5 pb-5 pt-9">
                  <h3 className="font-display text-xl font-medium leading-snug tracking-tight text-kva-ink group-hover:text-kva-forest">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-kva-stone">
                    {cardBlurb[service.slug] ?? service.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-kva-forest">
                    Service details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
