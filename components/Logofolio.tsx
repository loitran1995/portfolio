
// components/Logofolio.tsx
"use client";

import { motion, Variants, useInView } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function Logofolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const mainContentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoGridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const logoItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const logos = [
    { id: 1, src: "/images/logo-cs.webp", alt: "CreativeSentence Logo" },
    { id: 2, src: "/images/logo-rhino.webp", alt: "VDM Esport Logo" },
    { id: 3, src: "/images/logo-dug.webp", alt: "DugoutX Logo" },
    { id: 4, src: "/images/logo-cloud.webp", alt: "Learning Cloud Logo" },
    { id: 5, src: "/images/logo-nanuc.webp", alt: "Nanuc Logo" },
    { id: 6, src: "/images/logo-ys.webp", alt: "Yasuo Logo" },
    { id: 7, src: "/images/logo-kratos.webp", alt: "Kratos Logo" },
    { id: 8, src: "/images/logo-lee.webp", alt: "Leesin Logo" },
    { id: 9, src: "/images/logo-envy.webp", alt: "Envy Logo" },
    { id: 10, src: "/images/logo-pixel.webp", alt: "Pixel Logo" },
    { id: 11, src: "/images/logo-r.webp", alt: "Radiation Logo" },
    { id: 12, src: "/images/logo-fitness.webp", alt: "Ezi Logo" },
  ];

  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left w-full pb-[1rem] bg-[var(--gray-dark)]">
      <motion.div
        id="logofolio-section"
        ref={ref}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="flex flex-col items-center md:items-start text-center md:text-left w-full pb-12 "
      >
        <div className="w-full h-[1px] bg-[var(--background)] mb-12" />

        <motion.h1
          variants={mainContentVariants}
          className="text-[32px] font-fragment-mono text-white mb-12 w-full text-center md:text-left px-12 md:px-24"
        >
          Logofolio
        </motion.h1>

        <motion.div
          variants={logoGridVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center px-12 md:px-24"
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.id}
              variants={logoItemVariants}
              className="relative w-full border-1 border-gray-600 max-w-[1000px] pb-[100%] flex items-center justify-center   "
            >
              {/* Vùng đệm cho Image */}
              <div className="absolute inset-0 z-[1] p-6 flex items-center justify-center dark:shadow-[0px_0px_27px_0px_#2D2D2D]  ">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                
                  className=" p-2  md:p-3 "
                />
              </div>
 <GlowingEffect
                blur={0}
          borderWidth={3}
          spread={64}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
              />
             
            </motion.div>
            
          ))}
        </motion.div>
        
      </motion.div>
      
    </div>
  );
}