import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyBar } from "@/components/sections/MobileStickyBar";
import { About } from "@/components/sections/About";
import { Reviews } from "@/components/sections/Reviews";
import { CtaStrip, DetailHero, TrustStrip } from "@/components/landing/PageSections";
import { siteUrl } from "@/lib/landing-pages";

export const metadata: Metadata = {
  title: { absolute: "About KVA Landscaping — Family-Run Sterling, VA Crew" },
  description:
    "Family-run landscape crew working Sterling, Herndon, Leesburg, Ashburn, and Reston since 2017. Nine years in NoVA, Top Pro 2025, 165+ reviews.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About KVA Landscaping — Family-Run Sterling, VA Crew",
    description:
      "Nine years of lawn care, paver patios, and seasonal work for Sterling and Loudoun County homeowners.",
    url: `${siteUrl}/about`,
    images: [{ url: "/images/portfolio/brick-home-shrubs.jpg", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <DetailHero
        eyebrow="About KVA"
        title="A family-run Sterling crew that walks every property before it prices a job."
        description="Nine years working Loudoun and western Fairfax counties — clay soil, freeze-thaw, HOA approvals, and the older split-levels off Algonkian Parkway. Same crew on your property each visit."
        chips={["9 years local", "Top Pro 2025", "165+ reviews", "Family-run"]}
      />
      <TrustStrip />
      <About />
      <Reviews />
      <CtaStrip
        title="Meet the crew on a free walk-through."
        body="Tell KVA what you need and a senior crew lead will call or text back — usually within an hour during business hours — to schedule a property visit."
      />
      <Footer />
      <MobileStickyBar />
    </>
  );
}
