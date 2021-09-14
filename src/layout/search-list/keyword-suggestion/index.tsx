import React, { useEffect, useState } from 'react';
import styles from './keyword-suggestion.module.less';
import { getSearchSuggest } from '@/api';
import {
  CustomerServiceOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Artist, UserPlaylist, SearchSuggest, Song, SimpleAlbum, SuggestOrderType } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useHistory } from 'react-router-dom';
import debounce from 'lodash/debounce';

type Props = { setVisible: (visible: boolean) => void };

const KeywordSuggestion: React.FC<Props> = ({ setVisible }) => {
  const keywords = useSelector((state: RootState) => state.controller.keywords);
  const [data, setData] = useState<SearchSuggest>({});
  const { push } = useHistory();
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

  function handleItemClick(id: number, key: SuggestOrderType) {
    // TODO
  }

  function handleTitleClick() {
    setVisible(false);
    push({ pathname: '/search-result', state: { keywords } });
  }

  function renderOrder(key: SuggestOrderType) {
    const item = map[key];
    const dataArr = data[key];

    return (
      <>
        <div key={item.label} className={styles['keyword-suggestion__title']}>
          <item.icon />
          {item.label}
        </div>
        {dataArr?.map(datItem => renderSuggestionItem(datItem, key))}
      </>
    );
  }

  function renderSuggestionItem(
    dataItem: Song | Artist | SimpleAlbum | UserPlaylist,
    key: SuggestOrderType
  ) {
    const stratrgy = {
      albums: () => {
        const item = dataItem as SimpleAlbum;
        return `${item.name} - ${item.artist.name}`;
      },
      artists: () => {
        const item = dataItem as Artist;
        return item.name;
      },
      playlists: () => {
        const item = dataItem as UserPlaylist;
        return item.name;
      },
      songs: () => {
        const item = dataItem as Song;
        let transNames = item.transNames || item.alias?.join(' ') || '';
        transNames = transNames ? `（${transNames}）` : '';
        const artist = item.artists.reduce((acc, val) => `${acc} ${val.name}`, '').slice(1);
        return `${item.name} ${transNames}- ${artist}`;
      },
    };

    const execute = stratrgy[key];

    return (
      <div
        key={dataItem.id}
        className={styles['keyword-suggestion__item']}
        onClick={() => handleItemClick(dataItem.id, key)}
      >
        {execute()}
      </div>
    );
  }

  useEffect(
    debounce(() => {
      (async () => {
        const res = await getSearchSuggest(keywords);
        setData(res.result);
      })();
    }, 500),
    [keywords]
  );

  return data.order?.length ? (
    <div className={styles['keyword-suggestion']}>
      <header className={styles['keyword-suggestion__header']}>
        <span onClick={handleTitleClick}>
          搜“<strong>{keywords}</strong>”相关的结果 &gt;
        </span>
      </header>
      {data.order.map(renderOrder)}
    </div>
  ) : null;
};

export default KeywordSuggestion;
