'use client';

import { MALStats } from '@/types/card';
import { useEffect, useState } from 'react';

export function useMangaStats(url: string) {
  const [data, setData] = useState<MALStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/manga/stats?url=${encodeURIComponent(url)}`, { cache: 'force-cache' });
        const json = await res.json();

        if (!res.ok) throw new Error(json.message ?? 'Failed to fetch manga stats');

        setData(json);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
