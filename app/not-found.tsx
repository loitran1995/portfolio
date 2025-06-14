// app/not-found.tsx
import Link from 'next/link';
import { Metadata } from 'next';

// Bạn có thể định nghĩa metadata riêng cho trang 404 này
export const metadata: Metadata = {
  title: '404 - Not Found | Loi Portfolio',
  description: 'Trang bạn tìm kiếm không tồn tại.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center px-4 py-10">
      <h1 className="text-6xl md:text-9xl font-bold font-fragment-mono text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-8">Trang không tìm thấy</h2>
      <p className="text-lg text-gray-600 mb-8">
        Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#1E1E1E] text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 font-fragment-mono text-lg"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}