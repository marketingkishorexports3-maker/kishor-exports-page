import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/traceability/Navbar";
import HeroSection from "@/components/traceability/HeroSection";
import VerticalTimeline from "@/components/traceability/VerticalTimeline";
import IndiaMap from "@/components/traceability/IndiaMap";
import { SUPPLIERS } from "@/data/traceability";


export const Route = createFileRoute("/")({
  ssr: false,
  component: Home,
  head: () => ({
    meta: [
      { title: "Kishor Exports — Traceability" },
      { name: "description", content: "From fibre to finished garment — every step of the Kishor Exports supply chain, documented." },
      { property: "og:title", content: "Kishor Exports — Traceability" },
      { property: "og:description", content: "Explore the complete supply chain behind Kishor Exports' premium menswear line." },
    ],
  }),
});

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#f5f7fb]">
          <div className="order-2 lg:order-1">
            <IndiaMap />
          </div>
          <div className="order-1 lg:order-2">
            <VerticalTimeline suppliers={SUPPLIERS} />
          </div>
        </div>

      </div>
    </div>
  );
}
