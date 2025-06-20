// // components/EnjoyProjects.tsx
// "use client";

// import React, { useRef } from 'react';
// import { motion, Variants, useInView } from 'framer-motion';
// import Image from 'next/image';
// import Button from '@/components/Button';

// export default function EnjoyProjects() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });

//   const containerVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     show: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
//   };

//   return (
//     <div
//     className="flex flex-col items-center justify-center w-full  bg-[var(--gray-dark)]"
//     >
//     <motion.div
//       id="enjoy-projects-section"
//       ref={ref}
//       initial="hidden"
//       animate={isInView ? "show" : "hidden"}
//       variants={containerVariants}
//       className="flex flex-col items-center justify-center w-full p-24 bg-[var(--gray-dark)]"
//     >
//       <div className="w-full h-[1px] bg-[var(--gray-medium)] mb-12" />

//       {/* Thay đổi chính ở đây: flex-col (mặc định cho mobile/tablet), md:flex-row (cho desktop) */}
//       {/* items-center (cho mobile/tablet), md:items-start (cho desktop) */}
//       <div className="flex flex-col md:flex-row w-full max-w-[1200px] gap-12 md:gap-x-24 items-center md:items-start  mt-12">
//         {/* Cột trái */}
//         <motion.div
//           variants={itemVariants}
//           // Thay đổi ở đây: w-full (trên mobile/tablet), md:w-1/2 (trên desktop)
//           // Đảm bảo căn giữa nội dung cột trái theo chiều ngang trên mobile/tablet
//           className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2"
//         >
//           {/* Hình SVG */}
//           <Image
//             src="/images/enjoyprj-confetti.svg"
//             alt="Other Projects Icon"
//             width={140}
//             height={140}
//             className="mb-6"
//           />

//           {/* Tiêu đề chính */}
//           <h2 className="text-white font-fragment-mono text-2xl mb-2">
//             Other enjoyable project
//           </h2>

//           {/* Tiêu đề Plugin */}
//           <h3 className="text-white text-2xl font-bold mb-2">
//             Fast Generate Color Style
//           </h3>

//           {/* Mô tả Plugin */}
//           <p className="text-[var(--gray-medium)] text-base mb-2">
//             Plugin that helping you to save time in choosing foundation colors.
//           </p>

//           {/* Button */}
//           <Button
//             variant="dark"
//             href="https://www.figma.com/community/plugin/1297515046038237661/fast-generate-color-styles"
//             className="mb-4"
//           >
//             Figma Community
//           </Button>
//         </motion.div>

//         {/* Cột phải */}
//         <motion.div
//           variants={itemVariants}
//           // Thay đổi ở đây: w-full (trên mobile/tablet), md:w-1/2 (trên desktop)
//           // Giữ justify-center để hình ảnh luôn căn giữa trong không gian của nó
//           className="flex justify-center w-full md:full flex-grow"
//         >
//           <Image
//             src="/images/enjoyprj-fgcs.webp"
//             alt="Fast Generate Color Style Plugin"
//             width={800}
//             height={400}
//             className="w-full h-auto object-cover max-w-[800px] max-h-[400px] "
//           />
//         </motion.div>
//       </div>
//     </motion.div>
//     </div>
//   );
// }
// components/EnjoyProjects.tsx
"use client";

import React, { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";
import Button from "@/components/Button";

export default function EnjoyProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 }, // We can keep overall opacity hidden for initial load
    show: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2, // Still good for staggering the columns
      },
    },
  };

  // --- THAY ĐỔI CHÍNH Ở ĐÂY: itemVariants được tách thành LeftItem và RightItem ---
  const leftItemVariants: Variants = {
    hidden: { opacity: 0, x: -100 }, // Bắt đầu từ bên trái, ẩn
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const rightItemVariants: Variants = {
    hidden: { opacity: 0, x: 100 }, // Bắt đầu từ bên phải, ẩn
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-[var(--gray-dark)]">
      <motion.div
        id="enjoy-projects-section"
        ref={ref}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={containerVariants}
        // Remove px-24 from here, apply to the max-w-[1200px] div for better control
        className="flex flex-col items-center justify-center w-full p-24" // Removed bg-[var(--gray-dark)] here, it's on the outer div
      >
        <div className="w-full h-[1px] bg-[var(--gray-medium)] " />{" "}
        {/* Added max-w here */}
        <div className="flex flex-col md:flex-row w-full max-w-[1200px] gap-12 md:gap-x-24 items-center md:items-start mt-24">
          {/* Cột trái */}
          <motion.div
            variants={leftItemVariants} /* Sử dụng variants mới cho cột trái */
            className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2"
          >
            {/* Hình SVG */}
            <Image
              src="/images/enjoyprj-confetti.svg"
              alt="Other Projects Icon"
              width={160}
              height={160}
              className="mb-4"
            />

            {/* Tiêu đề chính */}
            <h2 className="text-white font-fragment-mono text-2xl mb-3">
              Other enjoyable project
            </h2>

            {/* Tiêu đề Plugin */}
            <h3 className="text-white text-2xl font-bold mb-2">
              Fast Generate Color Style
            </h3>

            {/* Mô tả Plugin */}
            <p className="text-[var(--gray-medium)] text-base mb-2">
              Plugin that helping you to save time in choosing foundation
              colors.
            </p>

            {/* Button */}
            <Button
              variant="dark"
              href="https://www.figma.com/community/plugin/1297515046038237661/fast-generate-color-styles"
            >
              Figma Community
            </Button>
          </motion.div>

          {/* Cột phải */}
          <motion.div
            variants={rightItemVariants} /* Sử dụng variants mới cho cột phải */
            // Giữ justify-center để hình ảnh luôn căn giữa trong không gian của nó
            className="flex justify-center w-full md:w-full flex-grow" // Changed md:full to md:w-1/2 for proper column sizing
          >
            <Image
              src="/images/enjoyprj-fgcs.webp"
              alt="Fast Generate Color Style Plugin"
              width={800}
              height={400}
              className="w-full h-full object-cover max-w-[800px] max-h-[400px]"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
