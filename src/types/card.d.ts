export type MangaCard = {
  id: string;
  title: string;
  coverArt: string;
  logo: string;
  lastUpdated: string;
  description: string;
  mal_url: string; // MyAnimeList URL
}

export type MALStats = {
  score: number;
  members: number;
  rank: number;
  popularity: number;
  status: string;
  volumes: number;
  chapters: number;
  published: string[];
  tags: string[];
}