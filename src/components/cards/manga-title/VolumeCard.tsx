import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TableOfContents, Book } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MALStats, MangaTitle, MangaVolume } from "@/types/card";
import ChapterCard from "./ChapterCard";

type Props = {
  volume: MangaVolume;
  manga: {
    id: MangaTitle["id"];
    title: MangaTitle["title"];
  };
  loading: boolean;
  rank: MALStats["rank"];
  volumes: MALStats["volumes"];
}

export default function VolumeCard({ volume, manga, loading, rank, volumes }: Props) {
  return (
    <Card key={volume.id} id={`volume-${volume.id}`}>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start gap-4">
          <Image
            src={volume.coverArt || "/placeholder.svg"}
            alt={volume.title}
            width={160}
            height={240}
            className="rounded object-cover w-full max-h-96 md:object-none md:w-auto md:max-h-none"
          />
          <div className="flex flex-col">
            <div>
              <CardTitle className="text-xl">
                {volume.title}
              </CardTitle>
              <CardDescription className="inline-flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1 w-min">
                    <Badge variant="secondary">
                      <Book strokeWidth={3} className="w-3 h-3 text-purple-400" />
                      {(loading || volumes === undefined) ? (<Skeleton className="w-9 h-5" />) : (
                        <span className="text-xs font-medium text-primary">Volume {volume.id}</span>
                      )}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{manga.title} Volume {volume.id}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger className="flex items-center gap-1 w-min">
                    <Badge variant="secondary">
                      <TableOfContents strokeWidth={3} className="w-3 h-3 text-indigo-400" />
                      {(loading || !rank) ? (<Skeleton className="w-9 h-5" />) : (
                        <span className="text-xs font-medium">{volume.chapters.length} chapters</span>
                      )}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{volume.chapters.length} chapter{volume.chapters.length !== 1 ? "s" : ""} in this volume</p>
                  </TooltipContent>
                </Tooltip>
              </CardDescription>
            </div>
            <CardContent className="px-0 pt-4">
              <div className="flex flex-wrap gap-3">
                {volume.chapters.map((chapter: any) => (
                  <ChapterCard key={chapter.id} chapter={chapter} manga={manga} />
                ))}
              </div>
            </CardContent>

          </div>
        </div>
      </CardHeader>

    </Card>
  )
}