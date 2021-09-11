import React, { useEffect, useState, useRef } from 'react';
import './music-list.less';
import { CrownOutlined, RightOutlined } from '@ant-design/icons';
import { getMusicCategory } from '@/api';
import { UserPlaylist } from '@/types';
import { useTopPlaylist } from './hooks';
import { Pagination } from 'antd';
import Img from '@/components/img';
import { useHistory } from 'react-router-dom';
import Popover from './popover';
import classNames from 'classnames';
import { resizeImg } from '@/utils';
import { fetchAndSetCurrentTrack } from '@/store';
import { useDispatch } from 'react-redux';

const MusicList: React.FC = () => {
  const [musicCategory, setMusicCategory] = useState<UserPlaylist[]>([]);
  const {
    topPlaylist,
    total,
    current,
    setCurrent,
    loadTopPlaylist,
    topPlaylistHighquality,
    cat,
    setCat,
  } = useTopPlaylist();
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await getMusicCategory();
      setMusicCategory(res.tags);
    })();
  }, []);

  function handleListItemClick(id: number) {
    push(`/list/${id}`);
  }

  function handleListItemIconClick(id: number) {
    dispatch(fetchAndSetCurrentTrack(id));
  }

  return (
    <div className="music-list">
      <header className="music-list__banner">
        {topPlaylistHighquality?.coverImgUrl && (
          <img src={resizeImg(topPlaylistHighquality.coverImgUrl, 300)} alt="banner" />
        )}
        <div className="music-list__banner-right">
          <button>
            <CrownOutlined /> 精品歌单
          </button>
          <h2>{topPlaylistHighquality?.name}</h2>
          <h3>{topPlaylistHighquality?.copywriter}</h3>
        </div>
      </header>
      <section className="music-list__guide">
        {showPopover && (
          <Popover
            cat={cat}
            setCat={setCat}
            button={buttonRef.current}
            setShowPopover={setShowPopover}
          />
        )}
        <button ref={buttonRef} onClick={() => setShowPopover(!showPopover)}>
          {cat === '全部' ? '全部歌单' : cat}
          <RightOutlined />
        </button>
        <ul>
          {musicCategory.map(item => (
            <li
              key={item.id}
              className={classNames({ '--active': item.name === cat })}
              onClick={() => setCat(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </section>
      <section className="music-list__card">
        {topPlaylist.map(item => (
          <div key={item.id} className="music-list__item">
            <Img
              className="music-list__img"
              src={resizeImg(item.imgUrl)}
              icon={{ size: 'large', hoverDisplay: true, placement: 'bottom' }}
              onClick={() => handleListItemClick(item.id)}
              onIconClick={() => handleListItemIconClick(item.id)}
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

export default MusicList;
