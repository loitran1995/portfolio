// components/Header.tsx

'use client';

import Link from 'next/link';

export default function Header() {
  const navItems = [
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Contacts', href: '/contacts' },
  ];

  return (
    <header className="w-full bg-white py-12 top-0 left-0 z-50 ">
      <nav className="flex items-center justify-between w-full text-[var(--foreground)]">
        <Link href="/" className="flex items-center flex-shrink-0">
          <img src="/logo.svg" alt="Loi Tran Logo" className="h-16 w-auto flex-shrink-0" />
        </Link>

        <div className="flex items-center flex-grow ml-[128px]">

          <ul className="hidden md:flex space-x-[64px]">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  // THÊM inline-flex VÀ items-center VÀO ĐÂY
                  className="relative text-[16px] font-fragment-mono transition-colors duration-200 inline-flex overflow-hidden group h-[20px] leading-[20px] items-center" // <-- Đã thêm inline-flex và items-center
                >
                  {/* Các span này vẫn giữ block để đảm bảo translate-y-full hoạt động đúng */}
                  <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    {item.name}
                  </span>
                  <span className="block absolute top-full left-0 transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center ml-auto">
            <a
              href="mailto:work.loitran@example.com"
              className="text-[16px] font-fragment-mono text-[#1E1E1E] email-link-underline"
            >
              work.loitran@gmail.com
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}