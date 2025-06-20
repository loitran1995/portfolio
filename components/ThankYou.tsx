
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ORIGINAL_TEXT = "Thanks for being here.";
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+[]{}|;:',.<>/?";
const REVEAL_DELAY_PER_CHAR = 0.08; // Độ trễ giữa các ký tự bắt đầu lộ diện
const RESOLVE_STEPS = 8; // Số bước để một ký tự ngẫu nhiên chuyển thành ký tự đúng
const STEP_INTERVAL = 50; // Thời gian giữa mỗi bước (ms)

const getRandomChar = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

export default function ThankYou() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const [displayText, setDisplayText] = useState<string[]>(
    Array(ORIGINAL_TEXT.length).fill('')
  );

  useEffect(() => {
    if (!isInView) {
      // Reset state if not in view (optional, useful if component re-enters view)
      setDisplayText(Array(ORIGINAL_TEXT.length).fill(''));
      return;
    }

    const timers: NodeJS.Timeout[] = [];

    ORIGINAL_TEXT.split("").forEach((char, index) => {
      // Bắt đầu quá trình "giải mã" cho từng ký tự
      timers.push(setTimeout(() => {
        let currentStep = 0;
        const charInterval = setInterval(() => {
          if (currentStep < RESOLVE_STEPS -1) {
            // Hiển thị ký tự ngẫu nhiên
            setDisplayText(prev => {
              const newText = [...prev];
              newText[index] = getRandomChar();
              return newText;
            });
            currentStep++;
          } else {
            // Hiển thị ký tự đúng
            clearInterval(charInterval);
            setDisplayText(prev => {
              const newText = [...prev];
              newText[index] = char;
              return newText;
            });
          }
        }, STEP_INTERVAL);
        timers.push(charInterval); // Lưu interval để cleanup
      }, index * REVEAL_DELAY_PER_CHAR * 1000)); // Delay cho mỗi ký tự
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isInView]);

  return (
    <div
      ref={ref} // Gắn ref vào container chính để useInView hoạt động
      className="flex flex-col items-center justify-center w-full md:w-full text-center bg-[var(--gray-dark)] px-24 pb-12"
    >
      {/* ĐƯỜNG NẰM TRÊN: Đã chuyển div này ra khỏi motion.h1 */}
      <div className="w-full  h-[1px] bg-[var(--gray-medium)] mb-12" />

      <motion.h1
        className="text-[var(--gray-medium)] text-5xl font-fragment-mono w-full"
      >
        {displayText.map((char, index) => (
          <motion.span
            key={index}
            // Animate opacity when a character is revealed (from empty/random to correct)
            initial={{ opacity: 0 }}
            animate={{ opacity: char !== '' ? 1 : 0 }}
            transition={{ duration: 0.05, ease: "linear" }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}