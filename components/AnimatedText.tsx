// components/AnimatedText.tsx
'use client';

import { motion } from 'framer-motion';

interface AnimatedTextProps {
    text: string;
    charVariants: any;
    // staggerDelay?: number; // Không cần truyền trực tiếp staggerDelay nữa
    className?: string;
    elementType?: 'h1' | 'p' | 'span';
    totalDuration?: number; // THÊM: Tổng thời gian mong muốn cho toàn bộ animation text
}

export default function AnimatedText({
    text,
    charVariants,
    // staggerDelay = 0.02, // Đã bỏ
    className,
    elementType = 'span',
    totalDuration = 1.0, // Mặc định tổng thời gian là 1 giây
}: AnimatedTextProps) {
    const characters = text.split('');

    // Tính toán staggerDelay động dựa trên tổng thời gian và số ký tự
    // Trừ đi duration của mỗi ký tự để đảm bảo ký tự cuối cùng cũng kịp hoàn thành
    const charAnimationDuration = charVariants.visible?.transition?.duration || 0.3; // Lấy duration từ charVariants, mặc định 0.3s
    const effectiveTotalDuration = totalDuration - charAnimationDuration; // Thời gian hiệu quả cho stagger
    
    // Đảm bảo staggerDelay không âm và không chia cho 0
    const calculatedStaggerDelay = characters.length > 1
        ? Math.max(0, effectiveTotalDuration / (characters.length - 1))
        : 0;

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: calculatedStaggerDelay, // Sử dụng staggerDelay đã tính toán
                // Không cần transition chung ở đây nếu muốn kiểm soát qua staggerChildren
                // duration: totalDuration, // Có thể thêm nếu muốn animation opacity cho container
            },
        },
    };

    const Element = motion[elementType];

    return (
        <Element
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
            // Đảm bảo phần tử bọc ngoài cùng là block để text xuống dòng
            style={{ display: 'block', flexWrap: 'wrap' }}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={charVariants}
                    className="inline-block" // Giữ inline-block để các chữ cái animate riêng
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </Element>
    );
}