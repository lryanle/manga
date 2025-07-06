import { redirect } from 'next/navigation';

export default async function MangaPage({ params }: { params: Promise<{ mangaId: string }>}) {
  redirect(`/manga/${(await params).mangaId}`);
}