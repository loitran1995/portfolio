// components/Button.tsx
'use client';

// THÊM Transition và Easing VÀO IMPORT
import { motion, Variants, Transition, Easing } from 'framer-motion';
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
const buttonVariants: Variants = { // THÊM : Variants
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: EASE_TYPE as Easing, // SỬA: Cast EASE_TYPE thành Easing
            delayChildren: 0.1
        } as Transition // THÊM: Cast toàn bộ object thành Transition
    }
};

// Variants cho khối TEXT (wrapper của các ký tự) - áp dụng clipPath để hiện text
const textWrapperVariants: Variants = { // THÊM : Variants
    hidden: { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
    visible: {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        transition: {
            duration: ANIMATION_DURATION,
            ease: EASE_TYPE as Easing, // SỬA: Cast EASE_TYPE thành Easing
            staggerChildren: 0.05,
            delayChildren: ANIMATION_DURATION * 0.2
        } as Transition // THÊM: Cast toàn bộ object thành Transition
    }
};

// Variants cho animation của ICON - trượt vào độc lập
const iconVariants: Variants = { // THÊM : Variants
    hidden: { x: -80, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: ANIMATION_DURATION * 0.7,
            ease: EASE_TYPE as Easing, // SỬA: Cast EASE_TYPE thành Easing
            delay: ANIMATION_DURATION * 0.1
        } as Transition // THÊM: Cast toàn bộ object thành Transition
    }
};

// Variants cho animation của TỪNG KÝ TỰ
const textCharVariants: Variants = { // THÊM : Variants
    hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.3, ease: EASE_TYPE as Easing } as Transition // SỬA: Cast EASE_TYPE thành Easing và toàn bộ object thành Transition
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
        overflow-hidden
        width: fit-content;
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
            <motion.span variants={textWrapperVariants} className="inline-block">
                {splitTextToCharacters(children)}
            </motion.span>
        )
        : (
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
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
            <div className="inline-flex items-center justify-center h-full w-full">
                {animatedChildren}

                <motion.span variants={iconVariants} className={`${iconSpacing} ${iconContainerStyles}`}>
                    <LuArrowUpRight />
                </motion.span>
            </div>
        </MotionComponent>
    );
}