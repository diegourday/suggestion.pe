"use client";

import PricingSection, {
  PricingPlan,
} from "@/components/sections/PricingSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  motion,
  useScroll,
  useTransform,
  Variants,
  useMotionValueEvent,
  useInView,
  animate,
} from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  CheckCircle,
  Clock,
  Code,
  Eye,
  Globe,
  Heart,
  Lightbulb,
  Megaphone,
  MessageSquare,
  MousePointer,
  Package,
  Palette,
  PanelTop,
  PenTool,
  Printer,
  Search,
  Settings,
  Share2,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Truck,
  Users,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useRef, useState, useEffect } from "react";

// Icon mapping for serialization
const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Target,
  BarChart3,
  Users,
  Zap,
  Lightbulb,
  Search,
  Share2,
  Code,
  Palette,
  Video,
  ShoppingBag,
  Printer,
  PanelTop,
  Truck,
  Sparkles,
  Package,
  Settings,
  MessageSquare,
  Megaphone,
  Eye,
  MousePointer,
  PenTool,
  Smartphone,
  Globe,
  Award,
  Clock,
  Heart,
  Star,
  Briefcase,
};

interface ServicePageProps {
  children?: ReactNode;
  showIcaBadge?: boolean;
  heroData: {
    badge: string;
    title: string;
    highlightedWord: string;
    subtitle: string;
    description: string;
    cta: string;
    iconName: string;
    color: string;
  };
  benefits: Array<{
    title: string;
    description: string;
    iconName: string;
  }>;
  features: Array<{
    title: string;
    description: string;
  }>;
  process: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  pricingParams?: PricingPlan[];
  relatedServices: Array<{
    title: string;
    href: string;
    iconName: string;
  }>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function AnimatedStat({ value }: { value: string }) {
  const match = value.match(/^([^\d]*)(\d[,\d]*\.?\d*)(.*)$/);
  
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (match && inView && nodeRef.current) {
      const target = parseFloat(match[2].replace(/,/g, ""));
      const isFloat = match[2].includes(".");
      const hasComma = match[2].includes(",");

      const controls = animate(0, target, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1], // Custom easing: starts fast, ends very slow
        onUpdate(val) {
          if (nodeRef.current) {
            let displayVal = isFloat ? val.toFixed(1) : Math.round(val).toString();
            if (hasComma && !isFloat) {
              displayVal = Math.round(val).toLocaleString('en-US');
            }
            nodeRef.current.textContent = displayVal;
          }
        },
      });
      return () => controls.stop();
    }
  }, [match, inView]);

  if (!match) return <>{value}</>;

  return (
    <span>
      {match[1]}
      <span ref={nodeRef}>0</span>
      {match[3]}
    </span>
  );
}

function ProcessCard({
  step,
  index,
  heroData,
}: {
  step: any;
  index: number;
  heroData: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "0.5 0.5"],
  });

  const [isFinished, setIsFinished] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 1 && !isFinished) setIsFinished(true);
    else if (latest < 1 && isFinished) setIsFinished(false);
  });

  const isEven = index % 2 === 0;

  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const cardX = useTransform(scrollYProgress, [0, 1], [isEven ? -50 : 50, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const dotScale = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center justify-between mb-12 md:mb-20 ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      } flex-row-reverse`}
    >
      <motion.div
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="absolute left-[36px] md:left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center"
      >
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md relative"
          style={{ backgroundColor: heroData.color }}
          animate={
            isFinished
              ? {
                  boxShadow: [
                    "0px 0px 0px 0px rgba(0,0,0,0)",
                    `0px 0px 0px 10px ${heroData.color}40`,
                    "0px 0px 0px 20px rgba(0,0,0,0)",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, repeat: 0 }}
        >
          <div className="w-2.5 h-2.5 bg-white rounded-full relative z-10" />

          {isFinished && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: heroData.color }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: 0, ease: "easeOut" }}
            />
          )}
        </motion.div>
      </motion.div>

      <div className="hidden md:block w-[45%]" />

      <motion.div
        style={{ opacity: cardOpacity, y: cardY, x: cardX, scale: cardScale }}
        className="w-full md:w-[45%] pl-[80px] md:pl-0"
      >
        <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 relative border-0 border-t-4 border-transparent hover:border-[#FF6600] group overflow-hidden">
          <CardContent className="p-5 sm:p-6 md:p-8">
            <div
              className="text-6xl sm:text-7xl font-bold opacity-5 absolute -bottom-2 -right-2 transition-transform duration-500 group-hover:scale-110"
              style={{
                color: heroData.color,
                fontFamily: "var(--font-montserrat)",
              }}
            >
              {step.step}
            </div>

            <div className="relative z-10">
              <div
                className="inline-block text-sm sm:text-base font-bold mb-3 px-3 py-1 rounded-full bg-slate-100"
                style={{
                  color: heroData.color,
                  fontFamily: "var(--font-montserrat)",
                }}
              >
                Paso {step.step}
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold text-black mb-3"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm sm:text-base text-gray-600 leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {step.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function ServicePageTemplate({
  children,
  showIcaBadge,
  heroData,
  benefits,
  features,
  process,
  stats,
  testimonials,
  faqs,
  pricingParams,
  relatedServices,
}: ServicePageProps) {
  const IconComponent = iconMap[heroData.iconName] || TrendingUp;
  const processRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start center", "end center"],
  });

  const fallbackVisualCards = [
    ...features.map((feature) => ({
      title: feature.title,
      description: feature.description,
    })),
    ...benefits.map((benefit) => ({
      title: benefit.title,
      description: benefit.description,
    })),
  ].slice(0, 4);

  const defaultFallbackVisualCards = [
    { title: "Estrategia", description: "Planeación orientada a resultados" },
    { title: "Ejecución", description: "Implementación con enfoque comercial" },
    { title: "Optimización", description: "Mejora continua basada en datos" },
    { title: "Soporte", description: "Acompañamiento experto en cada fase" },
  ];

  const heroVisualCards =
    fallbackVisualCards.length > 0
      ? fallbackVisualCards
      : defaultFallbackVisualCards;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 md:pt-30 md:pb-20 overflow-hidden bg-linear-to-r from-white via-slate-50 to-cyan-50/40 min-h-[50vh] lg:min-h-[65vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${heroData.color}08` }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl"
            style={{ backgroundColor: "#00BFFF08" }}
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <motion.div
                variants={itemVariants}
                className="mb-4 sm:mb-5 flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${heroData.color}15` }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <IconComponent
                    className="w-8 h-8 sm:w-10 sm:h-10"
                    style={{ color: heroData.color }}
                  />
                </motion.div>

                <span
                  className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase"
                  style={{
                    color: heroData.color,
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  {heroData.badge}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-5 sm:mb-6 leading-tight text-center lg:text-left text-pretty"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {heroData.title}{" "}
                <span className="text-gradient">
                  {heroData.highlightedWord}
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-5 sm:mb-6 text-center lg:text-left text-pretty mx-auto lg:mx-0"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {heroData.description}
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl mb-5 sm:mb-6"
              >
                {stats.slice(0, 4).map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div
                      className="text-3xl sm:text-4xl font-bold leading-none mb-1"
                      style={{
                        color: heroData.color,
                        fontFamily: "var(--font-montserrat)",
                      }}
                    >
                      <AnimatedStat value={stat.value} />
                    </div>
                    <div
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Button
                  size="lg"
                  className="text-white font-semibold px-6 sm:px-8 py-4 sm:py-5 rounded-full shadow-lg w-full sm:w-auto min-h-13 text-sm sm:text-base"
                  style={{ backgroundColor: heroData.color }}
                  asChild
                >
                  <Link href="#contacto">
                    {heroData.cta}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-black text-black hover:bg-black hover:text-white font-semibold px-6 sm:px-8 py-4 sm:py-5 rounded-full w-full sm:w-auto min-h-13 text-sm sm:text-base"
                  asChild
                >
                  <Link href="#proceso">Ver proceso</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="w-full">
              {children || (
                <div className="relative mx-auto w-full max-w-xl rounded-3xl border border-black/10 bg-slate-100 p-5 sm:p-6 mt-6 sm:mt-0">
                  {showIcaBadge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 sm:top-0 sm:right-0 sm:translate-x-1/2 sm:-translate-y-1/2 sm:left-auto rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 z-10 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current" />
                        #1 en Ica
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {heroVisualCards.map((card, index) => (
                      <div
                        key={card.title}
                        className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5 min-h-36 sm:min-h-40 flex flex-col items-center justify-center text-center"
                      >
                        <div
                          className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${heroData.color}24` }}
                        >
                          <IconComponent
                            className="h-5 w-5"
                            style={{
                              color: heroData.color,
                              opacity: 0.95 - index * 0.12,
                            }}
                          />
                        </div>
                        <p
                          className="text-black font-semibold text-base mb-1"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {card.title}
                        </p>
                        <p
                          className="text-gray-600 text-sm leading-relaxed"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {card.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="py-12 sm:py-16 md:py-20 lg:py-28 bg-black border-t-4"
        style={{ borderColor: heroData.color }}
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              ¿Por qué <span className="text-gradient">elegir</span> nuestro
              servicio?
            </h2>
            <p
              className="text-base sm:text-lg text-slate-300"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Combinamos estrategia, creatividad y datos para entregarte
              resultados reales y medibles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {benefits.map((benefit, index) => {
              const BenefitIcon = iconMap[benefit.iconName] || Star;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-4 sm:p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <motion.div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0"
                          style={{ backgroundColor: `${heroData.color}15` }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <BenefitIcon
                            className="w-6 h-6 sm:w-7 sm:h-7"
                            style={{ color: heroData.color }}
                          />
                        </motion.div>
                        <div className="text-center sm:text-left">
                          <h3
                            className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3"
                            style={{ fontFamily: "var(--font-montserrat)" }}
                          >
                            {benefit.title}
                          </h3>
                          <p
                            className="text-sm sm:text-base text-gray-600"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Qué <span className="text-gradient">incluye</span> nuestro
              servicio
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="bg-gray-50 border-none hover:bg-white hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-4 sm:p-6">
                    <motion.div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-3 sm:mb-4"
                      style={{ backgroundColor: heroData.color }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </motion.div>
                    <h3
                      className="text-base sm:text-lg font-bold text-black mb-2"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        id="proceso"
        className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gray-50"
      >
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Nuestro <span className="text-gradient">proceso</span>
            </h2>
            <p
              className="text-base sm:text-lg text-gray-600"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Una metodología probada que garantiza resultados.
            </p>
          </motion.div>

          <div ref={processRef} className="relative max-w-4xl mx-auto py-10">
            {/* Timeline Line Wrapper */}
            <div className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-[#FF6600] to-[#00BFFF] origin-top"
                style={{ scaleY: scrollYProgress, height: "100%" }}
              />
            </div>

            {process.map((step, index) => (
              <ProcessCard
                key={index}
                step={step}
                index={index}
                heroData={heroData}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Lo que dicen nuestros{" "}
              <span className="text-gradient">clientes</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-50 border-none h-full">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <p
                      className="text-sm sm:text-base text-gray-700 italic mb-4 sm:mb-6"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <div
                        className="font-bold text-black text-sm sm:text-base"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {testimonial.author}
                      </div>
                      <div
                        className="text-xs sm:text-sm text-gray-600"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {(!pricingParams || pricingParams.length > 0) && (
        <PricingSection plans={pricingParams} />
      )}

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Preguntas <span className="text-gradient">frecuentes</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="multiple" className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="bg-white border rounded-xl px-4 sm:px-6 shadow-sm data-[state=open]:border-[#FF6600]/30 transition-colors"
                  >
                    <AccordionTrigger className="text-base sm:text-lg font-bold text-black hover:no-underline [&[data-state=open]]:text-[#FF6600]">
                      <span className="text-left" style={{ fontFamily: "var(--font-montserrat)" }}>
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p
                        className="text-sm sm:text-base text-gray-600 pt-2 pb-4"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contacto"
        className="py-12 sm:py-16 md:py-20 lg:py-28 bg-black relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${heroData.color}15` }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              ¿Listo para <span className="text-gradient">empezar</span>?
            </h2>
            <p
              className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 px-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Agenda una consultoría gratuita y descubre cómo podemos ayudarte a
              alcanzar tus objetivos.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="text-white font-semibold px-6 sm:px-10 py-5 sm:py-6 rounded-full text-base sm:text-lg shadow-xl min-h-[52px]"
                style={{ backgroundColor: heroData.color }}
                asChild
              >
                <Link href="/#contacto">
                  Solicitar Consultoría Gratuita
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Servicios <span className="text-gradient">relacionados</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {relatedServices.map((service, index) => {
              const ServiceIcon = iconMap[service.iconName] || Star;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={service.href}>
                    <Card className="bg-gray-50 border-none hover:shadow-lg transition-all duration-300 h-full group min-h-[120px] sm:min-h-[140px]">
                      <CardContent className="p-4 sm:p-6 text-center">
                        <motion.div
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4"
                          style={{ backgroundColor: `${heroData.color}15` }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <ServiceIcon
                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                            style={{ color: heroData.color }}
                          />
                        </motion.div>
                        <h3
                          className="text-xs sm:text-sm md:text-base font-bold text-black group-hover:text-gray-700 transition-colors"
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {service.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
