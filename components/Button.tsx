"use client";

import { motion, Variants, Transition, Easing, useAnimation } from "framer-motion";
import React from "react";
import { LuArrowUpRight } from "react-icons/lu";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ANIMATION_DURATION = 1.0;
const EASE_TYPE = "easeInOut";

const buttonVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: EASE_TYPE as Easing,
      delayChildren: 0.1,
    } as Transition,
  },
  hover: {
    rotate: [0, 2, -2, 2, -2, 0], // Subtle shake effect
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      repeat: 0,
    } as Transition,
  },
};

const textWrapperVariants: Variants = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION,
      ease: EASE_TYPE as Easing,
      staggerChildren: 0.05,
      delayChildren: ANIMATION_DURATION * 0.2,
    } as Transition,
  },
};

const iconVariants: Variants = {
  hidden: { x: -80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION * 0.7,
      ease: EASE_TYPE as Easing,
      delay: ANIMATION_DURATION * 0.1,
    } as Transition,
  },
};

const textCharVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: EASE_TYPE as Easing } as Transition,
  },
};

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
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const iconColorControls = useAnimation();

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

  const iconSpacing = "ml-4";
  const iconContainerStyles = `
    flex items-center justify-center
    w-8 h-8
    bg-black
    rounded-full
    text-white
    text-[20px]
  `;

  const allClassNames = `${baseStyles} ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  const animatedChildren =
    typeof children === "string" ? (
      <motion.span variants={textWrapperVariants} className="inline-block">
        {splitTextToCharacters(children)}
      </motion.span>
    ) : (
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
      whileHover={disabled ? {} : "hover"} // Apply hover variant only if not disabled
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onHoverStart={async () => {
        await iconColorControls.stop();
        iconColorControls.set({ backgroundColor: "black", color: "white" });
        iconColorControls.start({ backgroundColor: "white", color: "black" }, { duration: 0.2 });
      }}
      onHoverEnd={() => {
        iconColorControls.stop();
        iconColorControls.set({ backgroundColor: "black", color: "white" });
      }}
    >
      <div className="inline-flex items-center justify-center h-full w-full">
        {animatedChildren}
        <motion.span
          variants={iconVariants}
          className={`${iconSpacing} ${iconContainerStyles}`}
          animate={iconColorControls}
          transition={{ duration: 0.2 }}
        >
          <LuArrowUpRight />
        </motion.span>
      </div>
    </MotionComponent>
  );
}