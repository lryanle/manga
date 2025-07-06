import { Suspense } from "react";
import configData from "@/constants/config.json";

interface PageProps {
  params: Promise<{
    chapterId: string;
    mangaId: string;
  }>;
}

export default async function ChapterPage({ params }: PageProps) {
  const chapterId = Number((await params).chapterId)
  const mangaId = (await params).mangaId;
  const pageCount = configData.find((manga) => manga.id === mangaId)?.volumes?.find(vol =>
    vol.chapters?.some(chap => chap.id === chapterId)
  )?.chapters?.find(chap => chap.id === chapterId)?.pages;

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-6 max-w-3xl mx-auto">
        <Suspense fallback={"Loading..."}>
      {[...Array(pageCount).keys()].map(id => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            loading="lazy"
            key={`ch-${chapterId}-${id+1}`}
            src={`/manga/${mangaId}/chapter-${chapterId}/page-${String(id+1).padStart(3, "0")}.webp`}
            alt={`Page ${id + 1}`}
            width={800}
            height={0}
            className="w-full h-auto rounded-lg border-2 shadow-lg"
          />
      ))}
        </Suspense>
    </div>
  );
}