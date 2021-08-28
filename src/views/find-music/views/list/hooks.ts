import { useState, useEffect } from 'react';
import { getTopPlaylist, TopPlaylist } from '@/api';
import { CardData } from '@/components/card';

export const useTopPlaylist = () => {
  const [topPlaylist, setTopPlaylist] = useState<CardData[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);

  function CardDataAdapter(topPlaylist: TopPlaylist[]) {
    return topPlaylist.map(item => {
      const { id, name, coverImgUrl: imgUrl } = item;
      return { id, name, imgUrl };
    });
  }

  async function loadTopPlaylist(current = 1, limit = 100) {
    const offset = (current - 1) * limit;
    const res = await getTopPlaylist({ offset, limit });
    setTopPlaylist(CardDataAdapter(res.playlists));
    setTotal(res.total);
  }

  useEffect(() => {
    loadTopPlaylist();
  }, []);

  return { topPlaylist, total, current, setCurrent, loadTopPlaylist };
};
