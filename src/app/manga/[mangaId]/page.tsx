import fs from "fs";
import path from "path";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	const chapterRoot = path.join(process.cwd(), "public/jjk_chapters");
	let chapters: string[] = [];

	try {
		chapters = fs
			.readdirSync(chapterRoot, { withFileTypes: true })
			.filter((dirent) => dirent.isDirectory() && dirent.name.startsWith("jjk-"))
			.map((dirent) => dirent.name)
			.sort((a, b) => {
				const numA = parseInt(a.replace("jjk-", ""));
				const numB = parseInt(b.replace("jjk-", ""));
				return numA - numB;
			});
	} catch (err) {
		console.error("Failed to read chapters:", err);
	}

	return (
		<main className="p-6 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-4">Read Jujutsu Kaisen Manga</h1>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{chapters.map((c) => {
					const chapter = c.replace("jjk-", "");

					return (
						<Link key={chapter} href={`/chapter/${chapter}`}>
							<Button variant="outline" className="w-full">
								Chapter {chapter}
							</Button>
						</Link>
					);
				})}
			</div>
		</main>
	);
}
