import KeyboardNav from "@/components/navigation/KeyboardNav";

interface ChapterProps {
	children: React.ReactNode;
	params: Promise<{
		mangaId: string;
		chapterId: string;
	}>;
}

export default async function ChapterLayout({ children, params }: ChapterProps) {
	const chapterId = Number((await params).chapterId);
	const mangaId = (await params).mangaId;

	return (
		<div className="w-full">
			<main>
				{children}
				<KeyboardNav chapterId={chapterId} mangaId={mangaId} />
			</main>
		</div>
	);
}
