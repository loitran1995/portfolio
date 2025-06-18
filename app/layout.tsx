// app/layout.tsx
import Header from '@/components/Header';
import ConfettiClicker from '@/components/ConfettiClicker';
import './globals.css'; // Import global CSS của bạn

// Import font từ next/font
// **QUAN TRỌNG:** Đảm bảo 'Fragment_Mono' thực sự có sẵn trên Google Fonts.
// Nếu không, bạn cần thay thế nó bằng next/font/local (xem hướng dẫn bên dưới).
import { Poppins, Fragment_Mono } from 'next/font/google';

// Khai báo font Poppins
const poppins = Poppins({
  subsets: ['latin'], // Hoặc bất kỳ subset nào bạn cần
  display: 'swap',
  weight: ['400', '700'], // Chỉ tải các trọng lượng bạn sử dụng
  variable: '--font-poppins', // Đặt biến CSS cho Poppins
});

// Khai báo font Fragment Mono
const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'], // Giả sử các trọng lượng này có sẵn
  variable: '--font-fragment-mono', // Đặt biến CSS cho Fragment Mono
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Sử dụng các biến CSS font class trên thẻ html để font có sẵn toàn cục
    <html lang="en" className={`${poppins.variable} ${fragmentMono.variable}`}>
      <body><Header/>
        <ConfettiClicker/>{children}
        
      </body>
    </html>
  );
}
