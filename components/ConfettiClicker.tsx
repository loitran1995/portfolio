// components/ConfettiClicker.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, Variants, Transition, Easing } from "framer-motion";

interface LineEffect {
  id: number;
  startX: number;
  startY: number;
  midX: number;
  midY: number;
  endX: number;
  endY: number;
  rotationDeg: number;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function ConfettiClicker() {
  const [lines, setLines] = useState<LineEffect[]>([]);
  const lineIdCounter = useRef(0);

  const LINE_WIDTH = 10;
  const LINE_HEIGHT = 5;

  // Đổi màu dựa trên độ sáng
  const getBrightness = (bgColor: string) => {
    const match = bgColor.match(/\d+/g);
    if (!match || match.length < 3) return 255;
    const [r, g, b] = match.map(Number);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

 const getRealBackgroundColor = (el: Element | null, fallbackPoint: { x: number; y: number }): string => {
  // Nếu element không có background rõ ràng, tiếp tục tìm lên cha
  while (el) {
    const style = getComputedStyle(el);
    const bg = style.backgroundColor;
    const display = style.display;

    if (
      (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") &&
      display !== "inline" // tránh những phần tử inline như <span>
    ) {
      return bg;
    }
    el = el.parentElement;
  }

  // Fallback: dò phần tử bên dưới tại điểm x, y
  const below = document.elementFromPoint(fallbackPoint.x, fallbackPoint.y);
  if (below && below !== document.body) {
    const bg = getComputedStyle(below).backgroundColor;
    if (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
  }

  // Nếu vẫn không có, coi như nền trắng
  return "rgb(255, 255, 255)";
};

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      const angles = [
        Math.PI,
        (15 * Math.PI) / 12,
        (3 * Math.PI) / 2,
        (7 * Math.PI) / 4,
      ];
      const initialEjectOffset = 20;
      const radialOffset = 30;

      const newLines: LineEffect[] = [];
      angles.forEach((angleRad) => {
        const mid_x = clickX + initialEjectOffset * Math.cos(angleRad);
        const mid_y = clickY + initialEjectOffset * Math.sin(angleRad);
        const end_x = clickX + radialOffset * Math.cos(angleRad);
        const end_y = clickY + radialOffset * Math.sin(angleRad);
        const rotationDeg = angleRad * (180 / Math.PI);

        newLines.push({
          id: lineIdCounter.current++,
          startX: clickX,
          startY: clickY,
          midX: mid_x,
          midY: mid_y,
          endX: end_x,
          endY: end_y,
          rotationDeg,
          ref: React.createRef<HTMLDivElement>(),
        });
      });
      setLines((prevLines) => [...prevLines, ...newLines]);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const updateColors = () => {
      lines.forEach((line) => {
        const el = line.ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const underElem = document.elementFromPoint(centerX, centerY);
        const bg = getRealBackgroundColor(underElem, {
          x: centerX,
          y: centerY,
        });
        const brightness = getBrightness(bg);
        el.style.backgroundColor = brightness < 128 ? "#fff" : "#000";
      });
      requestAnimationFrame(updateColors);
    };
    requestAnimationFrame(updateColors);
  }, [lines]);

  const lineVariants: Variants = {
    initial: (line: LineEffect) => ({
      opacity: 0,
      x: line.startX - LINE_WIDTH / 2,
      y: line.startY - LINE_HEIGHT / 2,
      rotate: line.rotationDeg,
      scaleX: 0,
      scaleY: 0,
    }),
    animate: (line: LineEffect) => ({
      opacity: [0, 1, 1],
      x: [
        line.startX - LINE_WIDTH / 2,
        line.midX - LINE_WIDTH / 2,
        line.endX - LINE_WIDTH / 2,
      ],
      y: [
        line.startY - LINE_HEIGHT / 2,
        line.midY - LINE_HEIGHT / 2,
        line.endY - LINE_HEIGHT / 2,
      ],
      rotate: line.rotationDeg,
      scaleX: [0, 1, 0],
      scaleY: [0, 1, 0],
      transition: {
        duration: 0.4,
        ease: "easeOut" as Easing,
        times: [0, 0.2, 1],
      } as Transition,
    }),
  };

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 10000,
        isolation: "isolate",
        background: "transparent",
      }}
    >
      {lines.map((line) => (
        <motion.div
          key={line.id}
          ref={line.ref}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${LINE_WIDTH}px`,
            height: `${LINE_HEIGHT}px`,
            backgroundColor: "#000", // sẽ được ghi đè động
            transformOrigin: "50% 50%",
            mixBlendMode: "difference",

          }}
          variants={lineVariants}
          initial="initial"
          animate="animate"
          custom={line}
          onAnimationComplete={() => {
            setLines((prevLines) => prevLines.filter((l) => l.id !== line.id));
          }}
        />
      ))}
    </div>
  );
}
