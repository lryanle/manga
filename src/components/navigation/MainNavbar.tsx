"use client"

import Link from 'next/link';
import BackButton from './BackButton';
import { usePathname } from 'next/navigation';
import ChapterNavbar from './ChapterNavbar';

export default function MainNavbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-primary-foreground/95 backdrop-blur-lg supports-[backdrop-filter]:bg-primary-foreground/70 sticky top-0 drop-shadow-lg z-50 w-full shadow-2xl p-4">
      {pathname.includes("/chapter") ? <ChapterNavbar /> : 
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          lryanle &gt; manga
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/manga" className="text-sm font-medium hover:text-primary hidden md:block">
            Manga Library
          </Link>
          <Link href="https://lryanle.com" className="text-sm font-medium hover:text-primary hidden md:block">
            lryanle.com
          </Link>
          <BackButton />
        </nav>
      </div>
    }
    </nav>
  )
}