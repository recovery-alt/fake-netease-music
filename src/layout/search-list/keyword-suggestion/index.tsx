import {
  CustomerServiceOutlined,
  PlayCircleOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { stringify } from 'qs';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'react-use';

import { getSearchSuggest } from '@/api';
import NoData from '@/components/no-data';
import { DynamicPage, Page } from '@/router';
import { AppDispatch, insertSong, RootState } from '@/store';
import { Artist, SearchSuggest, SimpleAlbum, Song, SuggestOrderType, UserPlaylist } from '@/types';
import { classGenerator } from '@/utils';

import styles from './keyword-suggestion.module.less';

type Props = { setVisible: (visible: boolean) => void };

const KeywordSuggestion: FC<Props> = ({ setVisible }) => {
  const getClass = classGenerator('keyword-suggestion', styles);
  const keywords = useSelector((state: RootState) => state.controller.keywords);
  const [data, setData] = useState<SearchSuggest>({});
  const { push } = useHistory();
  const dispatch = useDispatch<AppDispatch>();
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
    const strategy = {
      artists: () => push(DynamicPage.singer(id)),
      songs: () => dispatch(insertSong(id)),
      albums: () => push(DynamicPage.list(id, 'album')),
      playlists: () => push(DynamicPage.list(id)),
    };

    strategy[key]();
    setVisible(false);
  }

  function handleTitleClick() {
    setVisible(false);
    const query = stringify({ keywords });
    push(`${Page.searchResult}?${query}`);
  }

  function renderOrder(key: SuggestOrderType) {
    const item = map[key];
    const dataArr = data[key];

    return (
      <div key={item.label}>
        <div className={getClass('title')}>
          <item.icon />
          {item.label}
        </div>
        {dataArr?.map(datItem => renderSuggestionItem(datItem, key))}
      </div>
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
        className={getClass('item')}
        onClick={() => handleItemClick(dataItem.id, key)}
      >
        {execute()}
      </div>
    );
  }

  async function setSearchSuggest() {
    const res = await getSearchSuggest(keywords);
    setData(res.result);
  }

  useDebounce(setSearchSuggest, 300, [keywords]);

  return data.order?.length ? (
    <div className={getClass()}>
      <header className={getClass('header')}>
        <span onClick={handleTitleClick}>
          搜“<strong>{keywords}</strong>”相关的结果 &gt;
        </span>
      </header>
      {data.order.map(renderOrder)}
    </div>
  ) : (
    <NoData title="暂无数据" />
  );
};

export default KeywordSuggestion;
