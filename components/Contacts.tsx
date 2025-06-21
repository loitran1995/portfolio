// app/contacts/page.tsx
'use client'; // Bắt buộc nếu bạn dùng Framer Motion hoặc các hook của React

// THÊM Variants, Transition, Easing VÀO IMPORT
import { motion, Variants, Transition, Easing } from 'framer-motion';
import { Metadata } from 'next'; // Dùng cho metadata tĩnh, hoặc động nếu cần

import { LuArrowUpRight } from "react-icons/lu";

// Metadata cho trang Contacts
export const metadata: Metadata = {
  title: 'Contacts | Loi Portfolio',
  description: 'Thông tin liên hệ của Lợi Trần.',
};

export default function Contacts() {
  // Variants cho animation (có thể tái sử dụng từ HeroSection hoặc tùy chỉnh)
  const containerVariants: Variants = { // <-- THÊM : Variants
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Tùy chỉnh thời gian giữa các phần tử con
             

      },
    },
  };

  const itemVariants: Variants = { // <-- THÊM : Variants
    hidden: { opacity: 0, y: 20 }, // Bắt đầu từ dưới lên một chút
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: 'easeOut' as Easing // <-- ÉP KIỂU 'easeOut' thành Easing
      } as Transition // <-- ÉP KIỂU TOÀN BỘ OBJECT THÀNH Transition
    },
  };

  return (
    <motion.div
          id="contacts-section"

      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center md:items-start text-center md:text-left
                 w-full py-[2rem] px-12 md:px-24" // Thêm pt để tránh header cố định
    >
        <div className="w-full h-[1px] bg-[var(--foreground)] mb-12" />
      {/* DIV 1: TIÊU ĐỀ "CONTACTS" */}
      <motion.h1
        variants={itemVariants}
        className="text-[32px] font-fragment-mono text-[var(--gray-medium)] mb-4 w-full text-center md:text-left"
      >
        Contacts
      </motion.h1>

      {/* DIV 2: KHỐI CHỨA THÔNG TIN (Cột trái: Email/SĐT, Cột phải: Social Links) */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between w-full mb-12">
        {/* CỘT TRÁI: EMAIL VÀ SỐ ĐIỆN THOẠI */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-10 md:mb-0">
          <motion.a
            variants={itemVariants}
            href="mailto:work.loitran@example.com"
            className="text-base font-poppins text-[var(--foreground)] email-link-underline md:mb-2 inline-block"
          >
            work.loitran@example.com
          </motion.a>

          <motion.a
            variants={itemVariants}
            href="tel:0799080770"
            className="text-base font-poppins text-[var(--foreground)] email-link-underline inline-block"
          >
            0799080770
          </motion.a>
        </div>

        {/* CỘT PHẢI: SOCIAL LINKS */}
        <motion.div variants={containerVariants} className="flex flex-col items-center md:items-start md:ml-auto">
          <div className="flex flex-row space-x-8 flex-wrap justify-center md:justify-start">
            <motion.a
              variants={itemVariants}
              href="https://dribbble.com/lowf2505" // ĐỔI LINK NÀY
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-black inline-flex items-center email-link-underline mb-2 md:mb-0"
            >
              <span>dribbble</span>
              <LuArrowUpRight className="ml-1 text-base inline-block align-middle" />
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="https://facebook.com/Lowf2505/" // ĐỔI LINK NÀY
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-black inline-flex items-center email-link-underline mb-2 md:mb-0"
            >
              <span>facebook</span>
              <LuArrowUpRight className="ml-1 text-base inline-block align-middle" />
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="https://linkedin.com/in/loitran1995/" // ĐỔI LINK NÀY
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-black inline-flex items-center email-link-underline mb-2 md:mb-0"
            >
              <span>linkedin</span>
              <LuArrowUpRight className="ml-1 text-base inline-block align-middle" />
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="https://behance.net/Lowf" // ĐỔI LINK NÀY
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-black inline-flex items-center email-link-underline mb-2 md:mb-0"
            >
              <span>behance</span>
              <LuArrowUpRight className="ml-1 text-base inline-block align-middle" />
            </motion.a>
          </div>
          
        </motion.div>
      </div>
        <div className="w-full h-[1px] bg-[var(--foreground)] mb-8" />
    </motion.div>
    
  );
}