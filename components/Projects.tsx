// app/projects/page.tsx
"use client";

import { motion, Variants, Transition, Easing, useInView } from "framer-motion";
import { Metadata } from "next";
import Image from "next/image";
import React, { useRef } from "react";
// Import các component 3D Card từ gói đã cài đặt
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"; // Đảm bảo đường dẫn này đúng với cách bạn đã cài đặt

export const metadata: Metadata = {
  title: "Projects | Loi Portfolio",
  description: "Các dự án thiết kế UI/UX của Lợi Trần.",
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as Easing,
      } as Transition,
    },
  };

  const projectsData = [
    {
      id: 1,
      imageSrc: "/images/prj-gymination.webp",
      altText: "Gymination app",
      title: "Gymination app",
      description: "Gym tracking & coaching. Pocket fitness coach.",
      link: "https://www.behance.net/gallery/200278965/Gymination-Mobile-App",
    },
    {
      id: 2,
      imageSrc: "/images/prj-AIxBlock.webp",
      altText: "Hokkaido app",
      title: "Hokkaido app",
      description: "Order restaurant dishes directly from your table.",
      link: "https://www.behance.net/gallery/200839041/Hokkaido-Ordering-App",
    },
    {
      id: 3,
      imageSrc: "/images/prj-chohoatuoi.webp",
      altText: "Chohoatuoi.vn",
      title: "Chohoatuoi.vn",
      description: "Order fresh flowers online for any occasion.",
      link: "https://www.behance.net/gallery/200447511/Chohoatuoivn-Flower-E-commerce-website",
    },
    {
      id: 4,
      imageSrc: "/images/prj-lunarlore.webp",
      altText: "LunarLore website",
      title: "LunarLore website",
      description: "Astrology and numerology insights for brand identity.",
      link: "https://www.behance.net/gallery/211163179/LunarLore-Explore-your-soul-under-Moons-glow",
    },
    {
      id: 5,
      imageSrc: "/images/prj-hokkaido.webp",
      altText: "Hokaido Ordering app",
      title: "Hokaido Ordering app",
      description: "Order restaurant dishes directly from your table.",
      link: "https://www.behance.net/gallery/200839041/Hokkaido-Ordering-App",
    },
    {
      id: 6,
      imageSrc: "/images/prj-hokkaido.webp",
      altText: "Hokaido Ordering app",
      title: "Hokaido Ordering app",
      description: "Order restaurant dishes directly from your table.",
      link: "https://www.behance.net/gallery/200839041/Hokkaido-Ordering-App",
    },
  ];

  return (
    <motion.div
      id="projects-section"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="flex flex-col items-center md:items-start text-left md:text-left w-full px-12 md:px-24 pb-[4rem]"
    >
      {/* DIV 1: TIÊU ĐỀ "UI/UX Designs" */}
      <motion.h1
        variants={itemVariants}
        className="text-[32px] font-fragment-mono text-[var(--gray-medium)] mb-8 w-full text-left md:text-left"
      >
        UI/UX Designs
      </motion.h1>

      {/* Grid for Project Cards - Chia đều, full width */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 h-auto items-stretch">
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="h-full"
          >
            {/* Wrapper CardContainer cho hiệu ứng 3D */}
            <CardContainer className="inter-var w-full h-full ">
              <CardBody className="bg-[#e0e0e0] relative group/card dark:hover:shadow-xl dark:hover:black-500/[0.1] w-full h-full p-[24px] flex flex-col justify-between ">
                {/* Hình ảnh - Sử dụng CardItem cho hình ảnh */}
                <CardItem
                  translateZ="100"
                  className="w-full aspect-square min-h-[150px] overflow-hidden mb-2"
                >
                  <Image
                    src={project.imageSrc}
                    alt={project.altText}
                    fill={true}
                    className="object-cover object-top grayscale group-hover/card:grayscale-0 transition-all duration-300 ease-in-out rounded-xl"
                  />
                </CardItem>

                {/* Tiêu đề dự án - Sử dụng CardItem cho tiêu đề */}
                <CardItem
                  translateZ="50"
                  className="text-xl md:text-xl font-fragment-mono mt-2"
                >
                  {project.title}
                </CardItem>

                {/* Mô tả dự án - Sử dụng CardItem cho mô tả */}
                <CardItem
                  translateZ="60"
                  className="text-base font-poppins text-[var(--gray-medium)]  mt-2"
                >
                  {project.description}
                </CardItem>

                {/* Nút hoặc link - Có thể sử dụng CardItem cho nút "Xem chi tiết" nếu bạn muốn thêm */}
                <CardItem
                  translateZ="70"
                  as="a"
                  href={project.link}
                  target="_blank"
                  className="py-2 mt-2 inline-block text-sm font-poppins email-link-underline"
                >
                  More info →
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
