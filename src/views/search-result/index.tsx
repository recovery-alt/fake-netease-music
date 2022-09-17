import './search-result.less';

import { Tabs } from 'antd';
import { parse } from 'qs';
import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getSearchMultimatch } from '@/api';
import { clearRequests } from '@/api/api';
import { SearchType } from '@/enum';
import { SearchSuggest } from '@/types';
import { classGenerator } from '@/utils';

import Album from './views/album';
import Lyric from './views/lyric';
import Playlist from './views/playlist';
import Radio from './views/radio';
import Singer from './views/singer';
import Song from './views/song';
import UserProfile from './views/user';
import Video from './views/video';

export const getClass = classGenerator('search-result');

const SearchResult: FC = () => {
  const [total, setTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bestMatch, setBestMatch] = useState<SearchSuggest>();
  const { search } = useLocation();
  const keywords = useMemo(
    () => parse(search.slice(1), { charset: 'utf-8' }).keywords as string,
    [search]
  );
  const tabs = [
    {
      type: SearchType.SONG,
      key: 'song',
      unit: '首',
      tab: '单曲',
      component: Song,
    },
    {
      type: SearchType.SINGER,
      key: 'singer',
      unit: '位',
      tab: '歌手',
      component: Singer,
    },
    {
      type: SearchType.ALBUM,
      key: 'album',
      unit: '张',
      tab: '专辑',
      component: Album,
    },
    {
      type: SearchType.VIDEO,
      key: 'video',
      unit: '个',
      tab: '视频',
      component: Video,
    },
    {
      type: SearchType.PLAYLIST,
      key: 'playlist',
      unit: '个',
      tab: '歌单',
      component: Playlist,
    },
    {
      type: SearchType.LYRIC,
      key: 'lyric',
      unit: '首',
      tab: '歌词',
      component: Lyric,
    },
    {
      type: SearchType.RADIO,
      key: 'radio',
      unit: '个',
      tab: '主播电台',
      component: Radio,
    },
    {
      type: SearchType.USER,
      key: 'user',
      unit: '个',
      tab: '用户',
      component: UserProfile,
    },
  ];
  const current = useMemo(() => tabs[currentIndex], [currentIndex]);

  function handleTabChange(key: string) {
    const index = tabs.findIndex(item => item.key === key);
    if (index > -1) setCurrentIndex(index);
  }

  async function loadBestMatch() {
    const res = await getSearchMultimatch(keywords);
    setBestMatch(res.result);
  }

  useEffect(() => {
    loadBestMatch();

    return clearRequests;
  }, [keywords]);

  return (
    <div className="search-result">
      <header className={getClass('header')}>
        <strong>{keywords} </strong>
        {`找到${total}${current.unit}${current.tab === '主播电台' ? '电台' : current.tab}`}
      </header>
      <Tabs onChange={handleTabChange}>
        {tabs.map(item => {
          return (
            <Tabs.TabPane key={item.key} tab={item.tab}>
              <item.component
                type={current.type}
                keywords={keywords}
                setTotal={setTotal}
                bestMatch={item.key === 'song' ? bestMatch : undefined}
              />
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default SearchResult;
