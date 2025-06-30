"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
// import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

// ============================================
// FloatingDock
// ============================================

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
    size: { default: number; hover: number };
  }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

// ============================================
// FloatingDockMobile
// ============================================

export const FloatingDockMobile = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
    size: { default: number; hover: number };
  }[];
  className?: string;
}) => {
  return (
    <div className={cn("fixed top-1/2 left-0 -translate-y-1/2 z-50 px-2 md:hidden", className)}>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.title}>
            <a
              href={item.href}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
            >
              <div
                style={{
                  width: item.size.default,
                  height: item.size.default,
                }}
                className="flex items-center justify-center"
              >
                {item.icon}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// FloatingDockDesktop
// ============================================

export const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
    size: { default: number; hover: number };
  }[];
  className?: string;
}) => {
  const mouseY = useMotionValue(Infinity);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (nearBottom && !bounce) {
        setBounce(true);
        setTimeout(() => setBounce(false), 400);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [bounce]);

  return (
    <motion.div
      style={{
        width: "56px",
        transformOrigin: "center center",
        transform: "translateZ(0)",
      }}
      initial={{ x: "calc(100% + 20px)", opacity: 0, scaleY: 0 }}
      animate={{ x: "0%", opacity: 1, scaleY: 1, y: bounce ? -10 : 0 }}
      exit={{
        x: "calc(100% + 20px)",
        opacity: 0,
        scaleY: 0,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
      transition={{
        x: { type: "spring", stiffness: 200, damping: 20 },
        opacity: { duration: 0.4, ease: "easeOut" },
        scaleY: { type: "spring", stiffness: 200, damping: 20 },
        y: { type: "spring", stiffness: 400, damping: 10 },
      }}
      onMouseMove={(e) => mouseY.set(e.clientY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className={cn(
        "hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 flex-col items-center gap-3 bg-black/70 backdrop-blur-md py-4 rounded-xl shadow-xl z-50 mr-0 md:mr-5 will-change-transform",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer key={item.title} mouseY={mouseY} {...item} />
      ))}
    </motion.div>
  );
};

// ============================================
// IconContainer
// ============================================

const IconContainer = React.memo(function IconContainer({
  mouseY,
  title,
  icon,
  href,
  size,
}: {
  mouseY: MotionValue<number>;
  title: string;
  icon: React.ReactNode;
  href: string;
  size: { default: number; hover: number };
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    const centerY = bounds.top + bounds.height / 2;
    return val - centerY;
  });

  const containerSize = useSpring(
    useTransform(distance, [-120, 0, 120], [40, 64, 40]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  const iconSize = useSpring(
    useTransform(distance, [-120, 0, 120], [size.default, size.hover, size.default]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  const isHovering = useTransform(distance, (d) => Math.abs(d) < 40);
  const [hovered, setHovered] = useState(false);

  useMotionValueEvent(isHovering, "change", (v) => setHovered(v));

  return (
    <a href={href} className="relative">
      <motion.div
        ref={ref}
        style={{ width: containerSize, height: containerSize }}
        className="aspect-square flex items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800 will-change-transform hover:text-black"
      >
        <motion.div
          style={{ width: iconSize, height: iconSize }}
          className="flex items-center justify-center max-w-full max-h-full"
        >
          {icon}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-[-8px] top-1/2 -translate-y-1/2 -translate-x-full whitespace-nowrap rounded px-2 py-0.5 text-xs border text-neutral-700 border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-700 dark:text-white shadow"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
});
