import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { EstimateForm } from "@/components/sections/EstimateForm";
import { Footer } from "@/components/sections/Footer";
import { MobileStickyBar } from "@/components/sections/MobileStickyBar";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Portfolio />
      <ServiceArea />
      <Reviews />
      <FAQ />
      <EstimateForm />
      <Footer />
      <MobileStickyBar />
    </>
  );
}
