'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  chapterId: number;
  mangaId: string;
  min?: number; 
  max?: number;
}

export default function KeyboardNav({ chapterId, mangaId, min = 0, max }: Props) {
  const router = useRouter();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.target && (e.target as HTMLElement).isContentEditable) return;
      if ('INPUT,TEXTAREA,SELECT'.includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowLeft' && chapterId > min) {
        router.push(`/manga/${mangaId}/chapter/${chapterId - 1}`);
      } else if (e.key === 'ArrowRight' && (max === undefined || chapterId < max)) {
        router.push(`/manga/${mangaId}/chapter/${chapterId + 1}`);
      }
    }

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router, chapterId, mangaId, min, max]);

  return null;
}