// context/ScrollContext.tsx
"use client"; // Đảm bảo đây là Client Component

import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { useScroll, useSpring, MotionValue } from 'framer-motion';

// Định nghĩa kiểu dữ liệu cho Context
interface ScrollContextType {
  scrollYProgress: MotionValue<number>;
  // Nếu bạn cần scrollY hoặc các giá trị khác
  // scrollY: MotionValue<number>;
}

// Tạo Context với giá trị mặc định là undefined (sẽ được cung cấp sau)
const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// Hook tùy chỉnh để sử dụng Context
export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
};

// Provider component
interface ScrollProviderProps {
  children: ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  // Tạo ref cho phần tử muốn theo dõi cuộn (mặc định là window)
  const containerRef = useRef(null);

  // useScroll sẽ lắng nghe cuộn của window nếu target không được chỉ định
  // hoặc của containerRef nếu bạn có một container cuộn cụ thể
  const { scrollYProgress } = useScroll({ target: containerRef }); // Target window (body)

  // Bạn có thể làm mượt scrollYProgress nếu muốn
  const springScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const value = {
    scrollYProgress: springScrollYProgress,
    // scrollY: scrollY // Nếu bạn cần giá trị pixel thực tế của cuộn
  };

  return (
    <ScrollContext.Provider value={value}>
      {/* Bạn có thể đặt containerRef vào <body> hoặc một div bao quanh nội dung
        Nếu bạn muốn cuộn của toàn bộ trang (window), bạn không cần gắn ref này vào DOM.
        useScroll mặc định lắng nghe window nếu target là null/undefined.
        Tuy nhiên, gắn vào một ref vào một div bao bọc có thể kiểm soát tốt hơn trên một số môi trường.
      */}
      <div ref={containerRef} style={{ height: '100%', overflowY: 'auto' }}>
        {children}
      </div>
    </ScrollContext.Provider>
  );
}