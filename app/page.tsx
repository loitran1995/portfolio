// app/page.tsx
"use client";

import HeroSection from "@/components/HeroSection"; // Comment hoặc xóa nếu chưa có HeroSection
import Contacts from "@/components/Contacts";
import Projects from "@/components/Projects";
import Experiences from "@/components/Experiences";
import Skills from "@/components/Skills";
import Logofolio from "@/components/Logofolio";
import EnjoyProjects from "@/components/EnjoyProjects";
import ThankYou from "@/components/ThankYou";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    // Xóa các class màu nền ở đây vì đã xử lý ở layout.tsx
    <main className="flex flex-col items-start justify-start w-full bg-white">
      <Header />
      <HeroSection />
      <Contacts />
      <Projects />
      <Experiences />
      <Skills />
      <Logofolio/>
      <EnjoyProjects/>
      <ThankYou/>
    </main>
  );
}
