'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import config from '@/constants/config.json';

export default function ChapterNavbar() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const chapter = pathname.split('/').pop() ?? 'Unknown';
  const volume = config[0]?.volumes?.find(vol => 
    vol.chapters?.some(chap => chap.id === Number(chapter))
  )?.id ?? 0;

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

  return (
    <>
      <div className="grid grid-cols-3">
				<Link href={`${pathname.split('/').slice(0,-2).join("/")}#volume-${volume}`}>
					<Button>
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="hidden md:block">Back to Chapters</span>
            <span className="block md:hidden">Back</span>
            </Button>
				</Link>
				<div className="font-bold text-2xl text-center">Chapter {chapter}</div>
				<div className="flex gap-2 justify-end">
					<Link href={`/chapter/${Number(chapter) - 1}`}>
						<Button>
							<ChevronLeft />
						</Button>
					</Link>
					<Link href={`/chapter/${Number(chapter) + 1}`}>
						<Button>
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
  )
}