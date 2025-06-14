// app/layout.tsx

import './globals.css';
import { Inter, Poppins } from 'next/font/google'; // Giữ Inter nếu bạn vẫn muốn dùng nó với next/font/google
import type { Metadata } from 'next';
import Header from '@/components/Header';

// Cấu hình font Google Inter (giữ nguyên nếu bạn muốn dùng Inter với next/font/google)
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Đảm bảo có '400' ở đây
  variable: '--font-poppins', // Tên biến CSS nếu bạn muốn dùng
});



export const metadata: Metadata = {
  title: 'Loi Portfolio | UI/UX Designer',
  description: 'Portfolio của Lợi Trần, một UI/UX Designer đam mê.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // THÊM CÁC THẺ LINK GOOGLE FONTS VÀO ĐÂY
    <html lang="en" className={poppins.variable}> 
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> 
        <link href="https://fonts.googleapis.com/css2?family=Fragment+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white">
       <div className=''>
          <Header />
          {children}
</div>
      </body>
    </html>
  );
}