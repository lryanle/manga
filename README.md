# Manga Reader

A personal modern responsive web application for reading manga.

## 📚 Library

- Jujutsu Kaisen chapters 0-272

## ⚙️ Features

- **Database-less Design**: Add a scraper to download manga chapter images during build time
- **Tidy UI**: Modern responsive interface
- **Reading Features**:
  - Progress tracking bar
  - Fullscreen reading mode
  - Easy chapter navigation
  - Manga volume organization

## 🏁 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lryanle/manga.git
   cd manga
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to start reading!

## 🛠️ Project Structure

```
/
├── public/                  # Static assets
│   ├── cover/               # Logo and volume + chapter cover images
│   │   └── jjk/             # JJK covers
│   └── manga/               # Manga chapter images
│   │   └── jjk/             # JJK manga pages
├── scraper/                 # Python scraper for manga content
│   └── jjk-scraper.py       # JJK scraper script
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   │   ├── cards/           # Manga and chapter cards
│   │   ├── navigation/      # Navigation components
│   │   └── ui/              # UI components
│   ├── constants/           # Configuration files
│   └── hooks/               # Custom React hooks
└── ...config files
```

## 📥 Content Scraping

The project includes a Python scraper that downloads manga chapters from online sources:

1. Navigate to the scraper directory:
   ```bash
   cd scraper
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the scraper:
   ```bash
   python script.py
   ```

The script will download all chapters to the `/public/manga/jjk` directory.

## 🔧 Configuration

Manga configuration is stored in `src/constants/config.json` with the following structure:

```json
[
  {
    "id": "jjk",
    "title": "Jujutsu Kaisen",
    "coverArt": "/cover/jjk/splash.jpg",
    "logo": "/cover/jjk/logo.png",
    "volumes": [
      {
        "id": 1,
        "title": "Ryomen Sukuna",
        "coverArt": "/cover/jjk/v1.webp",
        "chapters": [
          {
            "id": 1,
            "title": "Ryomen Sukuna"
          },
          ...
        ]
      },
      ...
    ]
  }
]
```

## 📜 License

This project is for educational purposes only. All Jujutsu Kaisen content is the property of Gege Akutami and Shueisha.

---

Built with ❤️ by @lryanle
