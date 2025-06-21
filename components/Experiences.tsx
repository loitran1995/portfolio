// components/Experiences.tsx
"use client";

import { motion, Variants,   useInView } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";

export default function Experiences() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Variants cho các phần tử cấp cao (tiêu đề, khối Education)
  // Giữ nguyên như trước hoặc có thể tách riêng nếu muốn animation khác
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

  // NEW: Variants cho container của các Experience Cards
  const cardGridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Độ trễ giữa mỗi card (0.15 giây)
        delayChildren: 0.2,    // Độ trễ trước khi card đầu tiên xuất hiện
      },
    },
  };

  // NEW: Variants cho từng Experience Card
  const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: 50 }, // Bắt đầu từ dưới lên (y: 50) và ẩn
    show: {
      opacity: 1,
      y: 0, // Di chuyển về vị trí ban đầu
      transition: {
        duration: 0.7, // Thời gian animation xuất hiện của mỗi card
        ease: "easeOut",
      },
    },
  };


  // Dữ liệu giả định cho kinh nghiệm làm việc
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
      duration: "2024 - Present",
    },
  ];

  return (
    <motion.div
      id="experiences-section"
      ref={ref}
      // Container chính vẫn ẩn/hiện, có thể stagger các con chính
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } } // Stagger cho tiêu đề và các dòng chính
      }}
      className="flex flex-col items-center md:items-start text-center md:text-left
                 w-full pb-[4rem] px-12 md:px-24"
    >
      <div className="w-full h-[1px] bg-[var(--foreground)] mb-12" />

      {/* Tiêu đề chính */}
      <motion.h1
        variants={mainContentVariants} // Áp dụng mainContentVariants
        className="text-[32px] font-fragment-mono text-[var(--gray-medium)] mb-4 w-full text-center md:text-left"
      >
        Experiences & Education
      </motion.h1>

      {/* Dòng 1: Education */}
      <motion.div
        variants={mainContentVariants} // Áp dụng mainContentVariants
        className="flex flex-col sm:flex-row items-center sm:justify-center
                   space-y-4 sm:space-y-0 sm:space-x-6 mb-12
                   mx-auto p-6 rounded-lg"
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

      {/* Dòng 2: Work Experience Cards (Grid 4 cột) */}
      {/* NEW: Áp dụng cardGridVariants ở đây để điều khiển staggerChildren */}
      <motion.div
        variants={cardGridVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full
                   justify-items-center mx-auto"
      >
        {workExperiences.map((experience) => (
          // NEW: Áp dụng cardItemVariants cho từng card
          <motion.div
            key={experience.id}
            variants={cardItemVariants}
            className="relative p-[24px] flex flex-col items-start text-left
                       transition-all duration-300 ease-in-out
                       h-auto w-full group
                       hover:scale-[1.02] hover:-translate-y-2"
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
            
            <span
              className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[var(--foreground)]
                         transition-all duration-300 ease-out transform -translate-x-1/2
                         group-hover:w-full"
            ></span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}