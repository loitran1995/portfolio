// components/AnimatedText.tsx
'use client';

import { motion, Variants, TargetAndTransition, HTMLMotionProps } from 'framer-motion'; // <-- THÊM Variants VÀO ĐÂY
import React from 'react'; // Đảm bảo React được import vì chúng ta dùng React.ComponentType

interface AnimatedTextProps {
    text: string;
    charVariants: Variants; // <-- SỬA `any` THÀNH `Variants`
    className?: string;
    elementType?: 'h1' | 'p' | 'span';
    totalDuration?: number;
}

export default function AnimatedText({
    text,
    charVariants,
    className,
    elementType = 'span',
    totalDuration = 1.0,
}: AnimatedTextProps) {
    const characters = text.split('');

    const charAnimationDuration = (charVariants.visible as TargetAndTransition )?.transition?.duration || 0.3; // THÊM AS ANY NẾU TS KHÔNG HIỂU TYPE CỦA charVariants.visible

    const effectiveTotalDuration = totalDuration - charAnimationDuration;
    
    const calculatedStaggerDelay = characters.length > 1
        ? Math.max(0, effectiveTotalDuration / (characters.length - 1))
        : 0;

    const container: Variants = { // <-- THÊM Variants VÀO ĐÂY
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: calculatedStaggerDelay,
            },
        },
    };

    // Kiểm tra để đảm bảo elementType là một key hợp lệ của motion
    type AllowedHTMLElements = 'h1' | 'p' | 'span';
    const Element: React.ComponentType<HTMLMotionProps<AllowedHTMLElements>> = motion[elementType];

     return (
        <Element
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
            style={{ display: 'block', flexWrap: 'wrap' }}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={charVariants}
                    className="inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </Element>
    );
}