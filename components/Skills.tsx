// components/Skills.tsx
"use client";

import { motion, Variants, useInView } from "framer-motion"; // Loại bỏ useMotionValue, animate nếu không dùng nữa
import React, { useRef } from "react"; // Loại bỏ useState, useEffect nếu không dùng nữa
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Skills() {
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

  const logoContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const iconItemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const logoSkills = [
    { id: 1, logoSrc: "/images/skills-figma.svg", altText: "Figma Logo", name: "Figma" },
    { id: 2, logoSrc: "/images/skills-framer.svg", altText: "Framer Logo", name: "Framer" },
    { id: 3, logoSrc: "/images/skills-ai.svg", altText: "Adobe Illustrator Logo", name: "Adobe Illustrator" },
    { id: 4, logoSrc: "/images/skills-pts.svg", altText: "Adobe Photoshop Logo", name: "Adobe Photoshop" },
    { id: 5, logoSrc: "/images/skills-xd.svg", altText: "Adobe XD Logo", name: "Adobe XD" },
  ];

  const textSkillsContent = [
    "UI/UX Design",
    "Logo, Branding Design",
    "Printable Design",
    "Content",
    "HTML, CSS",
  ];

  return (
    <motion.div
      id="skills-section"
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="flex flex-col items-center md:items-start text-center md:text-left
                 w-full pb-[4rem] px-24"
    >
      <div className="w-full h-[1px] bg-[var(--foreground)] mb-12" />

      <motion.h1
        variants={mainContentVariants}
        className="text-[32px] font-fragment-mono text-[var(--gray-medium)] mb-8 w-full text-center md:text-left"
      >
        Skills
      </motion.h1>

      <motion.div
        variants={mainContentVariants}
        className="flex flex-col md:flex-row w-full justify-between items-center md:gap-x-16"
      >
        <motion.div
          variants={logoContainerVariants}
          className="flex flex-row flex-wrap items-center justify-center md:items-start md:w-auto w-auto h-auto flex-shrink-0"
        >
          {logoSkills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={iconItemVariants}
              className="last:mb-0"
            >
              <div className="min-w-[96px] min-h-[96px] w-24 h-24">
                <Image
                  src={skill.logoSrc}
                  alt={skill.altText}
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="w-full md:w-auto overflow-hidden md:flex-grow">
          <Marquee
            speed={80} // Tốc độ cuộn (pixels per second)
            gradient={true} // Bỏ hiệu ứng mờ ở hai đầu nếu không cần, hoặc set true nếu muốn
            loop={0} // 0 nghĩa là vô hạn
            direction="right" // Mặc định là 'left', bạn có thể chọn 'right'
            pauseOnHover // Tạm dừng khi di chuột qua
            // Thêm prop gap để kiểm soát khoảng cách
           
            // Hoặc bạn có thể đặt gap bằng 0 nếu muốn chúng dính liền nhau
            // Thử nghiệm các giá trị khác nhau để tìm ra khoảng cách phù hợp nhất
            // Nếu bạn muốn khoảng cách giống như mr-8 (32px) của các thẻ p, hãy đặt gap = 32
            
          >
            {textSkillsContent.map((skillText, index) => (
              <p
                key={`skill-${index}`}
                // Quan trọng: Bỏ mr-8 ở đây nếu bạn muốn Marquee kiểm soát gap!
                // Nếu không, bạn sẽ có (mr-8 + gap) giữa các lần lặp.
                // Hoặc giữ mr-8 và đặt gap=0 nếu muốn khoảng cách chỉ là mr-8
                className="text-base font-fragment-mono text-[var(--foreground)] w-auto inline-block mr-20"
              >
                {skillText}
              </p>
            ))}
          </Marquee>
        </div>
      </motion.div>
    </motion.div>
  );
}