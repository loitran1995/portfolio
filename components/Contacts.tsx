'use client';

import { motion, AnimatePresence, Variants, Transition, Easing } from 'framer-motion';
import { Metadata } from 'next';
import { LuArrowUpRight } from "react-icons/lu";
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Contacts | Loi Portfolio',
  description: 'Thông tin liên hệ của Lợi Trần.',
};

export default function Contacts() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as Easing,
      } as Transition,
    },
  };

  const [copiedTarget, setCopiedTarget] = useState<string | null>(null);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedTarget(value);

    setTimeout(() => {
      setCopiedTarget(null);
    }, 1000);
  };

  return (
    <motion.div
      id="contacts-section"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center md:items-start text-center md:text-left w-full py-[2rem] px-12 md:px-24"
    >
      <div className="w-full h-[1px] bg-[var(--foreground)] mb-12" />

      <motion.h1
        variants={itemVariants}
        className="text-[32px] font-fragment-mono text-[var(--gray-medium)] mb-4 w-full text-center md:text-left"
      >
        Contacts
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between w-full mb-12">
        {/* Email & Phone */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-10 md:mb-0 relative space-y-2">
          {/* Email */}
          <motion.button
            variants={itemVariants}
            onClick={() => handleCopy("work.loitran@example.com")}
            className="relative text-base font-poppins text-[var(--foreground)] email-link-underline inline-block"
          >
            work.loitran@example.com
            <AnimatePresence>
              {copiedTarget === "work.loitran@example.com" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black text-white text-[10px] font-fragment-mono rounded whitespace-nowrap z-10"
                >
                  Copied
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Phone */}
          <motion.button
            variants={itemVariants}
            onClick={() => handleCopy("0799080770")}
            className="relative text-base font-poppins text-[var(--foreground)] email-link-underline inline-block"
          >
            0799080770
            <AnimatePresence>
              {copiedTarget === "0799080770" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black text-white text-[10px] font-fragment-mono rounded whitespace-nowrap z-10"
                >
                  Copied
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Socials */}
        <motion.div variants={containerVariants} className="flex flex-col items-center md:items-start md:ml-auto">
          <div className="flex flex-row space-x-8 flex-wrap justify-center md:justify-start">
            {[
              { label: 'dribbble', href: 'https://dribbble.com/lowf2505' },
              { label: 'facebook', href: 'https://facebook.com/Lowf2505/' },
              { label: 'linkedin', href: 'https://linkedin.com/in/loitran1995/' },
              { label: 'behance', href: 'https://behance.net/Lowf' },
            ].map((social) => (
              <motion.a
                key={social.label}
                variants={itemVariants}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-black inline-flex items-center email-link-underline mb-2 md:mb-0"
              >
                <span>{social.label}</span>
                <LuArrowUpRight className="ml-1 text-base inline-block align-middle" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full h-[1px] bg-[var(--foreground)] mb-8" />
    </motion.div>
  );
}
