// components/AnimatedText.tsx
'use client';

import { motion, Variants, TargetAndTransition } from 'framer-motion';
import React from 'react'; // Đảm bảo React được import nếu bạn cần nó cho các kiểu khác

interface AnimatedTextProps {
    text: string;
    charVariants: Variants;
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

    const charAnimationDuration = (charVariants.visible as TargetAndTransition)?.transition?.duration || 0.3;

    const effectiveTotalDuration = totalDuration - charAnimationDuration;
    
    const calculatedStaggerDelay = characters.length > 1
        ? Math.max(0, effectiveTotalDuration / (characters.length - 1))
        : 0;

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: calculatedStaggerDelay,
            },
        },
    };

    // ĐÂY LÀ DÒNG CẦN SỬA ĐỔI:
    // HÃY BỎ HẾT KIỂU CHÚ THÍCH TRƯỚC motion[elementType]
    // Để TypeScript tự suy luận kiểu của Element là một union của các ForwardRefComponent cụ thể
    const Element = motion[elementType]; 

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