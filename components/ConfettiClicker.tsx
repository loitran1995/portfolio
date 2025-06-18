// components/ConfettiClicker.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
// THÊM Variants, Transition, Easing VÀO IMPORT
import { motion, Variants, Transition, Easing } from "framer-motion";

// Định nghĩa interface cho mỗi gạch
interface LineEffect {
  id: number;
  startX: number; // Tọa độ X tuyệt đối của điểm bắt đầu (điểm click)
  startY: number; // Tọa độ Y tuyệt đối của điểm bắt đầu (điểm click)
  midX: number; // Tọa độ X tuyệt đối của điểm giữa (nơi gạch xuất hiện)
  midY: number; // Tọa độ Y tuyệt đối của điểm giữa (nơi gạch xuất hiện)
  endX: number; // Tọa độ X tuyệt đối của điểm kết thúc (bắn ra xa)
  endY: number; // Tọa độ Y tuyệt đối của điểm kết thúc (bắn ra xa)
  rotationDeg: number; // Góc quay của gạch theo độ để nó hướng ra ngoài
}

export default function ConfettiClicker() {
  // State để lưu trữ các gạch hiện tại
  const [lines, setLines] = useState<LineEffect[]>([]);
  const lineIdCounter = useRef(0);; // Bộ đếm để tạo ID duy nhất cho mỗi gạch

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX; // Vị trí click chuột (điểm bắt đầu của gạch)
      const clickY = e.clientY;

      // Các góc (tính bằng radian) để bắn lên trên và sang trái
      // Góc phần tư thứ 2 (90 - 180 độ) sẽ là lên trên và sang trái trong toán học, nhưng trong hệ tọa độ màn hình
      // Y tăng xuống dưới, nên chúng ta cần góc phần tư thứ 3 (180 - 270 độ) để Y giảm (đi lên)
      const angles = [
        Math.PI, // 9 o'clock (180 độ - thẳng trái)
        (15 * Math.PI) / 12, // 11.5 o'clock (255 độ - lên trên và trái)
        (3 * Math.PI) / 2, // 12 o'clock (270 độ - thẳng lên trên)
        (7 * Math.PI) / 4, // 1.5 o'clock (315 độ - lên trên và phải)
      ];
      const initialEjectOffset = 20; // Khoảng cách gạch di chuyển trước khi hiện rõ
      const radialOffset = 30; // Khoảng cách từ điểm click đến điểm kết thúc của gạch

      const newLines: LineEffect[] = [];
      angles.forEach((angleRad) => {
        // Tính toán điểm giữa (mid point) - nơi gạch hiện rõ và bắt đầu co lại
        const mid_x = clickX + initialEjectOffset * Math.cos(angleRad);
        const mid_y = clickY + initialEjectOffset * Math.sin(angleRad);

        // Tính toán điểm kết thúc của gạch (end point)
        const end_x = clickX + radialOffset * Math.cos(angleRad);
        const end_y = clickY + radialOffset * Math.sin(angleRad);

        // Góc quay của gạch để nó hướng thẳng từ điểm bắt đầu (click) đến điểm kết thúc (end point)
        const rotationDeg = angleRad * (180 / Math.PI);

        newLines.push({
          id: lineIdCounter.current++,
          startX: clickX,
          startY: clickY,
          midX: mid_x,
          midY: mid_y,
          endX: end_x,
          endY: end_y,
          rotationDeg: rotationDeg, // Lưu trữ góc quay ban đầu
        });
      });
      setLines((prevLines) => [...prevLines, ...newLines]);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []); // Chỉ chạy một lần khi mount

  // Kích thước cố định của gạch
  const LINE_WIDTH = 10; // Chiều dài gạch
  const LINE_HEIGHT = 5; // Độ dày gạch

  // Variants cho animation của mỗi gạch
  const lineVariants: Variants = {
    initial: (line: LineEffect) => ({
      opacity: 0, // Bắt đầu hoàn toàn ẩn
      x: line.startX - LINE_WIDTH / 2, // Bắt đầu tại tâm click
      y: line.startY - LINE_HEIGHT / 2, // Bắt đầu tại tâm click
      rotate: line.rotationDeg, // Áp dụng góc quay ban đầu
      scaleX: 0, // Bắt đầu thu nhỏ hoàn toàn
      scaleY: 0, // Bắt đầu thu nhỏ hoàn toàn
    }),
    animate: (line: LineEffect) => ({
      opacity: [0, 1, 1], // Keyframes cho độ mờ: ẩn (0%) -> hiện (20%) -> giữ nguyên độ mờ (100%)
      // Di chuyển X/Y: từ start -> mid -> end
      x: [
        line.startX - LINE_WIDTH / 2, // Vị trí 0%
        line.midX - LINE_WIDTH / 2, // Vị trí 20% (khi gạch hiện rõ và đạt kích thước đầy đủ)
        line.endX - LINE_WIDTH / 2, // Vị trí 100%
      ],
      y: [
        line.startY - LINE_HEIGHT / 2, // Vị trí 0%
        line.midY - LINE_HEIGHT / 2, // Vị trí 20%
        line.endY - LINE_HEIGHT / 2, // Vị trí 100%
      ],
      rotate: line.rotationDeg, // Giữ nguyên góc quay
      scaleX: [0, 1, 0], // Keyframes cho scaleX: nhỏ (0%) -> đầy đủ (20%) -> biến mất (100%)
      scaleY: [0, 1, 0], // Keyframes cho scaleY: nhỏ (0%) -> đầy đủ (20%) -> biến mất (100%)
      transition: {
        duration: 0.4, // Tổng thời gian animation
        ease: "easeOut" as Easing,
        times: [0, 0.2, 1], // Thời điểm tương ứng cho mỗi keyframe (0%, 20%, 100% của duration)
      } as Transition,
    }),
  };

  // Component này sẽ render các gạch
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
    >
      {lines.map((line) => (
        <motion.div
          key={line.id}
          // Đặt vị trí top-left của phần tử tại (0,0) của viewport
          // Sau đó Framer Motion sẽ dùng x/y để định vị chính xác
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: `${LINE_WIDTH}px`,
            height: `${LINE_HEIGHT}px`,
            backgroundColor: "black",
            transformOrigin: "50% 50%", // Quan trọng cho việc xoay và scale xung quanh tâm của chính nó
            mixBlendMode: "difference", // <-- THÊM DÒNG NÀY ĐỂ TẠO HIỆU ỨNG REVERT
          }}
          variants={lineVariants}
          initial="initial"
          animate="animate"
          custom={line} // Truyền toàn bộ đối tượng line làm custom prop cho variants
          onAnimationComplete={() => {
            // Xóa gạch khỏi state sau khi animation hoàn tất
            setLines((prevLines) => prevLines.filter((l) => l.id !== line.id));
          }}
        />
      ))}
    </div>
  );
}
