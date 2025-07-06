'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import config from '@/constants/config.json';

export default function ChapterNavbar() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const chapter = pathname.split('/').pop() ?? 'Unknown';
  const manga = config.find(mang => mang.id === pathname.split('/')[2]);
  const volume = manga?.volumes?.find(vol =>
    vol.chapters?.some(chap => chap.id === Number(chapter))
  );
  const chapterTitle = volume?.chapters?.find(chap => chap.id === Number(chapter))?.title;

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function update() {
      const { scrollTop, scrollHeight } = document.documentElement;
      const viewport = window.innerHeight;
      const max = scrollHeight - viewport;
      const percent = max === 0 ? 0 : (scrollTop / max) * 100;

      if (barRef.current) {
        barRef.current.style.width = `${percent}%`;
      }
    }

    // initial paint + every scroll/resize
    update();
    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-8 inline-flex items-center gap-8">
          <Link href={`${pathname.split('/').slice(0, -2).join("/")}#volume-${volume?.id}`}>
            <Button size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="hidden md:block">Back to Chapters</span>
              <span className="block md:hidden">Back</span>
            </Button>
          </Link>
          <div className="flex flex-col lg:flex-row gap-1 items-start text-sm lg:text-lg lg:gap-2 leading-none">
            <h1 className="font-semibold">
              {manga?.title}
            </h1>
            <p className="inline-flex items-center gap-1 text-muted-foreground">
              <span className="hidden lg:block">Chapter</span>
              <span className="lg:hidden">Ch</span>
              {chapter}: {chapterTitle}
            </p>
          </div>
        </div>
        <div className="flex gap-1 justify-end items-center col-span-4">
          <div className="flex items-center gap-1 mr-2">
            <Button size="sm" onClick={toggleFullscreen} className="text-white hover:bg-gray-800">
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
          <Link href={`/manga/${manga?.id}/chapter/${Number(chapter) - 1}`}>
            <Button size="sm">
              <ChevronLeft />
            </Button>
          </Link>
          <Link href={`/manga/${manga?.id}/chapter/${Number(chapter) + 1}`}>
            <Button size="sm">
              <ChevronRight />
            </Button>
          </Link>
        </div>
      </div>

      <div
        ref={barRef}
        className="absolute bottom-0 left-0 h-1 bg-primary transition-[width] duration-75 ease-linear bg-blend-color-burn"
        style={{ width: '0%' }}
        aria-hidden
      />
    </>
  );
}