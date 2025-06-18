// components/Header.tsx

'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion'; // <-- THÊM useInView
import React, { useRef, useState, useEffect } from 'react'; // <-- THÊM useRef
import Image from 'next/image'; // <-- Đảm bảo đây là import đúng từ 'next/image'


const ProjectIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <g clipPath="url(#clip0_895_57899)" transform="translate(4, 4)">
    <path d="M15.0007 7.00045L8.50068 13.5005C8.10286 13.8983 7.87936 14.4378 7.87936 15.0005C7.87936 15.5631 8.10286 16.1026 8.50068 16.5005C8.8985 16.8983 9.43807 17.1218 10.0007 17.1218C10.5633 17.1218 11.1029 16.8983 11.5007 16.5005L18.0007 10.0005C18.7963 9.2048 19.2433 8.12567 19.2433 7.00045C19.2433 5.87523 18.7963 4.7961 18.0007 4.00045C17.205 3.2048 16.1259 2.75781 15.0007 2.75781C13.8755 2.75781 12.7963 3.2048 12.0007 4.00045L5.50068 10.5005C4.30721 11.6939 3.63672 13.3126 3.63672 15.0005C3.63672 16.6883 4.30721 18.307 5.50068 19.5005C6.69415 20.6939 8.31285 21.3644 10.0007 21.3644C11.6885 21.3644 13.3072 20.6939 14.5007 19.5005L21.0007 13.0005" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_895_57899">
      <rect width="32" height="32" fill="white"/>
    </clipPath>
  </defs>
</svg>
);

// Ví dụ một SVG Icon cho Skills
const SkillsIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <g clipPath="url(#clip0_894_145610)" transform="translate(4, 4)">
    <path d="M3 21V17C3 16.2089 3.2346 15.4355 3.67412 14.7777C4.11365 14.1199 4.73836 13.6072 5.46927 13.3045C6.20017 13.0017 7.00444 12.9225 7.78036 13.0769C8.55629 13.2312 9.26902 13.6122 9.82843 14.1716C10.3878 14.731 10.7688 15.4437 10.9231 16.2196C11.0775 16.9956 10.9983 17.7998 10.6955 18.5307C10.3928 19.2616 9.88008 19.8864 9.22228 20.3259C8.56448 20.7654 7.79113 21 7 21H3Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.9992 3C18.145 3.3904 15.4492 4.54414 13.1963 6.33944C10.9433 8.13474 9.21692 10.505 8.19922 13.2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21.0008 3C20.6104 5.85418 19.4566 8.55002 17.6613 10.8029C15.866 13.0559 13.4958 14.7823 10.8008 15.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.6016 9C12.5447 9.89687 14.1047 11.4568 15.0016 13.4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_894_145610">
      <rect width="32" height="32" fill="white"/>
    </clipPath>
  </defs>
</svg>


);

// Ví dụ một SVG Icon cho Experiences
const ExperiencesIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <g clipPath="url(#clip0_894_152330)" transform="translate(4, 4)">
    <path d="M12 15C12 15.7956 12.3161 16.5587 12.8787 17.1213C13.4413 17.6839 14.2044 18 15 18C15.7956 18 16.5587 17.6839 17.1213 17.1213C17.6839 16.5587 18 15.7956 18 15C18 14.2044 17.6839 13.4413 17.1213 12.8787C16.5587 12.3161 15.7956 12 15 12C14.2044 12 13.4413 12.3161 12.8787 12.8787C12.3161 13.4413 12 14.2044 12 15Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 17.5V22L15 20.5L17 22V17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7C3 5.9 3.9 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V17C20.9996 17.3507 20.9071 17.6952 20.7315 17.9988C20.556 18.3025 20.3037 18.5546 20 18.73" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 9H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 12H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 15H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_894_152330">
      <rect width="32" height="32" fill="white"/>
    </clipPath>
  </defs>
</svg>


);

// Ví dụ một SVG Icon cho Contacts
const ContactsIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <g clipPath="url(#clip0_894_140546)" transform="translate(4, 4)">
    <path d="M4 21V8C4 7.20435 4.31607 6.44129 4.87868 5.87868C5.44129 5.31607 6.20435 5 7 5H17C17.7956 5 18.5587 5.31607 19.1213 5.87868C19.6839 6.44129 20 7.20435 20 8V14C20 14.7956 19.6839 15.5587 19.1213 16.1213C18.5587 16.6839 17.7956 17 17 17H8L4 21Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 9H9.51" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5 9H14.51" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 13C9.82588 13.3326 10.2148 13.5968 10.6441 13.7772C11.0734 13.9576 11.5344 14.0505 12 14.0505C12.4656 14.0505 12.9266 13.9576 13.3559 13.7772C13.7852 13.5968 14.1741 13.3326 14.5 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_894_140546">
      <rect width="32" height="32" fill="white"/>
    </clipPath>
  </defs>
</svg>

);



export default function Header() {
  const navItems = [
     { name: 'Projects', href: '#projects-section', icon: ProjectIcon },
    { name: 'Skills', href: '#skills-section', icon: SkillsIcon },
    { name: 'Experiences', href: '#experiences-section', icon: ExperiencesIcon },
    { name: 'Contacts', href: '#contacts-section', icon: ContactsIcon },
  ];
  // Ref để theo dõi header chính
  const headerRef = useRef<HTMLElement>(null);
  // isHeaderInView sẽ là true nếu bất kỳ phần nào của header còn trong viewport
  // amount: 0 có nghĩa là khi header bắt đầu rời khỏi viewport (0% visible) thì isHeaderInView sẽ chuyển sang false
  // State để kiểm soát thuộc tính display của thanh nav nổi (chỉ dùng cho desktop)
  const isHeaderInView = useInView(headerRef, { amount: 0 });

  const [isNavVisibleDesktop, setIsNavVisibleDesktop] = useState(false);

  // State để kiểm soát xem đang ở màn hình mobile (< 768px) hay không
  const [isMobile, setIsMobile] = useState(false);

  // useEffect để cập nhật display khi animation bắt đầu/kết thúc
  React.useEffect(() => {
    // Nếu header chính không còn trong view (thanh nav nổi sẽ hiện)
    if (!isHeaderInView) {
      setIsNavVisibleDesktop(true); // Đặt display: 'block' ngay lập tức để bắt đầu animation hiện ra
    }
    // Nếu header chính trở lại view, chúng ta sẽ để animation ẩn chạy (với duration: 0)
    // Sau đó onAnimationComplete sẽ đặt setIsNavVisible(false) để display: 'none'.
  }, [isHeaderInView]);
  // useEffect để phát hiện kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      // Tailwind's 'md' breakpoint is 768px, so less than 768px is considered mobile
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state on mount
    handleResize();

    // Add event listener for window resizeF
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array means this effect runs only once on mount

  // // Định nghĩa các thuộc tính animation một cách có điều kiện
  // const navAnimateProps = isMobile
  //   ? {} // KHÔNG CÓ ANIMATION: Trên mobile, chỉ cần hiển thị cố định
  //   : {
  //     initial: { x: 'calc(100% + 20px)', opacity: 0, scaleY: 0 },
  //     animate: isHeaderInView
  //       ? { x: 'calc(100% + 20px)', opacity: 0, scaleY: 0 } // Trạng thái ẩn (dịch chuyển ra, mờ đi, thu gọn)
  //       : { x: '0%', opacity: 1, scaleY: 1 }, // Trạng thái hiện (dịch chuyển vào, rõ, mở rộng)
  //     transition: isHeaderInView ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }, // Ẩn tức thì, hiện có animation
  //     onAnimationComplete: () => {
  //       // Khi animation kết thúc (chỉ trên desktop), nếu header đang trong view, nghĩa là nav nổi đã ẩn hoàn toàn
  //       if (isHeaderInView) {
  //         setIsNavVisibleDesktop(false); // Đặt display: 'none' để loại bỏ khỏi luồng tài liệu
  //       }
  //     }

  //   };
  return (
    <>
      <header
        ref={headerRef} // <-- Gán ref cho header chính
        className=" w-full bg-white py-12  top-0 left-0 z-50 ">
        <nav className="flex items-center justify-between w-full text-[var(--foreground)]">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/logo.svg" alt="Loi Tran Logo" className="h-16 w-auto flex-shrink-0" />
          </Link>
          <div className="flex items-center flex-grow ml-[128px]">

            <ul className="hidden md:flex space-x-[64px]">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    // THÊM inline-flex VÀ items-center VÀO ĐÂY
                    className="relative text-[16px] font-fragment-mono transition-colors duration-200 inline-flex overflow-hidden group h-[20px] leading-[20px] items-center" // <-- Đã thêm inline-flex và items-center
                  >
                    {/* Các span này vẫn giữ block để đảm bảo translate-y-full hoạt động đúng */}
                    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      {item.name}
                    </span>
                    <span className="block absolute top-full left-0 transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center ml-auto">
              <a
                href="mailto:work.loitran@example.com"
                className="text-[16px] font-fragment-mono text-[#1E1E1E] email-link-underline"
              >
                work.loitran@gmail.com
              </a>
            </div>
          </div>
        </nav>
      </header>
      {/* THANH ĐIỀU HƯỚNG NỔI BÊN PHẢI */}
      <motion.nav
       
        style={{ display: isMobile ? 'block' : (isNavVisibleDesktop ? 'block' : 'none'), transformOrigin: 'center center', transform: 'translateZ(0)',
         
         }}
        initial={{ x: 'calc(100% + 20px)', opacity: 0, scaleY: 0 }} // <-- ĐÃ SỬA: Bắt đầu ẩn hoàn toàn (dịch chuyển + mờ + thu gọn)
        // animate: Nếu header trong viewport thì ẩn (dịch chuyển ra, mờ đi, thu gọn), ngược lại thì hiện (dịch chuyển vào, rõ, mở rộng)
        animate={isHeaderInView
          ? { x: 'calc(100% + 20px)', opacity: 0, scaleY: 0 } // <-- ĐÃ SỬA: Trạng thái ẩn
          : { x: '0%', opacity: 1, scaleY: 1 } // <-- ĐÃ SỬA: Trạng thái hiện
        }
        className="fixed right-0 top-1/2 transform -translate-y-1/2
                   bg-black text-white   z-40  rounded-[40px] mr-5.5
                    md:block"

      >
        <ul className="flex flex-col space-y-8 px-2 py-3 ">
          {navItems.map((item) => (
            <li key={`floating-${item.name}`}>
              <motion.a
                href={item.href}
                className="text-white text-[16px] font-fragment-mono text-right flex items-center justify-end
                "
                whileHover={{ scale: 1.4, rotateY: 180 }} // <-- ĐÃ SỬA: rotate: 360 thành rotateY: 180
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
               <item.icon className="text-2xl" />
              </motion.a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
}