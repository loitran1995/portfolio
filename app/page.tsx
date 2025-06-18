// app/page.tsx
'use client';


import HeroSection from '@/components/HeroSection'; // Comment hoặc xóa nếu chưa có HeroSection
import Contacts from '@/components/Contacts'
import Projects from '@/components/Projects'

export default function HomePage() {

  
  return (
    // Xóa các class màu nền ở đây vì đã xử lý ở layout.tsx
    <main className="flex flex-col items-start justify-start w-full bg-white">
      <HeroSection />
<Contacts/>
<Projects/>
     
    </main>
  );
}