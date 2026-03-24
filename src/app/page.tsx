import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";

// Carga diferida (lazy loading) para secciones below-the-fold
// Solo HeroSection se carga de inmediato (above-the-fold / LCP)
const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
  {
    loading: () => <section className="py-20 bg-white" aria-hidden="true" />,
  },
);
const ValuePropositionSection = dynamic(
  () => import("@/components/sections/ValuePropositionSection"),
  {
    loading: () => <section className="py-20 bg-black" aria-hidden="true" />,
  },
);
const PortfolioSection = dynamic(
  () => import("@/components/sections/PortfolioSection"),
  {
    loading: () => <section className="py-20 bg-white" aria-hidden="true" />,
  },
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection"),
  {
    loading: () => <section className="py-20 bg-black" aria-hidden="true" />,
  },
);
const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessSection"),
  {
    loading: () => <section className="py-20 bg-white" aria-hidden="true" />,
  },
);
const BlogSection = dynamic(() => import("@/components/sections/BlogSection"), {
  loading: () => <section className="py-20 bg-black" aria-hidden="true" />,
});
const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
  loading: () => <section className="py-20 bg-black" aria-hidden="true" />,
});

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Above the fold - carga inmediata (LCP) */}
      <HeroSection />

      {/* Below the fold - carga diferida (lazy) */}
      <ServicesSection />

      <ValuePropositionSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ProcessSection />
      <BlogSection />
      <CTASection />
    </main>
  );
}
