'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChapterNavbarProps {
  chapter: number
}

export default function ChapterNavbar({ chapter }: ChapterNavbarProps) {
  const barRef = useRef<HTMLDivElement>(null);

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
    <nav className="sticky top-0 z-40 w-full shadow-2xl p-4 bg-primary-foreground/70 backdrop-blur-lg">
      <div className="grid grid-cols-3">
				<Link href="/">
					<Button>← Back to Chapters</Button>
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
    </nav>
  )
}