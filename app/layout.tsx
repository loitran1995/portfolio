// // app/layout.tsx
import ConfettiClicker from '@/components/ConfettiClicker';
import './globals.css';
import { ScrollProvider } from '@/context/ScrollContext';
import { Poppins, Fragment_Mono } from 'next/font/google';
import { Metadata } from 'next';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-poppins',
});
export const metadata: Metadata = {
  title: 'Loi Tran Portfolio',
  description: 'UI/UX Designer',
  openGraph: {
    title: 'Loi Tran Portfolio',
    description: 'UI/UX Designer',
    url: 'https://loitran-portfolio.vercel.app/',
    siteName: 'Loi Tran Portfolio',
    images: [
      {
        url: '/og-social.webp', // URL hình ảnh OG
        width: 1200,
        height: 630,
        alt: 'Loi Tran Portfolio',
      },
    ],
    locale: 'vi_VN', // Ngôn ngữ, ví dụ: vi_VN cho tiếng Việt
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loi Tran Portfolio',
    description: 'UI/UX Designer',
    images: ['/og-social.webp'],
  },
};
const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-fragment-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${fragmentMono.variable}`}>
      <body>
        {/* Bao bọc toàn bộ nội dung bằng ScrollProvider */}
        <ScrollProvider>
          <div className="relative z-0 ">
            <ConfettiClicker />
            <main className="min-h-screen">
              {children} {/* Tất cả các trang sẽ được render ở đây */}
            </main>
          </div>
        </ScrollProvider>
      </body>
    </html>
  );
}