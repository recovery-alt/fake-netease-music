import React, { useEffect, useState } from 'react';
import Title from './components/title';
import Card, { CardData } from '@/components/card';
import List from './components/list';
import Banner from '@/components/banner';
import './find-music.less';
import {
  getAlbumNewest,
  getBanner,
  getDJToplist,
  getPersonalized,
  getPersonalizedMV,
  getPPList,
} from '@/api';
import type { BannerType, PersonalizedList, AlbumNewest, DJToplist } from '@/api';

const FindMusic: React.FC = () => {
  const [banner, setBanner] = useState<BannerType[]>([]);
  const [personalized, setPersonalized] = useState<CardData[]>([]);
  const [privateList, setPrivateList] = useState<CardData[]>([]);
  const [personalizedMV, setPersonalizedMV] = useState<CardData[]>([]);
  const [albumNewest, setAlbumNewest] = useState<AlbumNewest['albums']>([]);
  const [djToplist, setDJToplist] = useState<DJToplist['toplist']>([]);

  function CardDataAdapter(personalizedList: PersonalizedList) {
    return personalizedList.map(item => {
      const { name, picUrl: imgUrl } = item;
      return { name, imgUrl };
    });
  }

  useEffect(() => {
    getBanner().then(res => {
      setBanner(res.banners);
    });
    getPersonalized({ limit: 10 }).then(res => {
      setPersonalized(CardDataAdapter(res.result));
    });
    getPPList({ limit: 4 }).then(res => {
      setPrivateList(CardDataAdapter(res.result));
    });
    getPersonalizedMV().then(res => {
      setPersonalizedMV(CardDataAdapter(res.result));
    });
    getAlbumNewest().then(res => {
      setAlbumNewest(res.albums);
    });
    getDJToplist({ limit: 6 }).then(res => {
      setDJToplist(res.toplist);
    });
  }, []);

  return (
    <div className="find-music">
      <Banner data={banner} />
      <Title name="推荐歌单" />
      <Card data={personalized} />
      <Title name="独家放送" welt />
      <Card data={privateList} width={170} height={100} style={{ marginBottom: 0 }} />
      <Title name="最新音乐" />
      <List data={albumNewest} />
      <Title name="推荐MV" />
      <Card data={personalizedMV} width={170} height={100} style={{ marginBottom: 0 }} />
      <Title name="主播电台" welt />
      <List size="large" data={djToplist} />
    </div>
  );
};

export default FindMusic;
