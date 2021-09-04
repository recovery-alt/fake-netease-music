import React, { useEffect, useState } from 'react';
import styles from './keyword-suggestion.module.less';
import { getSearchSuggest } from '@/api';
import {
  CustomerServiceOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Album, Artist, Playlist, SearchSuggest, Song, SimpleAlbum } from '@/types';

type Props = { keyword: string };

const KeywordSuggestion: React.FC<Props> = ({ keyword }) => {
  const [data, setData] = useState<SearchSuggest>({});
  const map = {
    albums: {
      label: '专辑',
      icon: PlayCircleOutlined,
    },
    artists: {
      label: '歌手',
      icon: UserOutlined,
    },
    playlists: {
      label: '歌单',
      icon: UnorderedListOutlined,
    },
    songs: {
      label: '单曲',
      icon: CustomerServiceOutlined,
    },
  };

  useEffect(() => {
    (async () => {
      const res = await getSearchSuggest(keyword);
      setData(res.result);
    })();
  }, [keyword]);

  return data.order?.length ? (
    <div className={styles['keyword-suggestion']}>
      <header className={styles['keyword-suggestion__header']}>
        搜“<span>{keyword}</span>”相关的结果 &gt;
      </header>
      {data.order.map(key => {
        const item = map[key];
        const dataArr = data[key];

        return (
          <>
            <div className={styles['keyword-suggestion__title']}>
              <item.icon />
              {item.label}
            </div>
            {dataArr?.map(dataItem => {
              const stratrgy = {
                albums: () => {
                  const item = dataItem as SimpleAlbum;
                  return (
                    <>
                      {item.name} - {item.artist.name}
                    </>
                  );
                },
                artists: () => {
                  const item = dataItem as Artist;
                  return <>{item.name}</>;
                },
                playlists: () => {
                  const item = dataItem as Playlist;
                  return <>{item.name}</>;
                },
                songs: () => {
                  const item = dataItem as Song;
                  const transNames = item.transNames || item.alias?.join(' ') || '';
                  return (
                    <>
                      {item.name}
                      {transNames ? `（${transNames}）` : ''}-{' '}
                      {item.artists.reduce((acc, val) => `${acc} ${val.name}`, '').slice(1)}
                    </>
                  );
                },
              };

              const execute = stratrgy[key];

              return <div className={styles['keyword-suggestion__item']}>{execute()}</div>;
            })}
          </>
        );
      })}
    </div>
  ) : null;
};

export default KeywordSuggestion;
