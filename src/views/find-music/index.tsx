import React, { ReactEventHandler, useEffect, useState } from 'react';
import Title from '@/components/title';
import Card, { CardData } from '@/components/card';
import List, { ListData, ListParams } from './list';
import Banner from '@/components/banner';
import './find-music.less';
import {
  getAlbumNewest,
  getBanner,
  getDJToplist,
  getPersonalized,
  getPersonalizedMV,
  getPPList,
  getRecommendSongs,
} from '@/api';
import { BannerType, Personalized, Track } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { insertSong, fetchAndSetCurrentTrack, RootState, setCurrentTrack } from '@/store';
import { useHistory } from 'react-router-dom';
import Img, { IconOptions } from '@/components/img';
import { resizeImg } from '@/utils';
import recommend from '@/assets/img/recommend.jpg';
import dayjs from 'dayjs';
import { DynamicPage, Page } from '@/router';

const FindMusic: React.FC = () => {
  const isLogin = useSelector((state: RootState) => !!state.user.cookie);
  const [banner, setBanner] = useState<BannerType[]>([]);
  const [personalized, setPersonalized] = useState<CardData[]>([]);
  const [recommendSongs, setRecommendSongs] = useState<Track[]>([]);
  const [privateList, setPrivateList] = useState<CardData[]>([]);
  const [personalizedMV, setPersonalizedMV] = useState<CardData[]>([]);
  const [albumNewest, setAlbumNewest] = useState<ListData[]>([]);
  const [djToplist, setDJToplist] = useState<ListData[]>([]);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const iconConfig: IconOptions = { size: 'medium', hoverDisplay: true, placement: 'bottom' };
  const today = dayjs(Date.now()).format('DD');

  function CardDataAdapter(personalizedList: Personalized[]) {
    return personalizedList.map(item => {
      const { id, name, picUrl: imgUrl } = item;
      return { id, name, imgUrl };
    });
  }

  function handleSongInserted(id: number) {
    dispatch(insertSong(id));
  }

  function renderAlbumNewest({ i, j, len, item }: ListParams) {
    return (
      <>
        <strong className="find-music__ordinal">{(i * len) / 2 + j + 1}</strong>
        <div>
          <div>{item.name}</div>
          {<div className="find-music__artist">{item.extra?.artistName}</div>}
        </div>
      </>
    );
  }

  function renderDJToplist({ item }: ListParams) {
    return (
      <div className="find-music__list">
        <div className="find-music__list-name">{item.name}</div>
        <div className="find-music__list-detail">{item.extra?.description}</div>
      </div>
    );
  }

  async function loadBanner() {
    const res = await getBanner();
    setBanner(res.banners);
  }

  async function loadPersonalized() {
    const limit = isLogin ? 9 : 10;
    const res = await getPersonalized({ limit });
    setPersonalized(CardDataAdapter(res.result));
  }

  async function loadRecommendSongs() {
    if (!isLogin) return;
    const res = await getRecommendSongs();
    setRecommendSongs(res.data.dailySongs);
  }

  async function loadPPList() {
    const res = await getPPList({ limit: 4 });
    setPrivateList(CardDataAdapter(res.result));
  }

  async function loadPersonalizedMV() {
    const res = await getPersonalizedMV();
    setPersonalizedMV(CardDataAdapter(res.result));
  }

  async function loadAlbumNewest() {
    const res = await getAlbumNewest();
    const result = res.albums.map(item => ({
      id: item.id,
      name: item.name,
      imgUrl: item.picUrl,
      extra: { artistName: item.artist.name },
    }));
    setAlbumNewest(result);
  }

  async function loadDJToplist() {
    const res = await getDJToplist();
    const result = res.toplist.map(item => ({
      id: item.id,
      name: item.name,
      imgUrl: item.picUrl,
      extra: { description: item.rcmdtext },
    }));
    setDJToplist(result);
  }

  const handleDailyRecommendPlay: ReactEventHandler<HTMLSpanElement> = e => {
    e.stopPropagation();
    dispatch(setCurrentTrack({ tracks: recommendSongs, current: 0, fm: [] }));
  };

  useEffect(() => {
    loadBanner();
    loadPersonalized();
    loadRecommendSongs();
    loadPPList();
    loadPersonalizedMV();
    loadAlbumNewest();
    loadDJToplist();
  }, []);

  return (
    <div className="find-music">
      <Banner data={banner} onBannerClick={handleSongInserted} />
      <Title name="推荐歌单" />
      <div className="find-music__card">
        {isLogin && (
          <div className="find-music__card-item">
            <div className="find-music__card-wrapper" onClick={() => push(Page.dailyRecommend)}>
              <header>根据您的音乐口味生成每日更新</header>
              <strong>{today}</strong>
              <Img
                className="find-music__card-img"
                icon={iconConfig}
                src={recommend}
                alt="每日推荐"
                onIconClick={handleDailyRecommendPlay}
              />
            </div>
            <p>每日歌曲推荐</p>
          </div>
        )}
        {personalized.map(item => (
          <div key={item.id} className="find-music__card-item">
            <Img
              className="find-music__card-img"
              src={resizeImg(item.imgUrl, 135)}
              icon={iconConfig}
              onClick={() => push(DynamicPage.list(item.id))}
              onIconClick={() => dispatch(fetchAndSetCurrentTrack(item.id))}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <Title name="独家放送" welt />
      <Card type="rectangle" data={privateList} />
      <Title name="最新音乐" />
      <List
        icon
        data={albumNewest}
        functionChildren={renderAlbumNewest}
        onItemClick={handleSongInserted}
      />
      <Title name="推荐MV" />
      <Card type="rectangle" data={personalizedMV} />
      <Title name="主播电台" welt />
      <List size="medium" data={djToplist} functionChildren={renderDJToplist}></List>
    </div>
  );
};

export default FindMusic;
