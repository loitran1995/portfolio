// components/Header.tsx

"use client";

import Link from "next/link";
// import { motion, useInView, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";

export default function Header({
  forwardedRef,
}: {
  forwardedRef?: React.Ref<HTMLElement>;
}) {
  const navItems = [
    {
      name: "Home",
      href: "#", // hoặc bạn có thể để href: "#"
      icon: () => (
        <Image
          src="/images/header-home.svg"
          alt="Home"
          width={24}
          height={24}
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      ),
    },
    {
      name: "Contacts",
      href: "#contacts-section",
      icon: () => (
        <Image
          src="/images/header-contacts.svg"
          alt="Contacts"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "Projects",
      href: "#projects-section",
      icon: () => (
        <Image
          src="/images/header-prj.svg"
          alt="Projects"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "Experiences",
      href: "#experiences-section",
      icon: () => (
        <Image
          src="/images/header-exp.svg"
          alt="Experiences"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "Skills",
      href: "#skills-section",
      icon: () => (
        <Image
          src="/images/header-skills.svg"
          alt="Skills"
          width={24}
          height={24}
        />
      ),
    },

    {
      name: "Logofolio",
      href: "#logofolio-section",
      icon: () => (
        <Image
          src="/images/header-logofolio.svg"
          alt="Logofolio"
          width={24}
          height={24}
        />
      ),
    },
  ];
  // Thêm vào phần đầu file
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("work.loitran@gmail.com");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000); // Sau 2s sẽ reset lại trạng thái
  };

  // const headerRef = useRef<HTMLElement>(null);

  const [itemStates, setItemStates] = useState<{ [key: string]: boolean }>(
    navItems.reduce((acc, item) => ({ ...acc, [item.name]: false }), {})
  );

  const timeoutRefs = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  const CHARACTER_DELAY = 0.03;
  const ANIMATION_DURATION_FORWARD = 0.3;
  const ANIMATION_DURATION_REVERSE = 0.3;
  const DELAY_BEFORE_REVERSE_ANIMATION_START = 0.1;

  const handleMouseEnter = useCallback((itemName: string) => {
    if (timeoutRefs.current[itemName]) {
      clearTimeout(timeoutRefs.current[itemName]!);
      timeoutRefs.current[itemName] = null;
    }
    setItemStates((prev) => ({ ...prev, [itemName]: true }));
  }, []);

  const handleMouseLeave = useCallback((itemName: string) => {
    const totalForwardAnimationDuration =
      (itemName.length > 0 ? (itemName.length - 1) * CHARACTER_DELAY : 0) +
      ANIMATION_DURATION_FORWARD;

    timeoutRefs.current[itemName] = setTimeout(() => {
      setItemStates((prev) => ({ ...prev, [itemName]: false }));
    }, (totalForwardAnimationDuration + DELAY_BEFORE_REVERSE_ANIMATION_START) * 1000);
  }, []);

  return (
    <>
      <header
        ref={forwardedRef}
        className="w-full  py-12 top-0 left-0 z-50 px-12 md:px-24"
      >
        <nav className="flex items-center justify-between w-full text-[var(--foreground)] mx-auto md:mx-0">
          <div className="flex flex-1 items-center justify-center md:justify-between mx-auto md:mx-0">
            <Link
              href="/"
              className="flex items-center flex-shrink-0 mx-auto md:mx-0"
            >
              <Image
                src="/logo.svg"
                alt="Loi Tran Logo"
                width={80}
                height={64}
                className="h-16 "
              />
            </Link>
            <div className="flex items-center flex-grow ml-[128px]">
              <ul className="hidden md:flex space-x-[64px]">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[16px] font-fragment-mono transition-colors duration-200 h-[20px] leading-[20px] flex"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={() => handleMouseLeave(item.name)}
                    >
                      {item.name.split("").map((char, index) => {
                        const isHovered = itemStates[item.name];
                        return (
                          <span
                            key={index}
                            className="inline-block relative h-[20px] overflow-hidden"
                          >
                            <span
                              className="block ease-out"
                              style={{
                                transform: isHovered
                                  ? "translateY(-100%)"
                                  : "translateY(0%)",
                                transition: isHovered
                                  ? `transform ${ANIMATION_DURATION_FORWARD}s ease-out ${
                                      index * CHARACTER_DELAY
                                    }s`
                                  : `transform ${ANIMATION_DURATION_REVERSE}s ease-out 0s`,
                              }}
                            >
                              {char}
                            </span>
                            <span
                              className="block absolute top-full left-0 ease-out"
                              style={{
                                transform: isHovered
                                  ? "translateY(-100%)"
                                  : "translateY(0%)",
                                transition: isHovered
                                  ? `transform ${ANIMATION_DURATION_FORWARD}s ease-out ${
                                      index * CHARACTER_DELAY
                                    }s`
                                  : `transform ${ANIMATION_DURATION_REVERSE}s ease-out 0s`,
                              }}
                            >
                              {char}
                            </span>
                          </span>
                        );
                      })}
                    </Link>
                  </li>
                ))}
              </ul>

        
              <div className="flex items-center ml-auto hidden md:flex">
                <button
                  onClick={handleCopyEmail}
                  className="text-[16px] font-fragment-mono text-[#1E1E1E] email-link-underline"
                >
                  {copied ? "Copied" : "work.loitran@gmail.com"}
                </button>
              </div>
 

            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
