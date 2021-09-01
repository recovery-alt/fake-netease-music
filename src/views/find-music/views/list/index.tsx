import React, { useEffect, useState, useRef } from 'react';
import './list.less';
import { CrownOutlined, RightOutlined } from '@ant-design/icons';
import { getMusicCategory, getTopPlaylistHighquality } from '@/api';
import { Playlist } from '@/types';
import { useTopPlaylist } from './hooks';
import { Pagination } from 'antd';
import Img from '@/components/img';
import { useHistory } from 'react-router-dom';
import Popover from './popover';

const List: React.FC = () => {
  const [musicCategory, setMusicCategory] = useState<Playlist[]>([]);
  const [topPlaylistHighquality, setTopPlaylistHighquality] = useState<Playlist>();
  const { topPlaylist, total, current, setCurrent, loadTopPlaylist } = useTopPlaylist();
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { push } = useHistory();

  useEffect(() => {
    (async () => {
      const res = await getMusicCategory();
      setMusicCategory(res.tags);
    })();

    (async () => {
      const res = await getTopPlaylistHighquality();
      setTopPlaylistHighquality(res.playlists[0]);
    })();
  }, []);

  function handleListItemClick(id: number) {
    push(`/list/${id}`);
  }

  return (
    <div className="music-list">
      <header className="music-list__banner">
        <img src={topPlaylistHighquality?.coverImgUrl} alt="banner" />
        <div className="music-list__banner-right">
          <button>
            <CrownOutlined /> 精品歌单
          </button>
          <h2>{topPlaylistHighquality?.name}</h2>
          <h3>{topPlaylistHighquality?.copywriter}</h3>
        </div>
      </header>
      <section className="music-list__guide">
        {showPopover && <Popover button={buttonRef.current} setShowPopover={setShowPopover} />}
        <button ref={buttonRef} onClick={() => setShowPopover(!showPopover)}>
          全部歌单
          <RightOutlined />
        </button>
        <ul>
          {musicCategory.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </section>
      <section className="music-list__card">
        {topPlaylist.map(item => (
          <div key={item.id} className="music-list__item">
            <Img
              className="music-list__img"
              src={item.imgUrl}
              icon={{ size: 'large', hoverDisplay: true, placement: 'bottom' }}
              onClick={() => handleListItemClick(item.id)}
            />
            <p onClick={() => handleListItemClick(item.id)}>{item.name}</p>
          </div>
        ))}
      </section>
      <footer className="music-list__footer">
        {total > 0 ? (
          <Pagination
            {...{ current, total }}
            onChange={(page, pageSize) => {
              setCurrent(page);
              loadTopPlaylist(page, pageSize);
            }}
            pageSize={100}
            showSizeChanger={false}
          />
        ) : null}
      </footer>
    </div>
  );
};

export default List;
