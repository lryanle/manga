import { Card, CardContent } from '@/components/ui/card';
import { MangaChapter, MangaTitle } from '@/types/card';
import Link from 'next/link';
import React from 'react'

type Props = {
  chapter: MangaChapter;
  manga: {
    id: MangaTitle["id"]
  };
}

export default function ChapterCard({ chapter, manga }: Props) {
  return (
    <Link key={chapter.id} href={`/manga/${manga.id}/chapter/${chapter.id}`} className="flex">
      <Card className="hover:shadow-md hover:scale-105 transition-all cursor-pointer p-2 w-48">
        <CardContent className="px-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm mb-1">Chapter {chapter.id}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{chapter.title}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}