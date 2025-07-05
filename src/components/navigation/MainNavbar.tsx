import Link from 'next/link';


export default function MainNavbar() {

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            manga.lryanle.com
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/manga" className="text-sm font-medium hover:text-primary">
              Browse
            </Link>
            <Link href="/favorites" className="text-sm font-medium hover:text-primary">
              Favorites
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  )
}