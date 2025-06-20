// components/Logofolio.tsx
"use client";

import { motion, Variants, useInView } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";

export default function Logofolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Variants cho các phần tử cấp cao (tiêu đề)
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

  // Variants cho container của các logo item để áp dụng staggerChildren
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

  // Variants cho từng logo item riêng lẻ
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
    <div
     className="flex flex-col items-center md:items-start text-center md:text-left
                 w-full pb-[1rem] bg-[var(--gray-dark)] ">
    <motion.div
      id="logofolio-section"
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      // ***** ĐÂY LÀ THAY ĐỔI QUAN TRỌNG NHẤT *****
      // Bù đắp padding 99px của body bằng negative margin 99px từ mỗi bên.
      // Điều này sẽ làm cho component này tràn ra ngoài vùng padding của body.
      className="flex flex-col items-center md:items-start text-center md:text-left
                 w-full pb-[1rem] bg-[var(--gray-dark)] "
    >
      {/* Đường kẻ phân cách. Đổi màu sang '--background' để tạo sự tương phản với nền mới. */}
      <div className="w-full h-[1px] bg-[var(--background)] mb-12" />

      {/* Tiêu đề chính */}
      <motion.h1
        variants={mainContentVariants}
        // Thêm padding ngang riêng cho tiêu đề để nó không bị dính sát mép màn hình
        // Các giá trị responsive này giúp tiêu đề có khoảng cách hợp lý trên mọi kích thước.
        className="text-[32px] font-fragment-mono text-white mb-12 w-full text-center md:text-left px-24
                  " // Ví dụ: 16px mobile, 32px tablet, 64px desktop
      >
        Logofolio
      </motion.h1>

      {/* Grid chứa các logo */}
      <motion.div
        variants={logoGridVariants}
        // Thêm padding ngang cho grid để các logo không bị dính sát mép màn hình
        // Tương tự tiêu đề, các giá trị này đảm bảo các logo có khoảng cách đẹp mắt.
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center px-24
                  "
      >
        {logos.map((logo) => (
          <motion.div
            key={logo.id}
            variants={logoItemVariants}
            className="relative w-full max-w-[1000px] pb-[100%] bg-white flex items-center justify-center
                       transition-all duration-300 ease-in-out"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              layout="fill"
              objectFit="contain"
              className=""
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
    </div>
  );
}
