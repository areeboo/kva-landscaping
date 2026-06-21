import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { content } from "@/lib/content";
import { citySlug, siteUrl } from "@/lib/landing-pages";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyBar } from "@/components/sections/MobileStickyBar";
import { CtaStrip, DetailHero, LocationsGrid, SectionHeader, ServicesGrid, TrustStrip } from "@/components/landing/PageSections";

export const metadata: Metadata = {
  title: { absolute: "KVA Landscaping Service Areas in Northern VA | KVA Landscaping" },
  description:
    "KVA Landscaping serves Sterling, Herndon, Leesburg, Ashburn, Reston, and Great Falls with lawn care, patios, mulch, irrigation, and seasonal work.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "KVA Landscaping Service Areas in Northern VA | KVA Landscaping",
    description:
      "Local landscaping pages for Sterling, Herndon, Leesburg, Ashburn, Reston, and Great Falls.",
    url: `${siteUrl}/locations`,
    images: [{ url: "/images/portfolio/fresh-mow.jpg", width: 1200, height: 630 }],
  },
};

export default function LocationsIndexPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "KVA Landscaping Service Areas",
    url: `${siteUrl}/locations`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: content.business.service_area_zips.map((city, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/locations/${citySlug(city.city)}`,
        name: `${city.city}, VA`,
      })),
    },
  };

  return (
    <>
      <Nav />
      <DetailHero
        eyebrow="KVA service areas"
        title="Landscaping Across Sterling, Loudoun, and Nearby Fairfax"
        description="City-by-city pages for lawn care, paver patios, mulch, irrigation, shrub work, snow service, and seasonal cleanup around the KVA Sterling home base."
        chips={["Sterling-based crew", "Family-run", "Top Pro 2025", "165+ reviews"]}
      />
      <TrustStrip />
      <section id="locations" className="bg-paper py-12 sm:py-16">
        <div className="kva-container">
          <SectionHeader
            eyebrow="Cities served"
            title="Find the page for your city."
            description="Each location page pulls from KVA's service-area notes, including ZIP codes, nearby neighborhoods, HOA realities, clay soil, drainage, and older hardscape details."
          />
          <div className="mt-10">
            <LocationsGrid />
          </div>
        </div>
      </section>
      <section className="bg-kva-cream py-12 sm:py-16">
        <div className="kva-container">
          <SectionHeader
            eyebrow="Services"
            title="All six core services are available across the local route."
            description="The exact scope depends on the yard, access, grade, and season, which is why KVA starts with a walk-through instead of a generic package."
          />
          <div className="mt-10">
            <ServicesGrid />
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
