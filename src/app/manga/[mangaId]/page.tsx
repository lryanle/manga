/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Star, Flame, Hash } from "lucide-react";
import { notFound } from "next/navigation";
import mangaData from "@/constants/config.json";
import { useMangaStats } from "@/hooks/use-manga-stats";
import { MALStats } from "@/types/card";
import { use } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import VolumeCard from "@/components/cards/manga-title/VolumeCard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PageProps {
	params: Promise<{ mangaId: string; }>;
}

export default function MangaPage({ params }: PageProps) {
	const { mangaId } = use(params);
	const manga = mangaData.find((manga) => manga.id === mangaId);

	if (!manga) {
		notFound();
	}

	const { data, loading } = useMangaStats(manga.mal_url);
	const { score, members, rank, popularity, status, volumes, chapters, published, tags } = data ?? ({} as MALStats);

	return (
		<div className="min-h-screen bg-background">

			<main className="container mx-auto px-4 py-8">
				{/* Manga Info Section */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
					<div className="lg:col-span-1 relative">
						<div className="overflow-hidden rounded-lg relative lg:static">
						<img
							src={manga.coverArt || "/placeholder.svg"}
							alt={manga.title}
							width={400}
							height={400}
							className="w-full h-64 lg:w-96 lg:h-120 object-cover mx-auto rounded-lg shadow-lg blur-xs lg:blur-none"
						/>
						</div>
            <div className="absolute left-1/2 top-1/2 -translate-1/2 lg:hidden">
              <img
                src={manga.logo}
                alt={manga.title + " logo"}
                width={300}
                height={400}
                className="drop-shadow"
              />
            </div>
					</div>

					<div className="lg:col-span-2">
						<h1 className="text-4xl font-bold mb-4">{manga.title}</h1>

						<div className="flex flex-wrap items-center gap-4 mb-6 font-semibold">
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 w-min">
                  <div className="flex items-center gap-1">
										<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
										{(loading || !score) ? (<Skeleton className="w-16 h-6" />) : (
											<span>{score}/10</span>
										)}
									</div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>MAL reader score (out of 10)</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 w-min">
								<div className="flex items-center gap-1">
									<Flame className="w-5 h-5 fill-amber-600 text-amber-600" />
									{(loading || !popularity) ? (<Skeleton className="w-6 h-6" />) : (
										<span>{popularity}</span>
									)}
								</div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>MAL popularity ranking</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 w-min">
									<div className="flex items-center gap-1">
										<Hash className="w-5 h-5 fill-blue-400 text-blue-400" />
										{(loading || !rank) ? (<Skeleton className="w-12 h-6" />) : (
											<span>{rank}</span>
										)}
									</div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>MAL manga ranking</p>
                </TooltipContent>
              </Tooltip>
						</div>

						<div className="mt-6 font-medium">
							<h3 className="text-lg font-semibold mb-2">Statistics</h3>
							<div className="grid grid-cols-2 gap-4 mb-6">
								<div>
									<span className="text-sm text-muted-foreground">MAL Reads:</span>
                  {(loading || members === undefined) ? (<Skeleton className="w-24 h-6" />) : (
										<p>{members} total</p>
									)}
								</div>
								<div>
									<span className="text-sm text-muted-foreground">Status:</span>
                  {(loading || members === undefined) ? (<Skeleton className="w-30 h-6" />) : (
										<p>Manga {status}</p>
									)}
								</div>
								<div>
									<span className="text-sm text-muted-foreground">Last Updated:</span>
                  {(loading || members === undefined) ? (<Skeleton className="w-28 h-6" />) : (
										<p>{new Date(manga.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
									)}
								</div>
								<div>
									<span className="text-sm text-muted-foreground">Original Run:</span>
									{(loading || published?.[0] === undefined || published?.[1] === undefined) ? (<Skeleton className="w-44 h-6" />) : (
                    <p className="space-x-1">
                      <span>{new Date(published?.[0]).toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" })}</span>
                      <span>to</span>
                      <span>{published?.[1] ? new Date(published?.[1]).toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" }) : "now"}</span>
                    </p>
                  )}
								</div>
								<div>
									<span className="text-sm text-muted-foreground">Volumes:</span>
                  {(loading || members === undefined) ? (<Skeleton className="w-18 h-6" />) : (
										<p>{manga.volumes.length} total</p>
									)}
								</div>
								<div>
									<span className="text-sm text-muted-foreground">Chapters:</span>
                  {(loading || chapters === undefined) ? (<Skeleton className="w-20 h-6" />) : (
										<p>{chapters} total</p>
									)}
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-2">Description</h3>
							<p className="text-muted-foreground leading-relaxed">{manga.description}</p>
						</div>

						<div className="mt-6">
							<h3 className="text-lg font-semibold mb-2">Tags</h3>
							<div className="flex flex-wrap gap-2">
								{(loading || chapters === undefined) ? (
									<>
										<Skeleton className="w-16 h-6" />
										<Skeleton className="w-12 h-6" />
										<Skeleton className="w-24 h-6" />
										<Skeleton className="w-20 h-6" />
										<Skeleton className="w-12 h-6" />
									</>
								) : (
									tags?.map((tag: string) => (
										<Badge key={tag} variant="outline">
											{tag}
										</Badge>
									))
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Volumes and Chapters */}
				<div>
					<h2 className="text-2xl font-bold mb-6">Volumes & Chapters</h2>

					<div className="space-y-8">
						{manga.volumes.map((volume) => (
							<VolumeCard
								key={volume.id}
								volume={volume}
								manga={manga}
								loading={loading}
								rank={rank}
								volumes={volumes}
							/>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
