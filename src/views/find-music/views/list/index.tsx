import React, { useEffect, useState, useRef } from 'react';
import './list.less';
import { CrownOutlined, RightOutlined, GlobalOutlined } from '@ant-design/icons';
import {
  getMusicCategory,
  Playlist,
  getAllMusicCategory,
  Subcategory,
  getTopPlaylistHighquality,
} from '@/api';
import { useTopPlaylist } from './hooks';
import { Pagination } from 'antd';
import { useClickAway } from 'react-use';
import Img from '@/components/img';

const List: React.FC = () => {
  const [musicCategory, setMusicCategory] = useState<Playlist[]>([]);
  const [topPlaylistHighquality, setTopPlaylistHighquality] = useState<Playlist>();
  const { topPlaylist, total, current, setCurrent, loadTopPlaylist } = useTopPlaylist();
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const Popover: React.FC<{ button: HTMLButtonElement | null }> = ({ button }) => {
    type MusicCategoryType = { name: string; data: Subcategory[] };
    const [allMusicCategory, setAllMusicCategory] = useState<MusicCategoryType[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    useClickAway(ref, e => {
      if (e.target !== button) setShowPopover(false);
    });

    useEffect(() => {
      (async () => {
        const res = await getAllMusicCategory();
        const allMusicCategory = Object.keys(res.categories).map(key => {
          const item = res.categories[key];
          const data: Subcategory[] = [];
          const index = Number(key);
          const category: MusicCategoryType = { data, name: item };
          res.sub.forEach(sub => {
            if (sub.category === index) category.data.push(sub);
          });

          return category;
        });
        setAllMusicCategory(allMusicCategory);
      })();
    }, []);

    return (
      <div ref={ref} className="popover__wrapper">
        <header className="popover__header">
          <button>全部歌单</button>
        </header>
        {allMusicCategory.map(item => (
          <section key={item.name} className="popover__item">
            <div className="popover__left">
              <GlobalOutlined />
              <span>{item.name}</span>
            </div>
            <div className="popover__right">
              {item.data.map(sub => (
                <div key={sub.name} className="popover__label">
                  <span>{sub.name}</span>
                  {sub.hot && <strong>HOT</strong>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  };

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
        {showPopover && <Popover button={buttonRef.current} />}
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
            <Img className="music-list__img" src={item.imgUrl} />
            <p>{item.name}</p>
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
