import type { Metadata } from "next";
import { content } from "@/lib/content";
import { siteUrl } from "@/lib/landing-pages";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyBar } from "@/components/sections/MobileStickyBar";
import { CtaStrip, DetailHero, SectionHeader } from "@/components/landing/PageSections";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

const ogImage =
  content.gallery.find((item) => item.category === "Hardscape & Patios")?.src ??
  content.gallery[0]?.src ??
  "/images/portfolio/brick-home-shrubs.jpg";

export const metadata: Metadata = {
  title: {
    absolute:
      "Project Gallery — Paver Patios, Walkways & Landscaping in Sterling, VA | KVA Landscaping",
  },
  description:
    "See real KVA Landscaping projects around Sterling and Loudoun County, VA — paver and flagstone patios, dry-laid walkways, stone fire pits, fresh mulch beds, planting, and lawn care, all by the same family-run crew.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title:
      "Project Gallery — Paver Patios, Walkways & Landscaping in Sterling, VA | KVA Landscaping",
    description:
      "Real hardscape, planting, and lawn-care projects KVA Landscaping has built for Sterling and Loudoun County homeowners.",
    url: `${siteUrl}/gallery`,
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
};

export default function GalleryPage() {
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${siteUrl}/gallery#gallery`,
    name: "KVA Landscaping Project Gallery",
    description:
      "Photos of paver patios, flagstone walkways, fire pits, mulch beds, planting, and lawn care completed by KVA Landscaping around Sterling and Loudoun County, VA.",
    url: `${siteUrl}/gallery`,
    provider: { "@id": `${siteUrl}#business` },
    associatedMedia: content.gallery.map((item) => ({
      "@type": "ImageObject",
      contentUrl: `${siteUrl}${item.src}`,
      caption: item.caption,
      description: item.alt,
      creditText: content.business.display_name,
      creator: { "@id": `${siteUrl}#business` },
    })),
  };

  return (
    <>
      <Nav />
      <DetailHero
        eyebrow="Our work"
        title="Real KVA projects, start to finish."
        description="A look at hardscape, planting, and lawn work the crew has finished for homeowners around Sterling and Loudoun County — the same family-run team you get from the first walk-through to the final cleanup."
        chips={["Paver patios", "Flagstone walkways", "Fire pits", "Mulch & planting"]}
      />

      <section className="bg-paper py-12 sm:py-16">
        <div className="kva-container">
          <SectionHeader
            eyebrow="Project gallery"
            title="Browse the work by the kind of project you have in mind."
            description="Filter by hardscape, planting, or lawn care, then open any photo for a closer look. Every project here was scoped on-site and built by KVA around Sterling, Herndon, Leesburg, Ashburn, Reston, and Great Falls."
          />
          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </section>

      <CtaStrip
        title="Want work like this on your property?"
        body="Tell KVA what you're picturing and a senior crew lead will call or text back — usually within an hour during business hours — to set up a free on-site walk-through."
      />
      <Footer />
      <MobileStickyBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
    </>
  );
}
