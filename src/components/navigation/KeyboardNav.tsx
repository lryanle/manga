'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  current: number;
  min?: number; 
  max?: number;
}

export default function KeyboardNav({ current, min = 0, max }: Props) {
  const router = useRouter();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.target && (e.target as HTMLElement).isContentEditable) return;
      if ('INPUT,TEXTAREA,SELECT'.includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowLeft' && current > min) {
        router.push(`/chapter/${current - 1}`);
      } else if (e.key === 'ArrowRight' && (max === undefined || current < max)) {
        router.push(`/chapter/${current + 1}`);
      }
    }

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router, current, min, max]);

  return null;
}