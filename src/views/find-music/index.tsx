import React from 'react';
import Banner from './banner';
import Title from './title';
import Card from './card';
import List from './list';
import './find-music.less';

const FindMusic = () => (
  <div className="find-music">
    <Banner />
    <Title name="推荐歌单" />
    <Card data={Array(10).fill(0)} />
    <Title name="独家放送" welt />
    <Card data={Array(4).fill(0)} rect />
    <Title name="最新音乐" />
    <List data={[Array(5).fill(0), Array(5).fill(0)]} />
    <Title name="推荐MV" />
    <Card data={Array(4).fill(0)} rect />
    <Title name="主播电台" welt />
    <List data={[Array(5).fill(0), Array(5).fill(0)]} />
  </div>
);

export default FindMusic;
