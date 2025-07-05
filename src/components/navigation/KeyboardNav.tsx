'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  current: number;
  min?: number; 
  max?: number;
}

/**
 * Adds a single global keydown listener; navigates to
 * /{current - 1} on ← and /{current + 1} on →.
 * Because we call router.push(), Next.js performs an RSC navigation
 * and the next page is **fully server-rendered** before hydration.
 */
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