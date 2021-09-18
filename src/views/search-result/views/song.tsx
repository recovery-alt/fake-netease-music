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
  UserPlaylist,
  Concert,
  Data,
} from '@/types';
import { formatMS, noop, resizeImg } from '@/utils';
import { usePagination, Props } from '../hook';
import { SearchType } from '@/enum';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { insertSong } from '@/store';

const Song: React.FC<Props> = props => {
  const { bestMatch, ...restProps } = props;
  const params = { ...restProps, currentType: SearchType.SONG, limit: 100 };
  const { wrapEmpty } = usePagination<SearchSong>(params);
  const { push } = useHistory();
  const dispatch = useDispatch();
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

  function renderBestmatch(type: SearchMultimatchOrderType, i: number) {
    if (!bestMatch) return;
    type DataType = { id: number; name: string; imgUrl: string; subtitle?: string };
    const strategy: Data<() => DataType> = {
      album: () => {
        const { id, name, picUrl: imgUrl, artist } = bestMatch[type][0] as SimpleAlbum;
        const subtitle = artist.name;
        return { id, name, imgUrl, subtitle };
      },
      artist: () => {
        const { id, name, picUrl: imgUrl } = bestMatch[type][0] as Artist;
        return { id, name, imgUrl };
      },
      playlist: () => {
        const { id, name, coverImgUrl: imgUrl } = bestMatch[type][0] as UserPlaylist;
        return { id, name, imgUrl };
      },
      song: () => {
        const { id, name, album } = bestMatch[type] as SongType;
        const imgUrl = album.picUrl;
        return { id, name, imgUrl };
      },
      concert: () => {
        const { id, cover: imgUrl, title: name, time } = bestMatch[type][0] as Concert;
        const subtitle = time
          .reduce((acc, val) => `${acc}-${dayjs(val).format('M月D日')}`, '')
          .slice(1);
        return { id, name, imgUrl, subtitle };
      },
    };

    const execute = strategy[type] || noop;

    const data: DataType = execute();

    function handleItemClick(type: SearchMultimatchOrderType, id: number) {
      const strategy = {
        album: () => push(`/list/${id}/album`),
        artist: () => push(`/singer/${id}`),
        playlist: () => push(`/list/${id}`),
        song: noop,
        concert: noop,
        orpheus: noop,
      };

      strategy[type]();
    }

    return data ? (
      <div
        key={i}
        className={styles['song__best-match']}
        onClick={() => handleItemClick(type, data.id)}
      >
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
      <Table
        columns={columns}
        data={data.songs}
        onDoubleClick={index => dispatch(insertSong(data.songs[index].id))}
      />
    </div>
  ));
};

export default Song;
