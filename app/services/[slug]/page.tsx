import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { content } from "@/lib/content";
import {
  breadcrumbSchema,
  cityNames,
  findService,
  offerCatalogSchema,
  serviceAreaSchema,
  serviceCopy,
  serviceReviews,
  siteUrl,
} from "@/lib/landing-pages";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyBar } from "@/components/sections/MobileStickyBar";
import {
  CtaStrip,
  DetailHero,
  DetailList,
  LocationsGrid,
  PortfolioBand,
  ReviewCards,
  SectionHeader,
  ServicesGrid,
  TrustStrip,
} from "@/components/landing/PageSections";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return content.services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};

  const shortTitle = service.title.replace(" & Maintenance", "").replace(" Systems", "");
  const title = `${shortTitle} in Sterling & Loudoun, VA | KVA Landscaping`;
  const description = `${service.title} by KVA Landscaping, a family-run Sterling crew serving ${cityNames().join(", ")} with 9 years local, Top Pro 2025 proof, and 165+ reviews.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/services/${service.slug}`,
      images: [{ url: service.image, width: 1200, height: 630, alt: `${service.title} by KVA Landscaping in Sterling, VA` }],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const copy = serviceCopy[service.slug] ?? fallbackServiceCopy(service);
  const reviews = serviceReviews(service);
  const siblingServices = content.services.filter((item) => item.slug !== service.slug);
  const allCities = cityNames();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}#service`,
    name: `${service.title} in Sterling and Loudoun, VA`,
    serviceType: service.title,
    category: "Landscaping",
    description: service.blurb,
    provider: { "@id": `${siteUrl}#business` },
    areaServed: serviceAreaSchema(),
    hasOfferCatalog: offerCatalogSchema(),
    url: `${siteUrl}/services/${service.slug}`,
  };

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ]);

  return (
    <>
      <Nav />
      <DetailHero
        eyebrow="KVA service detail"
        title={copy.h1}
        description={`${service.blurb} Serving ${allCities.join(", ")} from a Sterling home base.`}
        chips={["Family-run", "9 years local", "Top Pro 2025", "165+ reviews"]}
      />
      <TrustStrip />

      <section className="bg-paper py-12 sm:py-16">
        <div className="kva-container">
          <article className="prose prose-stone max-w-none">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <SectionHeader eyebrow="Service overview" title={service.title} />
                <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-kva-stone">
                  {copy.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <aside className="lg:col-span-5">
                <div className="rounded-2xl border border-kva-stone-light bg-kva-cream p-6">
                  <h2 className="font-display text-3xl font-medium tracking-tight text-kva-ink">Fast local walk-throughs</h2>
                  <p className="mt-3 text-sm leading-relaxed text-kva-stone">
                    KVA is based in Sterling and keeps the route tight enough to respond quickly. Use the estimate form on the home page or call the crew directly.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href="/estimate"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-kva-forest px-5 py-3 text-sm font-medium text-kva-cream transition-colors hover:bg-kva-forest-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
                    >
                      Get a free walk-through <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center rounded-full border border-kva-stone-light px-5 py-3 text-sm font-medium text-kva-forest transition-colors hover:border-kva-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
                    >
                      View all services
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-kva-cream py-12 sm:py-16">
        <div className="kva-container">
          <SectionHeader eyebrow="What's included" title={`What is included with ${service.title.toLowerCase()}`} />
          <div className="mt-10">
            <DetailList service={service} descriptions={copy.detailSentences} />
          </div>
        </div>
      </section>

      <section className="bg-paper py-12 sm:py-16">
        <div className="kva-container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeader eyebrow="Process" title={copy.approachTitle} />
              <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-kva-stone">
                {copy.approach.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <SectionHeader eyebrow="Local fit" title={copy.localTitle} />
              <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-kva-stone">
                {copy.localProof.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewCards reviews={reviews} title={`Recent ${service.title.toLowerCase()} reviews`} />

      <section className="bg-paper py-12 sm:py-16">
        <div className="kva-container">
          <SectionHeader
            eyebrow="Keep exploring"
            title="Related KVA services and nearby city pages."
            description="Use these links to compare services, check the city-specific notes, or go straight back to the home estimate form."
          />
          <div className="mt-10">
            <ServicesGrid services={siblingServices} />
          </div>
          <div className="mt-12">
            <h3 className="font-display text-3xl font-medium tracking-tight text-kva-ink">Cities served</h3>
            <div className="mt-6">
              <LocationsGrid />
            </div>
          </div>
        </div>
      </section>

      <PortfolioBand />
      <CtaStrip title="Get a free walk-through" body={`Have KVA look at your ${service.title.toLowerCase()} project in person and give you a real scope for the work.`} />
      <Footer />
      <MobileStickyBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </>
  );
}

function fallbackServiceCopy(service: (typeof content.services)[number]) {
  return {
    h1: `${service.title} in Sterling and Loudoun, VA`,
    intro: [
      `${service.title} is part of KVA's local landscaping route around Sterling, Herndon, Leesburg, Ashburn, Reston, and Great Falls. The crew scopes the work on site so the price reflects the real property, not a generic package.`,
      "KVA is family-run, nine years local, a Top Pro 2025 company, and backed by 165+ reviews from homeowners who value clean work and clear communication.",
    ] as [string, string],
    approachTitle: `How we approach a ${service.title.toLowerCase()} job`,
    approach: [
      "The job starts with a walk-through of the yard, access, soil, grade, drainage, and the surrounding beds or hardscape.",
      "From there, KVA lays out the scope clearly, schedules the work, completes the job, and walks it with the homeowner before leaving.",
    ],
    localTitle: "Why nearby homeowners call KVA",
    localProof: [
      "The crew works close to Sterling, which keeps estimates practical and makes repeat maintenance easier to schedule.",
      "Local yards deal with clay soil, HOA requirements, freeze-thaw cycles, mature trees, and changing seasonal conditions.",
    ],
    detailSentences: Object.fromEntries(
      service.details.map((detail) => [detail, `${detail} is scoped during the on-site walk-through and matched to the property's actual conditions.`]),
    ),
  };
}
