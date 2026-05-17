import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { content } from "@/lib/content";
import { siteUrl } from "@/lib/landing-pages";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyBar } from "@/components/sections/MobileStickyBar";
import { Process } from "@/components/sections/Process";
import { CtaStrip, DetailHero, LocationsGrid, SectionHeader, ServicesGrid, TrustStrip } from "@/components/landing/PageSections";

export const metadata: Metadata = {
  title: { absolute: "Landscaping Services in Sterling & Loudoun, VA | KVA Landscaping" },
  description:
    "Explore KVA Landscaping services: lawn care, mulch, paver patios, tree and shrub care, irrigation, snow plowing, and seasonal work around Sterling, VA.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Landscaping Services in Sterling & Loudoun, VA | KVA Landscaping",
    description:
      "Family-run Sterling landscape crew for lawn care, patios, mulch, irrigation, shrub care, and seasonal work.",
    url: `${siteUrl}/services`,
    images: [{ url: "/images/portfolio/brick-home-shrubs.jpg", width: 1200, height: 630 }],
  },
};

export default function ServicesIndexPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "KVA Landscaping Services",
    url: `${siteUrl}/services`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: content.services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/services/${service.slug}`,
        name: service.title,
      })),
    },
  };

  return (
    <>
      <Nav />
      <DetailHero
        eyebrow="KVA services"
        title="Landscaping Services in Sterling and Loudoun, VA"
        description="One family-run Sterling crew for lawn care, paver patios, mulch, planting, tree and shrub work, irrigation, snow plowing, and seasonal cleanup."
        chips={["9 years local", "Top Pro 2025", "165+ reviews", "~1 hour response"]}
      />
      <TrustStrip />
      <section id="services" className="bg-paper py-20 sm:py-24">
        <div className="kva-container">
          <SectionHeader
            eyebrow="What we do"
            title="Pick the work you need, then get a real walk-through."
            description="Every service page below is grounded in KVA's actual work around Sterling, Herndon, Leesburg, Ashburn, Reston, and Great Falls."
          />
          <div className="mt-10">
            <ServicesGrid />
          </div>
        </div>
      </section>
      <Process />
      <section className="bg-kva-cream py-20 sm:py-24">
        <div className="kva-container">
          <SectionHeader
            eyebrow="Where we work"
            title="Service-area pages for nearby NoVA cities."
            description="City pages cover ZIP codes, neighborhoods, and the local property details that change how a job should be scoped."
          />
          <div className="mt-10">
            <LocationsGrid />
          </div>
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-kva-forest px-5 py-3 text-sm font-medium text-kva-forest transition-colors hover:bg-kva-forest hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
            >
              Back to the home page <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
      <CtaStrip />
      <Footer />
      <MobileStickyBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
