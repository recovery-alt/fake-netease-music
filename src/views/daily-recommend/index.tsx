import './daily-recommend.less';

import { FolderAddOutlined } from '@ant-design/icons';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRecommendSongs } from '@/api';
import calendar from '@/assets/img/calendar.png';
import Button from '@/components/button';
import Table from '@/components/table';
import { CommonColumns } from '@/config';
import { AppDispatch, RootState, setCurrentTrack } from '@/store';
import { Track } from '@/types';
import { classGenerator } from '@/utils';

const DailyRecommend: FC = () => {
  const getClass = classGenerator('daily-recommend');
  const [recommendSongs, setRecommendSongs] = useState<Track[]>([]);
  const isLogin = useSelector((state: RootState) => !!state.user.cookie);
  const dispatch = useDispatch<AppDispatch>();

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
    <div className={getClass()}>
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
