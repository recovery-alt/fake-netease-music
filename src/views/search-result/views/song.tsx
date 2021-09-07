import React from 'react';
import styles from './song.module.less';
import Img from '@/components/img';
import { RightOutlined } from '@ant-design/icons';
import Table, { Column } from '@/components/table';
import {
  Song as SongType,
  SearchSong,
  SearchMultimatchOrderType,
  SimpleAlbum,
  Artist,
  Playlist,
  Concert,
  Data,
} from '@/types';
import { formatMS, noop, resizeImg } from '@/utils';
import { usePagination, Props } from '../hook';
import { SearchType } from '@/enum';
import dayjs from 'dayjs';

const Song: React.FC<Props> = props => {
  const { bestMatch, ...restProps } = props;
  const params = { ...restProps, currentType: SearchType.SONG, limit: 100 };
  const { wrapEmpty } = usePagination<SearchSong>(params);
  const columns: Column<SongType>[] = [
    { title: '', key: 'ordinal' },
    { title: '', key: 'action' },
    { title: '音乐标题', key: 'name' },
    {
      title: '歌手',
      render(track) {
        return track.artists.map(item => <span key={item.id}>{item.name}</span>);
      },
    },
    { title: '专辑', key: 'album.name' },
    {
      title: '时长',
      key: 'duration',
      format: formatMS,
    },
  ];

  function renderBestmatch(item: SearchMultimatchOrderType, i: number) {
    if (!bestMatch) return;
    type DataType = { name: string; imgUrl: string; subtitle?: string };
    const strategy: Data<() => DataType> = {
      album: () => {
        const { name, picUrl: imgUrl, artist } = bestMatch[item][0] as SimpleAlbum;
        const subtitle = artist.name;
        return { name, imgUrl, subtitle };
      },
      artist: () => {
        const { name, picUrl: imgUrl } = bestMatch[item][0] as Artist;
        return { name, imgUrl };
      },
      playlist: () => {
        const { name, coverImgUrl: imgUrl } = bestMatch[item][0] as Playlist;
        return { name, imgUrl };
      },
      song: () => {
        const { name, album } = bestMatch[item] as SongType;
        const imgUrl = album.picUrl;
        return { name, imgUrl };
      },
      concert: () => {
        const { cover: imgUrl, title: name, time } = bestMatch[item][0] as Concert;
        const subtitle = time
          .reduce((acc, val) => `${acc}-${dayjs(val).format('M月D日')}`, '')
          .slice(1);
        return { name, imgUrl, subtitle };
      },
    };

    const execute = strategy[item] || noop;

    const data: DataType = execute();

    return data ? (
      <div key={i} className={styles['song__best-match']}>
        <div className={styles['song__left']}>
          <Img src={resizeImg(data.imgUrl, 100)} className={styles['song__img']} />
          <div>
            <div>{data.name}</div>
            <div className={styles.song__subtitle}>{data.subtitle}</div>
          </div>
        </div>
        <RightOutlined />
      </div>
    ) : null;
  }

  return wrapEmpty(data => (
    <div className={styles.song}>
      {bestMatch?.orders && (
        <header className={styles.song__header}>
          <div className={styles.song__title}>最佳匹配</div>
          <div className={styles['song__wrapper']}>
            {bestMatch.orders.filter(item => item !== 'orpheus').map(renderBestmatch)}
          </div>
        </header>
      )}
      <Table columns={columns} data={data.songs} />
    </div>
  ));
};

export default Song;
