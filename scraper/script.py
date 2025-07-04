import os
import requests
import json
import logging
from bs4 import BeautifulSoup
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor


logging.basicConfig(filename='jjk_download_errors.log', level=logging.ERROR, format='%(asctime)s - %(message)s')

MANGA_ABV = "JJK"
CHAPTER_MIN = 0
CHAPTER_MAX = 272
BASE_URL = "https://readjujutsukaisenmanga.com/jujutsu-kaisen-chapter-{}"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "public/manga", MANGA_ABV.lower())

os.makedirs(OUTPUT_DIR, exist_ok=True)

def download_image(url, save_path):
    try:
        r = requests.get(url, headers=HEADERS, stream=True, timeout=10)
        if r.status_code == 200:
            with open(save_path, 'wb') as f:
                for chunk in r.iter_content(1024):
                    f.write(chunk)
        else:
            raise requests.HTTPError(f"Bad status code: {r.status_code}")
    except Exception as e:
        logging.error(f"Failed to download image {url}: {e}")

for chapter_num in tqdm(range(CHAPTER_MIN, CHAPTER_MAX), desc="Downloading Chapters"):
    try:
        chapter_url = BASE_URL.format(chapter_num)
        response = requests.get(chapter_url, headers=HEADERS, timeout=10)
        if response.status_code != 200:
            logging.error(f"Chapter {chapter_num}: Failed to fetch page (status {response.status_code})")
            continue

        soup = BeautifulSoup(response.text, 'html.parser')
        script_tag = soup.find("script", {"type": "application/ld+json", "class": "saswp-schema-markup-output"})

        if not script_tag:
            logging.error(f"Chapter {chapter_num}: JSON-LD script tag not found")
            continue

        try:
            data = json.loads(script_tag.string)
        except json.JSONDecodeError as e:
            logging.error(f"Chapter {chapter_num}: Failed to parse JSON - {e}")
            continue

        images = data[0]["mainEntity"].get("image", [])
        if not images:
            logging.error(f"Chapter {chapter_num}: No images found in JSON")
            continue

        chapter_dir = os.path.join(OUTPUT_DIR, f"chapter-{chapter_num}")
        os.makedirs(chapter_dir, exist_ok=True)

        download_tasks = []
        for idx, img_info in enumerate(images, start=1):
            img_url = img_info.get("url")
            if not img_url:
                continue
            save_path = os.path.join(chapter_dir, f"page-{idx}.jpg")
            download_tasks.append((img_url, save_path))

        # Download all images concurrently
        with ThreadPoolExecutor(max_workers=10) as executor:
            executor.map(lambda args: download_image(*args), download_tasks)

    except Exception as e:
        logging.error(f"Unexpected error in chapter {chapter_num}: {e}")