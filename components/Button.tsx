// components/Button.tsx
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
  variant?: "light" | "dark";
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
  variant = "light",
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

  const getButtonStyles = (currentVariant: "light" | "dark") => {
    if (currentVariant === "dark") {
      // Styles cho nền tối (tức là ButtonDark cũ)
      return `
        inline-flex items-center justify-center
        font-poppins text-base font-normal
        py-4 px-3
        rounded-full
        transition-all duration-300 ease-in-out
        whitespace-nowrap
       text-white                 /* Chưa hover: chữ trắng */
        border border-[1px]
       border-white               /* Chưa hover: viền trắng */
        hover:text-black           /* Chữ đen khi hover */
        hover:bg-white             /* Nền trắng khi hover */
        hover:border-transparent   /* Khi hover: viền biến mất */
        overflow-hidden
        width: fit-content;
      `;
    } else {
      // Styles cho nền sáng (tức là Button cũ) - mặc định
      return `
        inline-flex items-center justify-center
        font-poppins text-base font-normal
        py-4 px-3
        rounded-full
        transition-all duration-300 ease-in-out
        whitespace-nowrap
       text-black                 /* Chưa hover: chữ đen */
        border border-[1px]
       border-black               /* Chưa hover: viền đen */
        hover:text-white           /* Chữ trắng khi hover */
        hover:bg-black             /* Nền đen khi hover */
        hover:border-transparent   /* Khi hover: viền biến mất */
        overflow-hidden
        width: fit-content;
      `;
    }
  };

  const getIconContainerStyles = (currentVariant: "light" | "dark") => {
    if (currentVariant === "dark") {
      // Styles cho icon trên nền tối (ButtonDark cũ)
      return `
        flex items-center justify-center
        w-8 h-8
        rounded-full
        text-[20px]
        bg-white               /* Nền trắng mặc định */
        text-black             /* Chữ đen mặc định */
      `;
    } else {
      // Styles cho icon trên nền sáng (Button cũ) - mặc định
      return `
        flex items-center justify-center
        w-8 h-8
        rounded-full
        text-[20px]
        bg-black              /* Nền đen mặc định */
        text-white            /* Chữ trắng mặc định */
      `;
    }
  };

  const allClassNames = `${getButtonStyles(variant)} ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  const iconSpacing = "ml-4";
  const iconContainerClassNames = getIconContainerStyles(variant);


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

  // Logic màu icon cho hover
  const iconHoverStartColors = variant === "dark" ? { backgroundColor: "black", color: "white" } : { backgroundColor: "white", color: "black" };
  const iconHoverEndColors = variant === "dark" ? { backgroundColor: "white", color: "black" } : { backgroundColor: "black", color: "white" };


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
      iconColorControls.start(
        iconHoverStartColors, // Sử dụng màu động
        { duration: 0.2 }
      );
    },
    onHoverEnd: () => {
      if (disabled) return;
      iconColorControls.stop();
      iconColorControls.set(iconHoverEndColors); // Sử dụng màu động
    },
  };

  const renderInnerContent = () => (
    <div className="inline-flex items-center justify-center h-full w-full">
      {animatedChildren}
      <motion.span
        variants={iconVariants}
        className={`${iconSpacing} ${iconContainerClassNames}`}
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