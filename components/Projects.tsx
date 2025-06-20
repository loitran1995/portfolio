// app/projects/page.tsx
"use client"; // Bắt buộc nếu bạn dùng Framer Motion hoặc các hook của React

// THÊM Variants, Transition, Easing VÀO IMPORT
import { motion, Variants, Transition, Easing, useInView } from "framer-motion";
import { Metadata } from "next"; // Dùng cho metadata tĩnh, hoặc động nếu cần
import Image from "next/image"; // Import Next.js Image component for optimized images
import React, { useRef } from "react"; // <-- THÊM useRef

// Metadata cho trang Projects
export const metadata: Metadata = {
  title: "Projects | Loi Portfolio",
  description: "Các dự án thiết kế UI/UX của Lợi Trần.",
};

export default function Projects() {
  // 1. Tạo một ref để đính kèm vào phần tử
  const ref = useRef(null);
  // 2. Sử dụng useInView để kiểm tra khi phần tử vào/ra viewport
  // { once: true } đảm bảo animation chỉ chạy một lần khi xuất hiện lần đầu
  // { amount: 0.2 } có nghĩa là animation sẽ kích hoạt khi 20% phần tử hiển thị trong viewport
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  // Variants cho animation container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Tùy chỉnh thời gian giữa các phần tử con
      },
    },
  };

  // Variants cho animation của mỗi item (tiêu đề, mỗi thẻ dự án)
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 }, // Bắt đầu từ dưới lên một chút
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as Easing, // Ép kiểu 'easeOut' thành Easing
      } as Transition, // Ép kiểu toàn bộ object thành Transition
    },
  };

  // Dữ liệu giả định cho 4 thẻ dự án
  const projectsData = [
    {
      id: 1,
      imageSrc: "/images/prj-gymination.webp", // THAY THẾ BẰNG ĐƯỜNG DẪN HÌNH ẢNH THỰC TẾ
      altText: "Gymination app",
      title: "Gymination app",
      description: "Gym tracking & coaching. Pocket fitness coach.",
      link: "https://www.behance.net/gallery/200278965/Gymination-Mobile-App",
    },
    {
      id: 2,
       imageSrc: "/images/prj-AIxBlock.webp",
      altText: "Hokaido Ordering app",
      title: "Hokaido Ordering app",
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
      className="flex flex-col items-center md:items-start text-center md:text-left
                 w-full px-24  pb-[4rem]" // Đã điều chỉnh padding
    >
      {/* DIV 1: TIÊU ĐỀ "UI/UX Designs" */}
      <motion.h1
        variants={itemVariants} // Áp dụng animation cho tiêu đề
        className="text-[32px] font-fragment-mono text-[var(--gray-medium)] mb-8 w-full text-center md:text-left" // Đã tăng mb cho khoảng cách dưới tiêu đề
      >
        UI/UX Designs
      </motion.h1>

      {/* Grid for Project Cards - Chia đều, full width */}
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(500px,_1fr))] gap-8 w-full">
        {projectsData.map((project) => (
          <motion.a
            key={project.id}
            href={project.link} // <-- THÊM HREF VÀO ĐÂY
            target="_blank" // <-- MỞ TRANG WEB TRONG TAB MỚI
            rel="noopener noreferrer" // <-- THỰC HÀNH TỐT CHO CÁC LINK MỞ TAB MỚI
            variants={itemVariants} // Áp dụng animation cho mỗi card
            className="bg-[#f3f3f3] p-[24px] flex flex-col items-start text-left hover:shadow-lg hover:scale-[1.02] hover:-translate-y-2
                       hover:bg-[#d6d6d6] transition-all duration-300 ease-in-out  min-h-[500px]"
          >
            {/* Hình ảnh - ĐÃ SỬA CÁCH HIỂN THỊ HÌNH ẢNH */}
            {/* Đặt Image vào bên trong div cha có kích thước và relative */}
            <div className="relative w-full h-[500px] overflow-hidden mb-6">
              {" "}
              {/* Container cho ảnh */}
              <Image
                src={project.imageSrc}
                alt={project.altText}
                 fill={true}
                // layout="fill" // <-- layout="fill" được sử dụng
                // objectFit="cover" // Đảm bảo ảnh cover hết không gian mà không bị biến dạng
                // LOẠI BỎ width, height props và các lớp className không cần thiết
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-300 ease-in-out " // rounded-md cho góc bo tròn ảnh
              />
            </div>
            {/* Tiêu đề dự án */}
            <h3 className="text-xl md:text-2xl  font-fragment-mono  mb-2">
              {project.title}
            </h3>
            {/* Mô tả dự án */}
            <p className="text-base font-normal font-poppins text-[var(--gray-medium)]">
              {project.description}
            </p>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
