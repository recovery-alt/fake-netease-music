import React, { useEffect, useState, useRef } from 'react';
import './list.less';
import img from '@/assets/img/avatar.svg';
import { CrownOutlined, RightOutlined, GlobalOutlined } from '@ant-design/icons';
import { getMusicCategory, Playlist, getAllMusicCategory, Subcategory } from '@/api';
import Card from '@/components/card';
import { useTopPlaylist } from './hooks';
import { Pagination } from 'antd';
import { useClickAway } from 'react-use';

const List: React.FC = () => {
  const [musicCategory, setMusicCategory] = useState<Playlist[]>([]);
  const { topPlaylist, total, current, setCurrent, loadTopPlaylist } = useTopPlaylist();
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    getMusicCategory().then(res => {
      setMusicCategory(res.tags);
    });
  }, []);

  const Popover: React.FC = () => {
    type MusicCategoryType = { name: string; data: Subcategory[] };
    const [allMusicCategory, setAllMusicCategory] = useState<MusicCategoryType[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    useClickAway(ref, () => {
      setShowPopover(false);
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
        {allMusicCategory.map((item, i) => (
          <section key={i} className="popover__item">
            <div className="popover__left">
              <GlobalOutlined />
              <span>{item.name}</span>
            </div>
            <div className="popover__right">
              {item.data.map((sub, i) => (
                <div key={i} className="popover__label">
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
        <img src={img} alt="banner" />
        <div className="music-list__banner-right">
          <button>
            <CrownOutlined /> 精品歌单
          </button>
          <h2>岁月唱片机，好莱坞老电影经典原声</h2>
          <h3>经典永恒，岁月留声</h3>
        </div>
      </header>
      <section className="music-list__guide">
        {showPopover && <Popover />}
        <button onClick={() => setShowPopover(true)}>
          全部歌单
          <RightOutlined />
        </button>
        <ul>
          {musicCategory.map((item, i) => (
            <li key={i}>{item.name}</li>
          ))}
        </ul>
      </section>
      <Card data={topPlaylist} width={170} height={170} />
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
