import fs from "fs";
import path from "path";
import Image from "next/image";
import { Suspense } from "react";

interface PageProps {
  params: {
    chapterId: string;
    mangaId: string;
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const chapter = Number(params.chapterId)
  let images: string[] = [];

  const chapterImages = async () => {
    try {
      const manifestPath = path.join(process.cwd(), 'public', 'manga', params.mangaId, `chapter-${chapter}`, 'manifest.json');
      
      if (!fs.existsSync(manifestPath)) {
        console.error(`Manifest file not found at ${manifestPath}`);
        return [];
      }
      
      const manifestContent = fs.readFileSync(manifestPath, 'utf8');
      const manifestData = JSON.parse(manifestContent);
      
      return manifestData.pages || [];
    } catch (err) {
      console.error(`Failed to load images for chapter ${chapter}:`, err);
      return [];
    }
  };
  
  images = await chapterImages();

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-6 max-w-3xl mx-auto">
        <Suspense fallback={"Loading..."}>
      {images.map((img, idx) => (
          <img
            loading="lazy"
            key={`ch-${chapter}-${idx}`}
            src={`/manga/${params.mangaId}/chapter-${chapter}/${img}`}
            alt={`Page ${idx + 1}`}
            width={800}
            height={0}
            className="w-full h-auto rounded-lg border-2 shadow-lg"
          />
      ))}
        </Suspense>
    </div>
  );
}