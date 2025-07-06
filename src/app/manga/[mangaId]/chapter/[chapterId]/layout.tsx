import KeyboardNav from "@/components/navigation/KeyboardNav";

interface ChapterProps {
	children: React.ReactNode;
	params: Promise<{
		mangaId: string;
		chapterId: string;
	}>;
}

export default async function ChapterLayout({ children, params }: ChapterProps) {
	const chapter = Number((await params).chapterId);

	return (
		<div className="w-full">
			<main>
				{children}
				<KeyboardNav current={chapter} />
			</main>
		</div>
	);
}
