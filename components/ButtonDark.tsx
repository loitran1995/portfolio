// components/ButtonDark.tsx (hoặc tên file của bạn)
"use client";

import {
  motion,
  Variants,
  Transition,
  Easing,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";
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

  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 10, stiffness: 1000, mass: 0.5 };

  const x = useSpring(useTransform(mouseX, (val) => val * 0.8), springConfig);
  const y = useSpring(useTransform(mouseY, (val) => val * 0.8), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled) return;

    const currentRef = href ? anchorRef.current : buttonRef.current;

    if (!currentRef) return;

    const { left, top, width, height } = currentRef.getBoundingClientRect();
    const xPos = e.clientX - (left + width / 2);
    const yPos = e.clientY - (top + height / 2);

    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const baseStyles = `
    inline-flex items-center justify-center
    font-poppins text-base font-normal
    py-4 px-3
    rounded-full
    transition-all duration-300 ease-in-out
    whitespace-nowrap
    text-white
    border border-[1px]
    border-white
    hover:text-black
    hover:bg-white
    hover:border-transparent
    overflow-hidden
    width: fit-content;
  `;

  const iconSpacing = "ml-4";
  const iconContainerStyles = `
    flex items-center justify-center
    w-8 h-8
    rounded-full
    text-[20px]
+   bg-white /* Màu nền icon mặc định là trắng */
+   text-black /* Màu chữ icon mặc định là đen */
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

  const commonProps = {
    onClick: onClick,
    className: allClassNames,
    disabled: disabled,
    variants: buttonVariants,
    initial: "hidden",
    animate: "visible",
    whileHover: disabled ? {} : "hover",
    whileTap: { scale: disabled ? 1 : 0.95 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x, y },
    onHoverStart: async () => {
      if (disabled) return;
      await iconColorControls.stop();
     iconColorControls.set({ backgroundColor: "white", color: "black" }); // Lỗi: Đang set ngược màu khởi tạo
     // Khi hover bắt đầu: background icon đen, chữ icon trắng
     iconColorControls.start(
       { backgroundColor: "black", color: "white" },
       { duration: 0.2 }
     );
    },
    onHoverEnd: () => {
      if (disabled) return;
      iconColorControls.stop();
    iconColorControls.set({ backgroundColor: "black", color: "white" }); // Lỗi: Đang set màu hover khi kết thúc hover
     // Khi hover kết thúc: background icon trắng, chữ icon đen
     iconColorControls.set({ backgroundColor: "white", color: "black" });
    },
  };

  const renderInnerContent = () => (
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
  );

  if (href) {
    return (
      <motion.a
        ref={anchorRef}
        href={href}
        {...commonProps}
      >
        {renderInnerContent()}
      </motion.a>
    );
  } else {
    return (
      <motion.button
        ref={buttonRef}
        type={type}
        {...commonProps}
      >
        {renderInnerContent()}
      </motion.button>
    );
  }
}