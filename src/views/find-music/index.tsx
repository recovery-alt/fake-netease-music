import './find-music.less';

import dayjs from 'dayjs';
import { FC, ReactEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  getAlbumNewest,
  getBanner,
  getDJToplist,
  getPersonalized,
  getPersonalizedMV,
  getPPList,
  getRecommendSongs,
} from '@/api';
import recommend from '@/assets/img/recommend.jpg';
import Banner from '@/components/banner';
import Card, { CardData } from '@/components/card';
import Img, { IconOptions } from '@/components/img';
import Title from '@/components/title';
import { DynamicPage, Page } from '@/router';
import {
  AppDispatch,
  fetchAndSetCurrentTrack,
  insertSong,
  RootState,
  setCurrentTrack,
} from '@/store';
import { BannerType, Personalized, Track } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

import List, { ListData, ListParams } from './list';

const FindMusic: FC = () => {
  const getClass = classGenerator('find-music');
  const isLogin = useSelector((state: RootState) => !!state.user.cookie);
  const [banner, setBanner] = useState<BannerType[]>([]);
  const [personalized, setPersonalized] = useState<CardData[]>([]);
  const [recommendSongs, setRecommendSongs] = useState<Track[]>([]);
  const [privateList, setPrivateList] = useState<CardData[]>([]);
  const [personalizedMV, setPersonalizedMV] = useState<CardData[]>([]);
  const [albumNewest, setAlbumNewest] = useState<ListData[]>([]);
  const [djToplist, setDJToplist] = useState<ListData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
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
        <strong className={getClass('ordinal')}>{(i * len) / 2 + j + 1}</strong>
        <div>
          <div>{item.name}</div>
          {<div className={getClass('artist')}>{item.extra?.artistName}</div>}
        </div>
      </>
    );
  }

  function renderDJToplist({ item }: ListParams) {
    return (
      <div className={getClass('list')}>
        <div className={getClass('list-name')}>{item.name}</div>
        <div className={getClass('list-detail')}>{item.extra?.description}</div>
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

  function handleMVTitleClick() {
    if (isLogin) push(Page.video);
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
    <div className={getClass()}>
      <Banner data={banner} onBannerClick={handleSongInserted} />
      <Title name="推荐歌单" onClick={() => push(Page.findMusicMusicList)} />
      <div className={getClass('card')}>
        {isLogin && (
          <div className={getClass('card-item')}>
            <div className={getClass('card-wrapper')} onClick={() => push(Page.dailyRecommend)}>
              <header>根据您的音乐口味生成每日更新</header>
              <strong>{today}</strong>
              <Img
                className={getClass('card-img')}
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
          <div key={item.id} className={getClass('card-item')}>
            <Img
              className={getClass('card-img')}
              src={resizeImg(item.imgUrl, 135)}
              icon={iconConfig}
              onClick={() => push(DynamicPage.list(item.id))}
              onIconClick={() => dispatch(fetchAndSetCurrentTrack(item.id))}
            />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <Title
        name="独家放送"
        welt
        onClick={() => {
          // TODO: 独家放送页面
        }}
      />
      <Card
        type="rectangle"
        data={privateList}
        onItemClick={id => push(DynamicPage.playVideo(id))}
      />
      <Title name="最新音乐" onClick={() => push(Page.findMusicNewest)} />
      <List
        icon
        data={albumNewest}
        functionChildren={renderAlbumNewest}
        onItemClick={handleSongInserted}
      />
      <Title name="推荐MV" onClick={handleMVTitleClick} />
      <Card
        type="rectangle"
        data={personalizedMV}
        onItemClick={id => push(DynamicPage.playVideo(id))}
      />
      <Title name="主播电台" welt onClick={() => push(Page.findMusicRadioHost)} />
      <List
        size="medium"
        data={djToplist}
        functionChildren={renderDJToplist}
        onItemClick={id => push(DynamicPage.radioList(id))}
      />
    </div>
  );
};

export default FindMusic;
