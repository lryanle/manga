import KeyboardNav from "@/components/navigation/KeyboardNav";
import ChapterNavbar from "@/components/navigation/ChapterNavbar";

interface ChapterProps {
	children: React.ReactNode;
	params: {
		chapter: string;
	};
}

export default async function ChapterLayout({ children, params }: ChapterProps) {
	const chapter = Number(await params.chapter);

	return (
		<div className="w-full">
			<ChapterNavbar chapter={chapter} />
			<main>
				{children}
				<KeyboardNav current={chapter} />
			</main>
		</div>
	);
}
