import React, { useEffect, useState } from 'react';
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
} from '@/api';
import { BannerType, Personalized } from '@/types';
import { useDispatch } from 'react-redux';
import { insertSong, fetchAndSetCurrentTrack } from '@/store';
import { useHistory } from 'react-router-dom';

const FindMusic: React.FC = () => {
  const [banner, setBanner] = useState<BannerType[]>([]);
  const [personalized, setPersonalized] = useState<CardData[]>([]);
  const [privateList, setPrivateList] = useState<CardData[]>([]);
  const [personalizedMV, setPersonalizedMV] = useState<CardData[]>([]);
  const [albumNewest, setAlbumNewest] = useState<ListData[]>([]);
  const [djToplist, setDJToplist] = useState<ListData[]>([]);
  const dispatch = useDispatch();
  const { push } = useHistory();

  function CardDataAdapter(personalizedList: Personalized[]) {
    return personalizedList.map(item => {
      const { id, name, picUrl: imgUrl } = item;
      return { id, name, imgUrl };
    });
  }

  function handleSongInserted(id: number) {
    dispatch(insertSong(id));
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
      const result = res.albums.map(item => ({
        id: item.id,
        name: item.name,
        imgUrl: item.picUrl,
        extra: { artistName: item.artist.name },
      }));
      setAlbumNewest(result);
    });
    getDJToplist().then(res => {
      const result = res.toplist.map(item => ({
        id: item.id,
        name: item.name,
        imgUrl: item.picUrl,
        extra: { description: item.rcmdtext },
      }));
      setDJToplist(result);
    });
  }, []);

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

  return (
    <div className="find-music">
      <Banner data={banner} onBannerClick={handleSongInserted} />
      <Title name="推荐歌单" />
      <Card
        data={personalized}
        icon={{ size: 'medium', hoverDisplay: true, placement: 'bottom' }}
        onItemClick={id => push(`/list/${id}`)}
        onItemIconClick={id => dispatch(fetchAndSetCurrentTrack(id))}
      />
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
