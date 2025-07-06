import os
import requests
import json
import logging
from bs4 import BeautifulSoup
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
import re


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

            img_url = re.sub(r'-\d+x\d+(?=\.(jpg|jpeg|png|webp))', '', img_url, flags=re.IGNORECASE)

            padded_filename = f"page-{idx:03}"
            jpg_path = os.path.join(chapter_dir, f"{padded_filename}.jpg")
            webp_path = os.path.join(chapter_dir, f"{padded_filename}.webp")

            for ext in [".jpg", ".jpeg"]:
                for old_idx in [idx, int(str(idx).lstrip("0") or "0")]:
                    unpadded = os.path.join(chapter_dir, f"page-{old_idx}{ext}")
                    if os.path.exists(unpadded) and not os.path.exists(jpg_path):
                        os.rename(unpadded, jpg_path)

            if os.path.exists(jpg_path):
                try:
                    with Image.open(jpg_path) as im:
                        im.save(webp_path, "WEBP")
                    os.remove(jpg_path)
                except Exception as e:
                    logging.error(f"Failed to convert {jpg_path} to .webp: {e}")
                continue

            download_tasks.append((img_url, jpg_path))

        with ThreadPoolExecutor(max_workers=10) as executor:
            executor.map(lambda args: download_image(*args), download_tasks)

        for _, jpg_path in download_tasks:
            if os.path.exists(jpg_path):
                try:
                    with Image.open(jpg_path) as im:
                        webp_path = jpg_path.replace(".jpg", ".webp")
                        im.save(webp_path, "WEBP")
                    os.remove(jpg_path)
                except Exception as e:
                    logging.error(f"Failed to convert {jpg_path} to .webp: {e}")

        manifest_path = os.path.join(chapter_dir, "manifest.json")
        page_files = sorted(
            [f for f in os.listdir(chapter_dir) if f.endswith(".webp")],
            key=lambda name: int(name.split('-')[1].split('.')[0])
        )
        manifest = {
            "pages": page_files
        }
        with open(manifest_path, 'w') as f:
            json.dump(manifest, f, indent=2)

    except Exception as e:
        logging.error(f"Unexpected error in chapter {chapter_num}: {e}")