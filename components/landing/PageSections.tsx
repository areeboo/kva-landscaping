import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone, Quote, Star } from "lucide-react";
import { content, type Review, type Service, type PortfolioItem } from "@/lib/content";
import { citySlug, type City } from "@/lib/landing-pages";

export function DetailHero({
  eyebrow,
  title,
  description,
  chips,
}: {
  eyebrow: string;
  title: string;
  description: string;
  chips: string[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-kva-ink pt-28 text-kva-cream sm:pt-32">
      <Image
        src="/images/portfolio/fresh-mow.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-kva-ink via-kva-ink/88 to-kva-forest/60" />
      <div className="kva-container py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-wider text-kva-gold">{eyebrow}</p>
          <h1 className="mt-4 font-display text-balance text-5xl font-medium leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-kva-cream/86 sm:text-xl">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-kva-cream/20 bg-kva-cream/10 px-3 py-1 text-xs font-medium text-kva-cream/90 backdrop-blur"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section className="border-b border-kva-stone-light bg-kva-cream-warm">
      <div className="kva-container flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 text-sm font-medium text-kva-stone">
        {content.hero.trust_strip.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <span>Usually replies in about an hour</span>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-wider text-kva-forest">{eyebrow}</p>
      )}
      <h2 className="mt-3 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-ink sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-kva-stone">{description}</p>
      )}
    </div>
  );
}

export function DetailList({
  service,
  descriptions,
}: {
  service: Service;
  descriptions: Record<string, string>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {service.details.map((detail) => (
        <article key={detail} className="rounded-2xl border border-kva-stone-light bg-kva-cream p-5">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-kva-forest" aria-hidden />
            <div>
              <h3 className="font-display text-xl font-medium tracking-tight text-kva-ink">{detail}</h3>
              <p className="mt-2 text-sm leading-relaxed text-kva-stone">
                {descriptions[detail] ?? `${detail} is scoped during the walk-through so the crew can price the real property conditions, not a generic package.`}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ReviewCards({
  reviews,
  title,
}: {
  reviews: Review[];
  title: string;
}) {
  return (
    <section className="bg-kva-cream py-20 sm:py-24">
      <div className="kva-container">
        <SectionHeader eyebrow="Local proof" title={title} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={`${review.source}-${review.author}-${review.date}`}
              className="flex flex-col rounded-2xl border border-kva-stone-light bg-kva-cream-warm/50 p-6"
            >
              <Quote className="h-5 w-5 text-kva-gold" aria-hidden />
              <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-kva-ink/85">
                {review.text}
              </blockquote>
              <figcaption className="mt-5 border-t border-kva-stone-light pt-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium text-kva-ink">{review.author}</div>
                    <div className="text-xs text-kva-stone">{review.source} · {review.date}</div>
                  </div>
                  <span role="img" className="flex items-center gap-0.5" aria-label={`${review.rating} star review`}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-3.5 w-3.5 ${index < review.rating ? "fill-kva-gold text-kva-gold" : "text-kva-stone-light"}`}
                        aria-hidden
                      />
                    ))}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid({ services = content.services }: { services?: Service[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group rounded-2xl border border-kva-stone-light bg-kva-cream p-5 transition-shadow hover:shadow-md hover:shadow-kva-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
        >
          <h3 className="font-display text-2xl font-medium tracking-tight text-kva-ink group-hover:text-kva-forest">
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-kva-stone">{service.blurb}</p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-kva-forest">
            Read service details <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function LocationsGrid({ cities = content.business.service_area_zips }: { cities?: City[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city) => (
        <Link
          key={city.city}
          href={`/locations/${citySlug(city.city)}`}
          className="group rounded-2xl border border-kva-stone-light bg-kva-cream p-5 transition-shadow hover:shadow-md hover:shadow-kva-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-medium tracking-tight text-kva-ink group-hover:text-kva-forest">
              {city.city}, VA
            </h3>
            <MapPin className="mt-1 h-5 w-5 flex-none text-kva-forest" aria-hidden />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {city.zips.map((zip) => (
              <span key={zip} className="rounded-md bg-kva-forest/8 px-2 py-0.5 font-mono text-xs text-kva-forest">
                {zip}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-kva-stone">{city.note}</p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-kva-forest">
            See location page <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function CtaStrip({
  title = "Get a free walk-through",
  body = "Tell KVA what you need, then a senior crew lead will call or text back to schedule a property walk-through.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-kva-forest py-16 text-kva-cream">
      <div className="kva-container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{title}</h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-kva-cream/82">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#estimate"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-kva-gold px-6 py-3 text-base font-medium text-kva-ink transition-colors hover:bg-kva-gold-deep hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kva-forest"
            >
              Get a free walk-through <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={`tel:${content.hero.secondary_cta.tel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-kva-cream/35 px-6 py-3 text-base font-medium text-kva-cream transition-colors hover:bg-kva-cream hover:text-kva-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-forest"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {content.business.phone_primary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PortfolioBand({
  items = content.portfolio,
}: {
  items?: PortfolioItem[];
}) {
  return (
    <section className="bg-kva-cream-warm py-16">
      <div className="kva-container">
        <div className="grid gap-4 md:grid-cols-4">
          {items.slice(0, 4).map((item) => (
            <figure key={item.src} className="overflow-hidden rounded-2xl border border-kva-stone-light bg-kva-cream">
              <div className="relative aspect-[4/3]">
                <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="px-4 py-3 text-sm text-kva-stone">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
