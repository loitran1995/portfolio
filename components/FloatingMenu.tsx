// components/FloatingMenu.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

// --- SVG Icons ---
// Bạn có thể cân nhắc di chuyển các icon này vào một file riêng (ví dụ: `components/Icons.tsx`)
// nếu bạn sử dụng chúng ở nhiều nơi để tránh trùng lặp.
// Để đơn giản cho ví dụ này, tôi sẽ giữ chúng trong FloatingMenu.tsx.
// Lưu ý: Đã đổi ID clipPath để tránh xung đột nếu các icon này cũng tồn tại trong Header.tsx.
const ProjectIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_floating_project_icon)" transform="translate(4, 4)">
      <path
        d="M15.0007 7.00045L8.50068 13.5005C8.10286 13.8983 7.87936 14.4378 7.87936 15.0005C7.87936 15.5631 8.10286 16.1026 8.50068 16.5005C8.8985 16.8983 9.43807 17.1218 10.0007 17.1218C10.5633 17.1218 11.1029 16.8983 11.5007 16.5005L18.0007 10.0005C18.7963 9.2048 19.2433 8.12567 19.2433 7.00045C19.2433 5.87523 18.7963 4.79610 18.0007 4.00045C17.205 3.2048 16.1259 2.75781 15.0007 2.75781C13.8755 2.75781 12.7963 3.2048 12.0007 4.00045L5.50068 10.5005C4.30721 11.6939 3.63672 13.3126 3.63672 15.0005C3.63672 16.6883 4.30721 18.3070 5.50068 19.5005C6.69415 20.6939 8.31285 21.3644 10.0007 21.3644C11.6885 21.3644 13.3072 20.6939 14.5007 19.5005L21.0007 13.0005"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_floating_project_icon">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const SkillsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_floating_skills_icon)" transform="translate(4, 4)">
      <path
        d="M3 21V17C3 16.2089 3.2346 15.4355 3.67412 14.7777C4.11365 14.1199 4.73836 13.6072 5.46927 13.3045C6.20017 13.0017 7.00444 12.9225 7.78036 13.0769C8.55629 13.2312 9.26902 13.6122 9.82843 14.1716C10.3878 14.7310 10.7688 15.4437 10.9231 16.2196C11.0775 16.9956 10.9983 17.7998 10.6955 18.5307C10.3928 19.2616 9.88008 19.8864 9.22228 20.3259C8.56448 20.7654 7.79113 21 7 21H3Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.9992 3C18.145 3.3904 15.4492 4.54414 13.1963 6.33944C10.9433 8.13474 9.21692 10.5050 8.19922 13.2"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.0008 3C20.6104 5.85418 19.4566 8.55002 17.6613 10.8029C15.866 13.0559 13.4958 14.7823 10.8008 15.8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6016 9C12.5447 9.89687 14.1047 11.4568 15.0016 13.4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_floating_skills_icon">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ExperiencesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_floating_experiences_icon)" transform="translate(4, 4)">
      <path
        d="M12 15C12 15.7956 12.3161 16.5587 12.8787 17.1213C13.4413 17.6839 14.2044 18 15 18C15.7956 18 16.5587 17.6839 17.1213 17.1213C17.6839 16.5587 18 15.7956 18 15C18 14.2044 17.6839 13.4413 17.1213 12.8787C16.5587 12.3161 15.7956 12 15 12C14.2044 12 13.4413 12.3161 12.8787 12.8787C12.3161 13.4413 12 14.2044 12 15Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 17.5V22L15 20.5L17 22V17.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7C3 5.9 3.9 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V17C20.9996 17.3507 20.9071 17.6952 20.7315 17.9988C20.556 18.3025 20.3037 18.5546 20 18.73"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 9H18"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 12H9"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 15H8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_floating_experiences_icon">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ContactsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_floating_contacts_icon)" transform="translate(4, 4)">
      <path
        d="M4 21V8C4 7.20435 4.31607 6.44129 4.87868 5.87868C5.44129 5.31607 6.20435 5 7 5H17C17.7956 5 18.5587 5.31607 19.1213 5.87868C19.6839 6.44129 20 7.20435 20 8V14C20 14.7956 19.6839 15.5587 19.1213 16.1213C18.5587 16.6839 17.7956 17 17 17H8L4 21Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 9H9.51"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 9H14.51"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 13C9.82588 13.3326 10.2148 13.5968 10.6441 13.7772C11.0734 13.9576 11.5344 14.0505 12 14.0505C12.4656 14.0505 12.9266 13.9576 13.3559 13.7772C13.7852 13.3326 14.1741 13.0684 14.5 13"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_floating_contacts_icon">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
// --- Hết các SVG Icons ---

// Định nghĩa interface cho props của FloatingMenu
interface FloatingMenuProps {
  isHeaderInView: boolean; // Prop này sẽ được truyền từ Header để kiểm soát visibility
  isMobile: boolean; // Prop này để kiểm soát hiển thị trên mobile
}

export default function FloatingMenu({ isHeaderInView, isMobile }: FloatingMenuProps) {
  const navItems = [
    { name: "Projects", href: "#projects-section", icon: ProjectIcon },
    { name: "Skills", href: "#skills-section", icon: SkillsIcon },
    {
      name: "Experiences",
      href: "#experiences-section",
      icon: ExperiencesIcon,
    },
    { name: "Contacts", href: "#contacts-section", icon: ContactsIcon },
  ];

  return (
    <motion.nav
      style={{
        // Trên mobile, menu luôn hiển thị (display: block).
        // Trên desktop, menu hiển thị khi Header không còn trong view (isHeaderInView là false).
        display: isMobile ? "block" : !isHeaderInView ? "block" : "none",
        transformOrigin: "center center",
        transform: "translateZ(0)",
      }}
      initial={{ x: "calc(100% + 20px)", opacity: 0, scaleY: 0 }} // Trạng thái ẩn ban đầu
      animate={
        isMobile // Trên mobile, menu luôn ở trạng thái hiện
          ? { x: "0%", opacity: 1, scaleY: 1 }
          : isHeaderInView // Trên desktop, nếu Header đang trong view, ẩn menu
          ? { x: "calc(100% + 20px)", opacity: 0, scaleY: 0 }
          : { x: "0%", opacity: 1, scaleY: 1 } // Nếu Header không trong view, hiện menu
      }
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="fixed right-0 top-1/2 transform -translate-y-1/2
                   bg-black text-white z-40 rounded-[40px] mr-5.5
                   md:block" // md:block để đảm bảo nó hiển thị trên màn hình trung bình trở lên
    >
      <ul className="flex flex-col space-y-8 px-2 py-3 ">
        {navItems.map((item) => (
          <li key={`floating-${item.name}`}>
            <motion.a
              href={item.href}
              className="text-white text-[16px] font-fragment-mono text-right flex items-center justify-end"
              whileHover={{ scale: 1.4, rotateY: 180 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <item.icon className="text-2xl" />
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}