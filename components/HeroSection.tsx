// components/HeroSection.tsx
'use client'; // Bắt buộc cho Client Component

// THÊM Variants, Transition, Easing VÀO IMPORT
import { motion, Variants, Transition, Easing } from 'framer-motion';
import Image from 'next/image'; // Import Next.js Image component for optimized images
import AnimatedText from './AnimatedText';
import Button from '@/components/Button'; // Đảm bảo import component Button của bạn
import { LuArrowUpRight } from "react-icons/lu";


export default function HeroSection() {
  // THÊM : Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Giảm thời gian stagger một chút để hiệu ứng nhanh hơn
      } as Transition, // <-- ÉP KIỂU TOÀN BỘ OBJECT THÀNH Transition
    },
  };

  // THÊM : Variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: 'easeInOut' as Easing // <-- ÉP KIỂU 'easeInOut' thành Easing
      } as Transition, // <-- ÉP KIỂU TOÀN BỘ OBJECT THÀNH Transition
    },
  };

  // THÊM : Variants
  const charAppearVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20, // Bắt đầu dịch trái 20px
      filter: 'blur(5px)', // Bắt đầu nhòe 5px
    },
    visible: {
      opacity: 1,
      x: 0, // Trượt về vị trí ban đầu
      filter: 'blur(0px)', // Bỏ nhòe
      transition: {
        duration: 0.3, // Thời gian cho mỗi từ
        ease: 'easeOut' as Easing, // <-- ÉP KIỂU 'easeOut' thành Easing
      } as Transition, // <-- ÉP KIỂU TOÀN BỘ OBJECT THÀNH Transition
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      // Thay đổi bố cục thành flexbox, căn giữa theo chiều dọc
      // Thêm padding và max-w để nội dung không bị quá rộng
      className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-center
                  text-center md:text-left w-full py-[2rem] px-12 md:px-24"
    >
      {/* Cột trái: Hình ảnh Avatar */}
      <motion.div variants={itemVariants} className="mb-10 md:mb-0 md:mr-10 flex-shrink-0">
        <Image
          src="/images/avatar.webp" // THAY ĐỔI ĐƯỜNG DẪN ĐẾN AVATAR CỦA BẠN
          alt="Lợi Trần's Avatar"
          width={466} // Chiều rộng cố định
          height={466} // Chiều cao cố định
          className=" object-cover w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[466px] lg:h-[466px]"
        />
      </motion.div>

      {/* Cột phải: Text và nút */}
      {/* ĐÃ SỬA: Đổi div thành motion.div */}
      <motion.div variants={itemVariants} className="flex-grow">
        {/* Tên tôi */}
        <AnimatedText
          text="TRAN THANH LOI"
          charVariants={charAppearVariants}
          // staggerDelay={0.05} // staggerDelay đã được xử lý bên trong AnimatedText
          className="font-fragment-mono text-[var(--gray-medium)] mb-2 leading-tight
                     text-[6vw] md:text-[6vw] lg:text-[5.5vw]"
          elementType="h1" // Render là thẻ h1
        />

        {/* Vị trí/Nghề nghiệp */}
      
        <AnimatedText
          text="UI/UX DESIGNER"
          charVariants={charAppearVariants}
          // staggerDelay={0.05} // staggerDelay đã được xử lý bên trong AnimatedText
          className="font-fragment-mono mb-2 leading-tight
                     text-[6vw] md:text-[6vw] lg:text-[5.5vw] color-black"
          elementType="h1" // Render là thẻ h1
        />

        {/* Mô tả ngắn */}
        <AnimatedText
          text="An inspired designer, driven by passion."
          charVariants={charAppearVariants}
          // staggerDelay={0.05} // staggerDelay đã được xử lý bên trong AnimatedText
          className="text-[24px] mb-8 text-[var(--gray-medium)]"
          elementType="h1" // Render là thẻ h1
        />
        <Button variant="light"
          href="https://drive.google.com/file/d/1R54mkWFuYN-t76L_GWH9ng1sfML5qoRr/view"
          className="mb-6" // Giữ lại mb-6 để có khoảng cách dưới nút 
        >
          PDF Version
        </Button>

        {/* Các Link Diploma */}
        <motion.div variants={containerVariants} className="flex flex-col space-y-3 md:flex-row items-center md:items-start justify-center md:justify-start">
          {/* Khối bọc chung cho các link */}
          <div className="flex flex-row space-x-4 flex-wrap">
            <motion.a
              variants={itemVariants}
              href="https://drive.google.com/file/d/1GZd0Dj4fTDmkgq2zi8dDfj7t63SXSxDs/view" // THAY ĐỔI LINK DIPLOMA 1
              target="_blank"
              rel="noopener noreferrer"
              // Sử dụng flexbox để căn chỉnh nội dung bên trong link
              className="text-lg text-black inline-flex items-center email-link-underline"
            >
              <span>UI Diploma</span>
              <LuArrowUpRight className="ml-1 text-base inline-block align-middle" /> {/* Thêm icon vào đây, cách text 4px */}
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="https://drive.google.com/file/d/1DwYcbeFn31Z5o11X4bti-g7MkUTFgYpd/view" // THAY ĐỔI LINK DIPLOMA 2
              target="_blank"
              rel="noopener noreferrer"
              // Sử dụng flexbox để căn chỉnh nội dung bên trong link
              className="text-lg text-black inline-flex items-center email-link-underline"
            >
              <span>UX Diploma</span>
              <LuArrowUpRight className="ml-1 text-base inline-block align-middle" /> {/* Thêm icon vào đây, cách text 4px */}
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}