import { redirect } from 'next/navigation';

export default function MangaPage({ params }: { params: { mangaId: string } }) {
  redirect(`/manga/${params.mangaId}`);
}