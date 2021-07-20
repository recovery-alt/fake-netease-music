import React, { useEffect, useState } from 'react';
import Title from './title';
import Card from './card';
import List from './list';
import './find-music.less';
import { getBanner, getPersonalized } from '@/api';
import type { BannerType, PersonalizedType } from '@/api';
import Banner from './banner';

const FindMusic = () => {
  const [banner, setBanner] = useState<BannerType['banners']>([]);

  const [personalized, setPersonalized] = useState<PersonalizedType['result']>([]);
  useEffect(() => {
    getBanner().then(res => {
      setBanner(res.banners);
    });
    getPersonalized().then(res => {
      setPersonalized(res.result);
    });
  }, []);
  return (
    <div className="find-music">
      <Banner data={banner} />
      <Title name="推荐歌单" />
      <Card data={personalized.slice(0, 10)} />
      <Title name="独家放送" welt />
      <Card data={personalized.slice(10, 14)} rect />
      <Title name="最新音乐" />
      <List data={[Array(5).fill(0), Array(5).fill(0)]} />
      <Title name="推荐MV" />
      <Card data={personalized.slice(14, 18)} rect />
      <Title name="主播电台" welt />
      <List data={[Array(5).fill(0), Array(5).fill(0)]} />
    </div>
  );
};

export default FindMusic;
