"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';


export default function BackButton() {
  const pathname = usePathname();
  const isMangaDetailPage = /^\/manga\/[^/?#]+$/.test(pathname);

  return (
    <>
      {isMangaDetailPage && (
        <Button size="sm" asChild>
          <Link href="/manga">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Library
          </Link>
        </Button>
      )}
    </>
  )
}