export type MangaTitle = {
  id: string;
  title: string;
  coverArt: string;
  logo: string;
  lastUpdated: string;
  description: string;
  mal_url: string; // MyAnimeList URL
  volumes: MangaVolume[]
}

export type MangaVolume = {
  id: number;
  title: string;
  coverArt: string;
  chapters: MangaChapter[];
}

export type MangaChapter = {
  id: number;
  title: string;
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