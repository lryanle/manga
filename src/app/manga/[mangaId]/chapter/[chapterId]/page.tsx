import fs from "fs";
import path from "path";
import Image from "next/image";
import { Suspense } from "react";

interface PageProps {
  params: {
    chapter: string;
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const chapter = Number(params.chapter)
  const chapterDir = path.join(process.cwd(), "public/jjk_chapters", "jjk-" + chapter);
  let images: string[] = [];

  try {
    images = fs
      .readdirSync(chapterDir)
      .filter((file) => file.endsWith(".jpg") || file.endsWith(".png"))
      .sort((a, b) => {
        const numA = parseInt(a.replace("page-", "").replace(/\D/g, ""));
        const numB = parseInt(b.replace("page-", "").replace(/\D/g, ""));
        return numA - numB;
      });
  } catch (err) {
    console.error(`Failed to load images for ${chapter}:`, err);
  }

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-6 max-w-3xl mx-auto">
        <Suspense fallback={"Loading..."}>
      {images.map((img, idx) => (
          <Image
            loading="lazy"
            key={`ch-${chapter}-${idx}`}
            src={`/jjk_chapters/jjk-${chapter}/${img}`}
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