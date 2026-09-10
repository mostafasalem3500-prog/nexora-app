import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import SolutionsMap from "@/components/SolutionsMap";
import Services from "@/components/Services";
import WorkGrid from "@/components/WorkGrid";
import Journey from "@/components/Journey";
import Sectors from "@/components/Sectors";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustStrip />
      <SolutionsMap />
      <Services />
      <WorkGrid />
      <Journey />
      <Sectors />
      <CtaBand />
      <Footer />
    </main>
  );
}
