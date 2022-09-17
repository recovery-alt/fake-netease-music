import { RightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { getAllMusicCategory, getTopPlaylist, getTopPlaylistHighquality } from '@/api';
import { clearRequests } from '@/api/api';
import { CardData } from '@/components/card';
import { Subcategory, TopPlaylist, UserPlaylist } from '@/types';

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

    return clearRequests;
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

export function usePopover(cat: string) {
  type MusicCategoryType = { name: string; data: Subcategory[] };
  const [allMusicCategory, setAllMusicCategory] = useState<MusicCategoryType[]>([]);
  const buttonContext = (
    <>
      {cat === '全部' ? '全部歌单' : cat}
      <RightOutlined />
    </>
  );

  async function loadAllMusicCategory() {
    const res = await getAllMusicCategory();
    const allMusicCategory = Object.keys(res.categories).map(key => {
      const item = res.categories[key];
      const data: Subcategory[] = [];
      const index = Number(key);
      const category: MusicCategoryType = { data, name: item };
      res.sub.forEach(sub => {
        if (sub.category === index) category.data.push(sub);
      });

      return category;
    });
    setAllMusicCategory(allMusicCategory);
  }

  useEffect(() => {
    loadAllMusicCategory();
  }, []);

  return { buttonContext, allMusicCategory };
}
