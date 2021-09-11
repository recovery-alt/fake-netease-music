import { useState, useEffect } from 'react';
import { getTopPlaylist, getTopPlaylistHighquality } from '@/api';
import { UserPlaylist, TopPlaylist } from '@/types';
import { CardData } from '@/components/card';

export const useTopPlaylist = () => {
  const [topPlaylist, setTopPlaylist] = useState<CardData[]>([]);
  const [topPlaylistHighquality, setTopPlaylistHighquality] = useState<UserPlaylist>();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [cat, setCat] = useState('全部');

  function CardDataAdapter(topPlaylist: TopPlaylist[]) {
    return topPlaylist.map(item => {
      const { id, name, coverImgUrl: imgUrl } = item;
      return { id, name, imgUrl };
    });
  }

  async function loadTopPlaylist(current = 1, limit = 100) {
    const offset = (current - 1) * limit;
    const res = await getTopPlaylist({ cat, offset, limit });
    setTopPlaylist(CardDataAdapter(res.playlists));
    setTotal(res.total);
  }

  async function loadTopPlaylistHighquality() {
    const res = await getTopPlaylistHighquality(cat);
    setTopPlaylistHighquality(res.playlists[0]);
  }

  useEffect(() => {
    setCurrent(1);
    loadTopPlaylist();
    loadTopPlaylistHighquality();
  }, [cat]);

  return {
    topPlaylist,
    total,
    current,
    setCurrent,
    loadTopPlaylist,
    topPlaylistHighquality,
    cat,
    setCat,
  };
};
