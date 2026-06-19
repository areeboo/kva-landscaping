import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { WhyProjects } from "@/components/sections/WhyProjects";
import { ServiceAreaMap } from "@/components/sections/ServiceAreaMap";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCta } from "@/components/sections/FinalCta";
import { EstimateForm } from "@/components/sections/EstimateForm";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyBar } from "@/components/sections/MobileStickyBar";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustBand />
      <ServicesShowcase />
      <WhyProjects />
      <ServiceAreaMap />
      <Testimonials />
      <FAQ />
      <FinalCta />
      <EstimateForm />
      <Footer />
      <MobileStickyBar />
    </>
  );
}
