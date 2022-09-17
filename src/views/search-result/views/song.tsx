import { RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Img from '@/components/img';
import Table, { Column } from '@/components/table';
import { SearchType } from '@/enum';
import { DynamicPage } from '@/router';
import { AppDispatch, insertSong } from '@/store';
import {
  Artist,
  Concert,
  Data,
  SearchMultimatchOrderType,
  SearchSong,
  SimpleAlbum,
  Song as SongType,
  UserPlaylist,
} from '@/types';
import { classGenerator, formatMS, noop, resizeImg } from '@/utils';

import { Props, usePagination } from '../hook';
import styles from './song.module.less';

const Song: FC<Props> = props => {
  const getClass = classGenerator('song', styles);
  const { bestMatch, ...restProps } = props;
  const params = { ...restProps, currentType: SearchType.SONG, limit: 100 };
  const { wrapEmpty } = usePagination<SearchSong>(params);
  const { push } = useHistory();
  const dispatch = useDispatch<AppDispatch>();
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
        album: () => push(DynamicPage.list(id, 'album')),
        artist: () => push(DynamicPage.singer(id)),
        playlist: () => push(DynamicPage.list(id)),
        song: noop,
        concert: noop,
        orpheus: noop,
      };

      strategy[type]();
    }

    return data ? (
      <div
        key={i}
        className={getClass('best-match')}
        onClick={() => handleItemClick(type, data.id)}
      >
        <div className={getClass('left')}>
          <Img src={resizeImg(data.imgUrl, 100)} className={getClass('img')} />
          <div>
            <div>{data.name}</div>
            <div className={getClass('subtitle')}>{data.subtitle}</div>
          </div>
        </div>
        <RightOutlined />
      </div>
    ) : null;
  }

  return wrapEmpty(data => (
    <div className={getClass()}>
      {bestMatch?.orders && (
        <header className={getClass('header')}>
          <div className={getClass('title')}>最佳匹配</div>
          <div className={getClass('wrapper')}>
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
