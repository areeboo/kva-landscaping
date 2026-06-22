import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { EstimateForm } from "@/components/sections/EstimateForm";
import { Footer } from "@/components/sections/Footer";
import { siteUrl } from "@/lib/landing-pages";

const estimateDescription =
  "Tell KVA Landscaping about your project and get a free, no-pressure on-site estimate. Serving Sterling, Herndon, Leesburg, Ashburn, Reston, and Great Falls, VA.";

export const metadata: Metadata = {
  title: { absolute: "Get a Free Estimate | KVA Landscaping" },
  description: estimateDescription,
  alternates: { canonical: "/estimate" },
  openGraph: {
    title: "Get a Free Estimate | KVA Landscaping",
    description: estimateDescription,
    url: `${siteUrl}/estimate`,
    images: [{ url: "/images/portfolio/brick-home-shrubs.jpg", width: 1200, height: 630 }],
  },
};

export default function EstimatePage() {
  return (
    <>
      <Nav />
      <EstimateForm />
      <Footer />
    </>
  );
}
