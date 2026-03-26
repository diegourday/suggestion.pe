"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const brands = [
  { name: "Ceinys", logoUrl: "/clientes-logos/ceinys.PNG" },
  { name: "Corp Logistics", logoUrl: "/clientes-logos/corplogistics.png" },
  { name: "Mazda", logoUrl: "/clientes-logos/mazda.png" },
  { name: "Renault", logoUrl: "/clientes-logos/renault.png" },
  { name: "Subaru", logoUrl: "/clientes-logos/subaru.png" },
  { name: "CGH", logoUrl: "/clientes-logos/cgh.png" },
  { name: "GMW", logoUrl: "/clientes-logos/gmw.png" },
  { name: "PBII", logoUrl: "/clientes-logos/pbii.png" },
  { name: "Repsol", logoUrl: "/clientes-logos/repsol.png" },
];

export default function BrandsSection() {
  const [isHovered, setIsHovered] = useState(false);
  const baseVelocity = -0.025; // Velocidad de movimiento extra suave (negativo = izquierda)
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Usamos MotionValues para controlar la posición y el estado del loop
  const baseX = useMotionValue(0);
  // Transformamos el valor contínuo para que haga un loop perfecto (ej: 0% a -33.33%)
  // wrap de framer-motion toma (min, max, value)
  const x = useTransform(baseX, (v) => `${wrap(0, -33.333333, v)}%`);

  useAnimationFrame((t, delta) => {
    if (!isHovered) {
      // Delta permite que la velocidad sea independiente de los FPS
      let moveBy = baseVelocity * (delta / 20);
      baseX.set(baseX.get() + moveBy);
    }
  });

  // Duplicamos el array 3 veces para asegurar que el scroll pueda ser infinito sin espacios vacíos.
  // 3 partes iguales = el loop en -33.33% siempre empata perfectamente.
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-24 sm:pb-32 md:pb-40 bg-white relative overflow-hidden">
      {/* Background decoration igual que ServicesSection para mantener misma estética */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div
        className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10"
        ref={ref}
      >
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 sm:mb-4"
            style={{ color: "#FF6600", fontFamily: "var(--font-inter)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Nuestros Clientes
          </motion.span>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Marcas que <span className="text-gradient">confían</span> en
            nosotros
          </motion.h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex max-w-[100vw] overflow-hidden group py-4">
          {/* Máscaras de gradiente para el fade a los lados */}
          <div className="absolute left-0 top-0 bottom-0 z-10 w-32 md:w-64 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-32 md:w-64 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <div
            className="flex whitespace-nowrap"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="flex items-center gap-16 md:gap-32 w-max pr-16 md:pr-32"
              style={{ x }}
            >
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex items-center justify-center min-w-[150px] md:min-w-[200px]"
                >
                  <div className="relative h-12 md:h-16 w-32 md:w-40">
                    <Image
                      src={brand.logoUrl}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 128px, 160px"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
