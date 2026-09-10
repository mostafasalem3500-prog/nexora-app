import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import SolutionsMap from "@/components/SolutionsMap";
import Services from "@/components/Services";
import StatsInfographic from "@/components/StatsInfographic";
import WorkGrid from "@/components/WorkGrid";
import ErpDemo from "@/components/ErpDemo";
import Journey from "@/components/Journey";
import Sectors from "@/components/Sectors";
import Testimonials from "@/components/Testimonials";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main id="main-content">
      <Header />
      <Hero />
      <TrustStrip />
      <SolutionsMap />
      <Services />
      <StatsInfographic />
      <WorkGrid />
      <ErpDemo />
      <Journey />
      <Sectors />
      <Testimonials />
      <CtaBand />
      <Footer />
    </main>
  );
}
