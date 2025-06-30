"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ScrollProvider } from "@/context/ScrollContext";
import ConfettiClicker from "./ConfettiClicker";
import {
  FloatingDockDesktop,
  FloatingDockMobile,
} from "@/components/ui/floating-dock";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerRef, isHeaderInView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
    fallbackInView: true,
    initialInView: true,
  });
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [hasScrolledPastHeader, setHasScrolledPastHeader] = useState(false);
  const [showFloatingDock, setShowFloatingDock] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRefs = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  useEffect(() => {
    if (!isHeaderInView && !hasScrolledPastHeader) {
      setHasScrolledPastHeader(true);
    }
    if (isHeaderInView && hasScrolledPastHeader) {
      setHasScrolledPastHeader(false);
    }
  }, [isHeaderInView, hasScrolledPastHeader]);

  useEffect(() => {
    const shouldShow = isMobile || hasScrolledPastHeader;

    if (shouldShow) {
      setShowFloatingDock(true);
    } else {
      const hideTimeout = setTimeout(() => {
        setShowFloatingDock(false);
      }, 0);
      timeoutRefs.current.hideTimeout = hideTimeout;
      return () => clearTimeout(hideTimeout);
    }
  }, [isMobile, hasScrolledPastHeader]);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
  const currentTimeouts = { ...timeoutRefs.current };
    return () => {
      window.removeEventListener("resize", handleResize);
      Object.values(currentTimeouts).forEach((timeoutId) => {
        if (timeoutId) clearTimeout(timeoutId);
      });
    };
  }, []);

  if (!isMounted) return null;

  const dockItems = [
    {
      title: "Home",
      href: "#",
      icon: (
        <Image
          src="/images/header-home.svg"
          alt="Home"
          width={24}
          height={24}
        />
      ),
      size: { default: 24, hover: 36 },
    },
    {
      title: "Contacts",
      href: "#contacts-section",
      icon: (
        <Image
          src="/images/header-contacts.svg"
          alt="Contacts"
          width={24}
          height={24}
        />
      ),
      size: { default: 24, hover: 36 },
    },
    {
      title: "Projects",
      href: "#projects-section",
      icon: (
        <Image
          src="/images/header-prj.svg"
          alt="Projects"
          width={24}
          height={24}
        />
      ),
      size: { default: 24, hover: 36 },
    },
    {
      title: "Experiences",
      href: "#experiences-section",
      icon: (
        <Image
          src="/images/header-exp.svg"
          alt="Experiences"
          width={24}
          height={24}
        />
      ),
      size: { default: 24, hover: 36 },
    },
    {
      title: "Skills",
      href: "#skills-section",
      icon: (
        <Image
          src="/images/header-skills.svg"
          alt="Skills"
          width={24}
          height={24}
        />
      ),
      size: { default: 24, hover: 36 },
    },
    {
      title: "Logofolio",
      href: "#logofolio-section",
      icon: (
        <Image
          src="/images/header-logofolio.svg"
          alt="Logofolio"
          width={24}
          height={24}
        />
      ),
      size: { default: 24, hover: 36 },
    },
  ];

  return (
    <ScrollProvider>
      <ConfettiClicker />

      <div className="w-full h-auto relative top-0 left-0 z-50">
        <Header forwardedRef={headerRef} />
      </div>

      <AnimatePresence mode="wait">
        {showFloatingDock && !isMobile && (
          <motion.div
            key="floating-dock-desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <FloatingDockDesktop items={dockItems} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showFloatingDock && isMobile && (
          <motion.div
            key="floating-dock-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <FloatingDockMobile items={dockItems} />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen">{children}</main>
    </ScrollProvider>
  );
}
