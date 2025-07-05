import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return NextResponse.json({ message: 'No URL provided' }, { status: 400 });

  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const getField = (label: string) =>
      $(`span.dark_text:contains("${label}")`).parent().text().replace(`${label}`, '').trim();

    const score = Number($('span[itemprop="ratingValue"]').text().trim())
    const members = Number(getField('Members:').replace(',', ''));
    const rankStr = getField('Ranked:').replace('#', '').split(' ')[0];
    const rank = rankStr.endsWith('2') && rankStr.length > 1 
      ? Number(rankStr.slice(0, -1)) 
      : Number(rankStr);
    const popularity = Number(getField('Popularity:').replace('#', ''));
    const status = getField('Status:');
    const volumes = Number(getField('Volumes:'));
    const chapters = Number(getField('Chapters:'));
    const publishedComponents = getField('Published:').split(' to ');
    const published = publishedComponents.map((date) => new Date(date.trim()));

    const tags = [
      ...$('div:has(> span.dark_text:contains("Genres")) a'),
      ...$('div:has(> span.dark_text:contains("Theme")) a'),
      ...$('div:has(> span.dark_text:contains("Demographic")) a'),
    ].map((el) => $(el).text().trim());

    return NextResponse.json({
      score,
      members,
      rank,
      popularity,
      status,
      volumes,
      chapters,
      published,
      tags,
    });
  } catch {
    return NextResponse.json({ message: 'Failed to scrape manga info' }, { status: 500 });
  }
}
