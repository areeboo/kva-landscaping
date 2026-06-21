import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { content } from "@/lib/content";
import { getServiceIcon } from "@/lib/service-icons";

// Six featured services — one per category — shown with photos on the homepage.
const featuredSlugs = [
  "lawn-mowing",
  "mulching",
  "paver-patios",
  "tree-trimming-removal",
  "sprinkler-installation",
  "snow-plowing",
];

const featured = featuredSlugs
  .map((slug) => content.services.find((service) => service.slug === slug))
  .filter((service): service is (typeof content.services)[number] => Boolean(service));

export function ServicesShowcase() {
  return (
    <section id="services" className="scroll-mt-24 bg-kva-cream py-12 sm:py-16">
      <div className="kva-container">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-kva-forest">Our services</p>
            <h2 className="mt-2 font-display text-balance text-3xl font-medium leading-tight tracking-tight text-kva-ink sm:text-4xl">
              Complete care for every season.
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex flex-none items-center gap-2 rounded-full text-sm font-bold text-kva-forest transition-colors hover:text-kva-forest-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
          >
            View all 17 services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => {
            const Icon = getServiceIcon(service.icon);
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
                  <span className="absolute -bottom-5 left-5 inline-flex h-11 w-11 items-center justify-center rounded-full border-4 border-kva-cream bg-kva-forest text-kva-cream shadow-md">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-5 pb-5 pt-8">
                  <h3 className="font-display text-xl font-medium leading-snug tracking-tight text-kva-ink group-hover:text-kva-forest">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-kva-stone">{service.blurb}</p>
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
