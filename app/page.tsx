import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { About } from "@/components/sections/About";
import { EstimateForm } from "@/components/sections/EstimateForm";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Portfolio />
      <ServiceArea />
      <Process />
      <Reviews />
      <About />
      <EstimateForm />
      <Footer />
    </>
  );
}
