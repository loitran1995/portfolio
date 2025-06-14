// components/Button.tsx
'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { LuArrowUpRight } from "react-icons/lu";


interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

// --- ĐỊNH NGHĨA CÁC VARIANTS ANIMATION ---
const ANIMATION_DURATION = 1.0; // Thời gian animation tổng thể
const EASE_TYPE = "easeInOut"; // Kiểu chuyển động ổn định hơn

// Variants cho TOÀN BỘ BUTTON (thẻ motion.a / motion.button) - chỉ quản lý opacity
const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3, // Nút tự hiện ra nhanh hơn
            ease: "easeOut",
            delayChildren: 0.1 // Độ trễ trước khi các animation con (text và icon) bắt đầu
        }
    }
};

// Variants cho khối TEXT (wrapper của các ký tự) - áp dụng clipPath để hiện text
const textWrapperVariants = {
    hidden: { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 }, // Text bắt đầu bị cắt từ phải, ẩn
    visible: {
        clipPath: 'inset(0% 0% 0% 0%)', // Text mở rộng và hiện rõ
        opacity: 1,
        transition: {
            duration: ANIMATION_DURATION, // Thời gian cho hiệu ứng text mở ra
            ease: EASE_TYPE,
            staggerChildren: 0.05, // Độ trễ giữa các ký tự
            delayChildren: ANIMATION_DURATION * 0.2 // Độ trễ cho các ký tự bắt đầu animation
        }
    }
};

// Variants cho animation của ICON - trượt vào độc lập
const iconVariants = {
    hidden: { x: -80, opacity: 0 }, // Icon bắt đầu dịch trái XA HƠN, ẩn (dựa vào overflow-hidden của button cha)
    visible: {
        x: 0,          // Chạy về vị trí ban đầu
        opacity: 1,    // Hiện ra
        transition: {
            duration: ANIMATION_DURATION * 0.7, // Thời gian chạy của icon (khoảng 70% tổng thời gian)
            ease: EASE_TYPE,
            delay: ANIMATION_DURATION * 0.1 // Icon bắt đầu sớm hơn một chút trong quá trình
        }
    }
};

// Variants cho animation của TỪNG KÝ TỰ
const textCharVariants = {
    hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.3, ease: 'easeOut' }
    }
};

// Helper function để chia text thành ký tự và áp dụng animation
const splitTextToCharacters = (text: string) => {
    return text.split("").map((char, index) => (
        <motion.span
            key={index}
            variants={textCharVariants}
            className="inline-block"
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    ));
};

export default function Button({
    children,
    onClick,
    href,
    className = '',
    type = 'button',
    disabled = false,
}: ButtonProps) {

    const baseStyles = `
        inline-flex items-center justify-center
        font-poppins text-base font-normal
        py-4 px-3
        rounded-full
        transition-all duration-300 ease-in-out
        whitespace-nowrap
        text-[var(--foreground)]
        border border-[1px]
        border-[var(--foreground)]
        hover:text-white
        hover:bg-black
        hover:border-transparent
        overflow-hidden /* RẤT QUAN TRỌNG: để che giấu icon và text khi chúng ở ngoài ban đầu */
        width: fit-content; /* Đảm bảo button có width tự nhiên theo nội dung */
    `;

    const iconSpacing = 'ml-4';
    const iconContainerStyles = `
        flex items-center justify-center
        w-8 h-8
        bg-black
        rounded-full
        text-white
        text-[20px]
    `;

    const allClassNames = `${baseStyles} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

    // Xử lý nội dung text: nếu là string thì chia nhỏ để animate từng ký tự
    const animatedChildren = typeof children === 'string'
        ? (
            // Áp dụng textWrapperVariants (có clipPath) cho khối text
            <motion.span variants={textWrapperVariants} className="inline-block">
                {splitTextToCharacters(children)}
            </motion.span>
        )
        : (
            // Nếu không phải string, wrap trong motion.span để vẫn có thể áp dụng clipPath
            <motion.span variants={textWrapperVariants} className="inline-block">
                {children}
            </motion.span>
        );


    const MotionComponent = href ? motion.a : motion.button;

    return (
        <MotionComponent
            href={href}
            type={type}
            onClick={onClick}
            className={allClassNames}
            disabled={disabled}
            variants={buttonVariants} // Áp dụng animation opacity tổng thể cho button
            initial="hidden"
            animate="visible"
            whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
            {/* Div bọc nội dung để căn giữa và chứa cả text và icon */}
            <div className="inline-flex items-center justify-center h-full w-full">
                {/* Text được animate bằng clipPath */}
                {animatedChildren}

                {/* Icon được animate trượt vào độc lập */}
                <motion.span variants={iconVariants} className={`${iconSpacing} ${iconContainerStyles}`}>
                    <LuArrowUpRight />
                </motion.span>
            </div>
        </MotionComponent>
    );
}