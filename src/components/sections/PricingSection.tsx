"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const defaultPricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Ideal para emprendedores",
    price: "S/1,500",
    frequency: "/mes",
    features: [
      "2 redes sociales",
      "8 publicaciones/mes",
      "Reporte mensual",
      "1 campaña publicitaria",
      "SEO básico",
    ],
    buttonText: "Solicitar este plan",
    isPopular: false,
    buttonVariant: "outline" as const,
  },
  {
    name: "Business",
    description: "Para pymes en crecimiento",
    price: "S/3,500",
    frequency: "/mes",
    features: [
      "4 redes sociales",
      "16 publicaciones/mes",
      "Reporte quincenal",
      "3 campañas publicitarias",
      "SEO intermedio",
      "Email marketing",
    ],
    buttonText: "Solicitar este plan",
    isPopular: true,
    buttonVariant: "default" as const,
  },
  {
    name: "Enterprise",
    description: "Estrategia completa",
    price: "S/7,500",
    frequency: "/mes",
    features: [
      "Todas las redes",
      "Publicaciones diarias",
      "Reporte semanal",
      "Campañas ilimitadas",
      "SEO avanzado",
      "Consultoría dedicada",
    ],
    buttonText: "Solicitar este plan",
    isPopular: false,
    buttonVariant: "outline" as const,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  frequency: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
  buttonVariant: "default" | "outline";
}

interface PricingSectionProps {
  plans?: PricingPlan[];
}

export default function PricingSection({
  plans = defaultPricingPlans,
}: PricingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
      className="py-12 sm:py-16 md:py-24 bg-gray-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-[-10%] w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: "rgba(255, 102, 0, 0.05)" }}
        />
        <motion.div
          className="absolute bottom-20 left-[-10%] w-64 h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: "rgba(0, 191, 255, 0.05)" }}
        />
      </div>

      <div
        className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
        ref={ref}
      >
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Planes y <span className="text-gradient">precios</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Elige el plan que mejor se adapte a las necesidades de tu negocio.
            Soluciones escalables para cada etapa de crecimiento.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-6xl mx-auto items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex flex-col p-6 sm:p-8 bg-white rounded-3xl mx-auto w-full max-w-[300px] md:max-w-none ${
                plan.isPopular
                  ? "md:-mt-8 shadow-[0_20px_40px_-15px_rgba(255,102,0,0.15)] ring-2 ring-[#FF6600]"
                  : "border border-gray-100 shadow-xl shadow-black/5"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                  <span className="bg-gradient-to-r from-[#FF6600] to-[#00BFFF] text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-1.5 px-6 rounded-full shadow-lg">
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-6 sm:mb-8 pt-2">
                <h3
                  className="text-xl sm:text-2xl font-bold text-black mb-2"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-sm text-gray-500 mb-6"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {plan.description}
                </p>

                <div className="flex flex-col">
                  {(() => {
                    const priceMatch = plan.price.match(
                      /^([^\d]*)(\d[,\d]*\.?\d*)(.*)$/,
                    );
                    if (priceMatch) {
                      const prefix = priceMatch[1] || "";
                      const numStr = priceMatch[2].replace(/,/g, "");
                      const suffix = priceMatch[3] || "";
                      const currentVal = parseFloat(numStr);

                      let factor = 1;
                      let discountBadge = "";

                      if (index === 0) {
                        factor = 1 / 0.5;
                        discountBadge = "-50%";
                      } else if (index === 1) {
                        factor = 1 / 0.6;
                        discountBadge = "-40%";
                      } else if (index === 2) {
                        factor = 1 / 0.7;
                        discountBadge = "-30%";
                      }

                      if (factor !== 1 && !isNaN(currentVal)) {
                        // Redondeado a la decena más cercana para que no quede con decimales raros (ej. 5833 -> 5830)
                        const originalVal =
                          Math.round((currentVal * factor) / 10) * 10;
                        return (
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-sm sm:text-base text-gray-400 line-through decoration-gray-400/70 font-medium"
                              style={{ fontFamily: "var(--font-inter)" }}
                            >
                              {prefix}
                              {originalVal.toLocaleString("en-US")}
                              {suffix}
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              {discountBadge}
                            </span>
                          </div>
                        );
                      }
                    }
                    return null;
                  })()}
                  <div className="flex items-baseline text-black">
                    <span
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm sm:text-base text-gray-500 ml-1 font-medium">
                      {plan.frequency}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 mr-3 mt-0.5"
                        style={{ color: "#22c55e" }}
                      />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-auto">
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full py-6 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-gradient-to-r from-[#FF6600] to-[#00BFFF] text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FF6600]/25 border-0"
                      : "border-2 border-slate-200 text-black hover:border-black hover:bg-black hover:text-white"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
