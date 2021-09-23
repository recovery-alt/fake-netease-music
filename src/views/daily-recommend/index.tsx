import React, { useEffect, useState } from 'react';
import './daily-recommend.less';
import calendar from '@/assets/img/calendar.png';
import Button from '@/components/button';
import { FolderAddOutlined } from '@ant-design/icons';
import Table from '@/components/table';
import { CommonColumns } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTrack, RootState } from '@/store';
import { getRecommendSongs } from '@/api';
import { Track } from '@/types';
import { classGenerator } from '@/utils';

const DailyRecommend: React.FC = () => {
  const getClass = classGenerator('daily-recommend');
  const [recommendSongs, setRecommendSongs] = useState<Track[]>([]);
  const isLogin = useSelector((state: RootState) => !!state.user.cookie);
  const dispatch = useDispatch();

  async function loadRecommendSongs() {
    if (!isLogin) return;
    const res = await getRecommendSongs();
    setRecommendSongs(res.data.dailySongs);
  }

  function handlePlay(current = 0) {
    const tracks = recommendSongs;
    dispatch(setCurrentTrack({ tracks, current, fm: [] }));
  }

  useEffect(() => {
    loadRecommendSongs();
  }, []);

  return (
    <div className="daily-recommend">
      <header className={getClass('header')}>
        <div className={getClass('top')}>
          <div className={getClass('calendar')}>
            <img src={calendar} alt="日历" />
            <strong>17</strong>
          </div>
          <div className={getClass('title')}>
            <h2>每日歌曲推荐</h2>
            <div>根据你的音乐口味生成，每天6:00更新</div>
          </div>
        </div>
        <div className={getClass('bottom')}>
          <Button compose onClick={() => handlePlay()} />
          <Button className={getClass('button')}>
            <FolderAddOutlined />
            收藏全部
          </Button>
        </div>
      </header>
      <Table data={recommendSongs} columns={CommonColumns} onDoubleClick={handlePlay} />
    </div>
  );
};

export default DailyRecommend;
