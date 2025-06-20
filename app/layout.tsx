// // app/layout.tsx
import ConfettiClicker from '@/components/ConfettiClicker';
import './globals.css';
import { ScrollProvider } from '@/context/ScrollContext';
import { Poppins, Fragment_Mono } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-poppins',
});

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
          <div className="relative z-0">
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