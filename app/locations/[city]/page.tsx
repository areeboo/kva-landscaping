import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { content } from "@/lib/content";
import {
  cityCopy,
  cityDistanceFromSterling,
  cityNeighborhoods,
  citySlug,
  findCity,
  offerCatalogSchema,
  recentReviews,
  siteUrl,
} from "@/lib/landing-pages";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyBar } from "@/components/sections/MobileStickyBar";
import {
  CtaStrip,
  DetailHero,
  LocationsGrid,
  PortfolioBand,
  ReviewCards,
  SectionHeader,
  ServicesGrid,
  TrustStrip,
} from "@/components/landing/PageSections";

type Props = {
  params: Promise<{ city: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return content.business.service_area_zips.map((city) => ({ city: citySlug(city.city) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: cityParam } = await params;
  const city = findCity(cityParam);
  if (!city) return {};

  const title = `Landscaping in ${city.city}, VA | KVA Landscaping`;
  const description = `KVA Landscaping serves ${city.city}, VA with lawn care, paver patios, mulch, irrigation, tree and shrub care, snow plowing, and seasonal cleanup.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/locations/${citySlug(city.city)}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/locations/${citySlug(city.city)}`,
      images: [{ url: "/images/portfolio/fresh-mow.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function LocationDetailPage({ params }: Props) {
  const { city: cityParam } = await params;
  const city = findCity(cityParam);
  if (!city) notFound();

  const copy = cityCopy[city.city] ?? fallbackCityCopy(city);
  const siblingCities = content.business.service_area_zips.filter((item) => item.city !== city.city);
  const neighborhoods = cityNeighborhoods[city.city] ?? [city.city];
  const reviews = recentReviews(3);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/locations/${citySlug(city.city)}#local-business`,
    name: `${content.business.display_name} - ${city.city}, VA landscaping`,
    url: `${siteUrl}/locations/${citySlug(city.city)}`,
    telephone: content.business.phone_primary,
    email: content.business.email,
    image: `${siteUrl}/images/portfolio/fresh-mow.jpg`,
    priceRange: "$$",
    parentOrganization: { "@id": `${siteUrl}#business` },
    address: {
      "@type": "PostalAddress",
      addressLocality: content.business.city,
      addressRegion: content.business.state,
      postalCode: content.business.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: `${city.city}, VA`,
    },
    hasOfferCatalog: offerCatalogSchema(),
  };

  return (
    <>
      <Nav />
      <DetailHero
        eyebrow="KVA location page"
        title={`Landscaping in ${city.city}, VA — Lawn Care, Patios, Mulch & More`}
        description="Lawn care, paver patios, mulch, irrigation, and more from a family-run Sterling crew with nine years in Northern Virginia."
        chips={[city.zips.join(" / "), cityDistanceFromSterling[city.city] ?? "near Sterling", "Top Pro 2025", "165+ reviews"]}
      />
      <TrustStrip />

      <section className="bg-paper py-12 sm:py-16">
        <div className="kva-container">
          <article className="prose prose-stone max-w-none">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <SectionHeader eyebrow="Local overview" title={`Landscaping in ${city.city}, VA`} />
                <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-kva-stone">
                  {copy.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <aside className="lg:col-span-5">
                <div className="rounded-2xl border border-kva-stone-light bg-kva-cream p-6">
                  <h2 className="font-display text-3xl font-medium tracking-tight text-kva-ink">Local route notes</h2>
                  <p className="mt-3 text-sm leading-relaxed text-kva-stone">{city.note}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {city.zips.map((zip) => (
                      <span key={zip} className="rounded-md bg-kva-forest/8 px-2 py-0.5 font-mono text-xs text-kva-forest">
                        {zip}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/estimate"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-kva-forest px-5 py-3 text-sm font-medium text-kva-cream transition-colors hover:bg-kva-forest-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
                  >
                    Get a free walk-through <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </aside>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-kva-cream py-12 sm:py-16">
        <div className="kva-container">
          <SectionHeader
            eyebrow={`What we do in ${city.city}`}
            title={`Lawn care, patios, mulch, irrigation, and seasonal work in ${city.city}.`}
            description="KVA scopes the service around your yard, access, grade, soil, HOA needs, and the season."
          />
          <div className="mt-10">
            <ServicesGrid />
          </div>
        </div>
      </section>

      <section className="bg-paper py-12 sm:py-16">
        <div className="kva-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader eyebrow="Where we work" title={`Where we work in ${city.city}`} />
              <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-kva-stone">
                {copy.where.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {neighborhoods.map((neighborhood) => (
                  <div key={neighborhood} className="rounded-2xl border border-kva-stone-light bg-kva-cream p-5">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 flex-none text-kva-forest" aria-hidden />
                      <div>
                        <h3 className="font-display text-2xl font-medium tracking-tight text-kva-ink">{neighborhood}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-kva-stone">
                          Part of the {city.city} route for walk-throughs, maintenance, cleanups, and project planning.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-kva-stone-light bg-kva-cream p-5 text-sm leading-relaxed text-kva-stone">
                <strong className="font-medium text-kva-ink">Route distance:</strong>{" "}
                {cityDistanceFromSterling[city.city] ?? "near Sterling"}. For larger patios, retaining edges, drainage, and full-yard work, call even if your property sits just outside the usual route.
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewCards reviews={reviews} title={`What ${city.city}-area homeowners are saying`} />

      <section className="bg-paper py-12 sm:py-16">
        <div className="kva-container">
          <SectionHeader
            eyebrow="Neighboring pages"
            title={`Nearby service-area pages around ${city.city}.`}
            description="Compare city notes, ZIP codes, and the services KVA handles across the Northern Virginia route."
          />
          <div className="mt-10">
            <LocationsGrid cities={siblingCities} />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 rounded-full border border-kva-forest px-5 py-3 text-sm font-medium text-kva-forest transition-colors hover:bg-kva-forest hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
            >
              All locations <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-kva-stone-light px-5 py-3 text-sm font-medium text-kva-forest transition-colors hover:border-kva-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
            >
              All services
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-kva-stone-light px-5 py-3 text-sm font-medium text-kva-forest transition-colors hover:border-kva-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
            >
              Back home
            </Link>
          </div>
        </div>
      </section>

      <PortfolioBand />
      <CtaStrip title="Get a free walk-through" body={`Have KVA walk your ${city.city} property and give you a clear scope for lawn care, patios, mulch, irrigation, or seasonal work.`} />
      <Footer />
      <MobileStickyBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </>
  );
}

function fallbackCityCopy(city: (typeof content.business.service_area_zips)[number]) {
  return {
    intro: [
      `KVA Landscaping serves ${city.city}, VA with lawn care, patios, mulch, planting, irrigation, tree and shrub work, and seasonal cleanup from a Sterling home base.`,
      "The crew starts with an on-site walk-through so the scope reflects the actual yard, including soil, grade, drainage, access, and HOA expectations.",
    ] as [string, string],
    where: [
      city.note,
      `${city.city} ZIP codes served: ${city.zips.join(", ")}.`,
      "Nearby homeowners call KVA for practical work, clear communication, and one crew that can handle the yard across seasons.",
    ],
  };
}
