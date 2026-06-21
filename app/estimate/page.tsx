import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { EstimateForm } from "@/components/sections/EstimateForm";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: { absolute: "Get a Free Estimate | KVA Landscaping" },
  description:
    "Tell KVA Landscaping about your project and get a free, no-pressure on-site estimate. Serving Sterling, Herndon, Leesburg, Ashburn, Reston, and Great Falls, VA.",
  alternates: { canonical: "/estimate" },
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
