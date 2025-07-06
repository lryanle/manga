import mangaList from "@/constants/config.json"
import MainNavbar from "@/components/navigation/MainNavbar";
import TitleCard from "@/components/cards/manga-title/TitleCard";

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Manga Titles</h2>
          <p className="text-muted-foreground">Select a manga to view chapters</p>
        </div>

        {/* Manga Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-4 gap-6">
          {mangaList.map((manga) => (
            <TitleCard key={manga.id} manga={manga} />
          ))}
        </div>
      </main>
    </div>
  )
}
