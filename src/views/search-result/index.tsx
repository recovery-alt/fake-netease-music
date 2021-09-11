import React, { useEffect, useMemo, useState } from 'react';
import './search-result.less';
import { Tabs } from 'antd';
import Song from './views/song';
import Singer from './views/singer';
import Album from './views/album';
import Video from './views/video';
import Playlist from './views/playlist';
import Lyric from './views/lyric';
import Radio from './views/radio';
import UserProfile from './views/user';
import { useLocation } from 'react-router-dom';
import { Data, SearchSuggest } from '@/types';
import { SearchType } from '@/enum';
import { getSearchMultimatch } from '@/api';

const { TabPane } = Tabs;

const SearchResult: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bestMatch, setBestMatch] = useState<SearchSuggest>();
  const { state } = useLocation<{ keywords: string }>();
  const keywords = state.keywords;
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

  useEffect(() => {
    (async () => {
      const res = await getSearchMultimatch(keywords);
      setBestMatch(res.result);
    })();
  }, [keywords]);

  return (
    <div className="search-result">
      <header className="search-result__header">
        <strong>{keywords} </strong>
        {`找到${total}${current.unit}${current.tab === '主播电台' ? '电台' : current.tab}`}
      </header>
      <Tabs onChange={handleTabChange}>
        {tabs.map(item => {
          return (
            <TabPane key={item.key} tab={item.tab}>
              <item.component
                type={current.type}
                keywords={keywords}
                setTotal={setTotal}
                bestMatch={item.key === 'song' ? bestMatch : undefined}
              />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default SearchResult;
