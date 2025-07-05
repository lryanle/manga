"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useMangaStats } from "@/hooks/use-manga-stats";
import { cn } from "@/lib/utils";
import type { MALStats, MangaCard } from "@/types/card";
import { Book, Calendar, Circle, CircleCheck, CircleMinus, Eye, Flame, Hash, Star, TableOfContents, Tag } from "lucide-react";
import Link from "next/link";

type TitleCardProps = {
  manga: MangaCard;
};

export default function TitleCard({ manga }: TitleCardProps) {
  const { data, loading, error } = useMangaStats(manga.mal_url);
  const { score, members, rank, popularity, status, volumes, chapters, published, tags } = data ?? ({} as MALStats);

  return (
    <Link key={manga.id} href={`/manga/${manga.id}`}>
      <Card className="group hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer py-0">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={manga.coverArt}
              alt={manga.title}
              width={200}
              height={300}
              className="w-full h-[300px] object-cover rounded-t-lg bg-primary-foreground"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-primary-foreground/50 backdrop-blur">
                <Calendar className="w-3 h-3" />
                <span>Updated {new Date(manga.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </Badge>
            </div>
            <div className="absolute bottom-2 left-2">
              <img
                src={manga.logo}
                alt={manga.title + " logo"}
                width={200}
                height={300}
                className=""
              />
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary">{manga.title}</h3>

            <div className="grid grid-cols-2 gap-2">
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 w-min">
                  <Star strokeWidth={3} className="w-3 h-3 text-yellow-400" />
                  {(loading || !score) ? (<Skeleton className="w-9 h-4" />) : (
                    <span className="text-xs font-medium text-primary">{score}</span>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>User score (out of 10)</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 w-min">
                  <Eye strokeWidth={3} className="w-3 h-3 text-zinc-600" />
                  {(loading || !members) ? (<Skeleton className="w-12 h-4" />) : (
                    <span className="text-xs font-medium text-primary">{members}</span>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Users who have read this manga </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 w-min">
                  <Hash strokeWidth={3} className="w-3 h-3 fill-blue-400 text-blue-400" />
                  {(loading || !rank) ? (<Skeleton className="w-9 h-4" />) : (
                    <span className="text-xs font-medium text-primary">{rank}</span>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>MAL manga ranking</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 w-min">
                  <Flame strokeWidth={3} className="w-3 h-3 text-amber-600" />
                  {(loading || !popularity) ? (<Skeleton className="w-12 h-4" />) : (
                    <span className="text-xs font-medium text-primary">{popularity}</span>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>MAL popularity ranking</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 w-min">
                  <Book strokeWidth={3} className="w-3 h-3 text-purple-400" />
                  {(loading || volumes === undefined) ? (<Skeleton className="w-9 h-4" />) : (
                    <span className="text-xs font-medium text-primary">{volumes ?? "In progress"}</span>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Volume count</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 w-min">
                  <TableOfContents strokeWidth={3} className="w-3 h-3 text-indigo-400" />
                  {(loading || chapters === undefined) ? (<Skeleton className="w-12 h-4" />) : (
                    <span className="text-xs font-medium text-primary">{chapters ?? "In progress"}</span>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Chapter count</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="inline-flex items-center w-min gap-1">
                  {(loading || !status) ? (
                    <>
                      <Circle strokeWidth={3} className="w-3 h-3 text-muted-foreground" />
                      <Skeleton className="w-16 h-4" />
                    </>
                  ) : (
                    <>
                      {status.toLowerCase().includes("finished") ? (<CircleCheck strokeWidth={3} className="w-3 h-3 text-green-400" />) : <CircleMinus strokeWidth={3} className="w-3 h-3 text-yellow-400" />}
                      <span className="text-xs font-medium text-primary">{status}</span>
                    </>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Completion status</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className={cn((loading || published?.[0] === undefined || published?.[1] === undefined) ? "w-full" : "w-min", "col-span-full inline-flex items-center gap-1 text-xs font-medium text-primary")}>
                  <Calendar strokeWidth={3} className="w-3 h-3 text-amber-900" />
                  {(loading || published?.[0] === undefined || published?.[1] === undefined) ? (<Skeleton className="grow h-4" />) : (
                    <>
                      <span>{new Date(published?.[0]).toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" })}</span>
                      <span>to</span>
                      <span>{published?.[1] ? new Date(published?.[1]).toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" }) : "now"}</span>
                    </>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Publishing timeline</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="col-span-full inline-flex flex-wrap items-center gap-1 w-full">
                  <Tag strokeWidth={3} className="w-3 h-3 text-slate-500" />
                  {(loading || !tags) ? (<Skeleton className="grow h-5.5" />) : 
                    tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs p-1 rounded leading-none">
                        {tag}
                      </Badge>
                    ))
                  }
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Keywords</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}