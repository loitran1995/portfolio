// app/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import HeroSection from '@/components/HeroSection'; // Comment hoặc xóa nếu chưa có HeroSection
import Contacts from '@/components/Contacts'
export default function HomePage() {

  
  return (
    // Xóa các class màu nền ở đây vì đã xử lý ở layout.tsx
    <main className="flex flex-col items-start justify-start w-full bg-white">
      <HeroSection />
<Contacts/>
     
    </main>
  );
}