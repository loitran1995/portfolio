"use client";

import { motion, Variants, useInView } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";

export default function Experiences() {
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

  const cardGridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const workExperiences = [
    {
      id: 1,
      logoSrc: "/images/exp-mkd.webp",
      altText: "MekongData Logo",
      companyName: "MekongData",
      position: "Graphic Designer",
      duration: "2018 - 2019",
    },
    {
      id: 2,
      logoSrc: "/images/exp-js.webp",
      altText: "Jupiter Solution Logo",
      companyName: "Jupiter Solution",
      position: "UI/UX Designer",
      duration: "2020 - 2022",
    },
    {
      id: 3,
      logoSrc: "/images/exp-makita.webp",
      altText: "Makita Logo",
      companyName: "Makita",
      position: "Graphic Designer",
      duration: "2022 - 2024",
    },
    {
      id: 4,
      logoSrc: "/images/exp-vv.webp",
      altText: "VectorVision Logo",
      companyName: "VectorVision",
      position: "UI/UX",
      duration: "2024 - 2025",
    }, {
      id: 5,
      logoSrc: "/images/exp-AxB.svg",
      altText: "AIxBlock Logo",
      companyName: "AIxBlock",
      position: "UI/UX",
      duration: "2025 - Present",
    },
  ];

  return (
    <motion.div
      id="experiences-section"
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      className="flex flex-col items-center md:items-start text-center md:text-left w-full pb-[4rem] px-6 md:px-24 "
    >
      <div className="w-full h-[1px] bg-[var(--foreground)] mb-12" />

      <motion.h1
        variants={mainContentVariants}
        className="text-[32px] font-fragment-mono text-[var(--gray-medium)] mb-4 w-full"
      >
        Experiences & Education
      </motion.h1>

      {/* Education Block */}
      <motion.div
        variants={mainContentVariants}
        className="flex flex-col sm:flex-row items-center sm:justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 mx-auto p-6 rounded-lg"
      >
        <div className="flex-shrink-0">
          <Image
            src="/images/exp-school-logo.webp"
            alt="University Logo"
            width={182}
            height={182}
            className="rounded-full object-cover"
          />
        </div>
        <div className="text-center sm:text-left flex-grow">
          <h3 className="text-xl md:text-2xl font-fragment-mono text-black mb-1">
            Software Engineer
          </h3>
          <p className="text-base font-normal font-poppins text-[var(--gray-medium)]">
            Can Tho University / 2013-2018
          </p>
        </div>
      </motion.div>

      {/* Work Experience Grid */}
      <motion.div
        variants={cardGridVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full justify-items-center "
      >
        {workExperiences.map((experience) => (
          <motion.div
            key={experience.id}
            variants={cardItemVariants}
            className="relative p-6 flex flex-col justify-center items-center text-left transition-all duration-300 ease-in-out w-full hover:scale-[1.02] hover:-translate-y-2 email-link-underline"
          >
            <div className="flex items-center mb-4 w-full">
              <Image
                src={experience.logoSrc}
                alt={experience.altText}
                width={64}
                height={64}
                className="object-cover mr-4 flex-shrink-0"
              />
              <div className="flex-grow">
                <h3 className="text-xl font-fragment-mono text-black mb-1">
                  {experience.companyName}
                </h3>
                <p className="text-base font-normal font-poppins text-[var(--gray-medium)]">
                  {experience.position}
                </p>
                <p className="text-sm font-normal font-poppins text-[var(--gray-medium)] mt-auto">
                  {experience.duration}
                </p>
              </div>
            </div>

            <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[var(--foreground)] transition-all duration-300 ease-out transform -translate-x-1/2 group-hover:w-full"></span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
