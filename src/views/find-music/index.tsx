import React, { useEffect, useState } from 'react';
import Title from './title';
import Card from './card';
import List from './list';
import './find-music.less';
import {
  getAlbumNewest,
  getBanner,
  getDJToplist,
  getPersonalized,
  getPersonalizedMV,
  getPersonalizedPrivatecontent,
} from '@/api';
import type { Banners, PersonalizedList, AlbumNewest, DJToplist } from '@/api';
import Banner from './banner';

const FindMusic = () => {
  const [banner, setBanner] = useState<Banners['banners']>([]);
  const [personalized, setPersonalized] = useState<PersonalizedList>([]);
  const [privateList, setPrivateList] = useState<PersonalizedList>([]);
  const [personalizedMV, setPersonalizedMV] = useState<PersonalizedList>([]);
  const [albumNewest, setAlbumNewest] = useState<AlbumNewest['albums']>([]);
  const [djToplist, setDJToplist] = useState<DJToplist['toplist']>([]);

  useEffect(() => {
    getBanner().then(res => {
      setBanner(res.banners);
    });
    getPersonalized({ limit: 10 }).then(res => {
      setPersonalized(res.result);
    });
    getPersonalizedPrivatecontent({ limit: 4 }).then(res => {
      setPrivateList(res.result);
    });
    getPersonalizedMV().then(res => {
      setPersonalizedMV(res.result);
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
      <Card data={privateList} rect />
      <Title name="最新音乐" />
      <List data={albumNewest} />
      <Title name="推荐MV" />
      <Card data={personalizedMV} rect />
      <Title name="主播电台" welt />
      <List size="large" data={djToplist} />
    </div>
  );
};

export default FindMusic;
