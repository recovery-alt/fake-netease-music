import React, { useEffect, useState } from 'react';
import './music-list.less';
import { CrownOutlined, GlobalOutlined } from '@ant-design/icons';
import { getMusicCategory } from '@/api';
import { UserPlaylist } from '@/types';
import { usePopover, useTopPlaylist } from './hooks';
import { Pagination } from 'antd';
import Img from '@/components/img';
import { useHistory } from 'react-router-dom';
import Popover from '@/views/video/popover';
import classNames from 'classnames';
import { classGenerator, resizeImg } from '@/utils';
import { fetchAndSetCurrentTrack } from '@/store';
import { useDispatch } from 'react-redux';
import { DynamicPage } from '@/router';
import styles from './popover.module.less';

const MusicList: React.FC = () => {
  const getClass = classGenerator('music-list');
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
  const { push } = useHistory();
  const dispatch = useDispatch();

  const { buttonContext, allMusicCategory } = usePopover(cat);

  useEffect(() => {
    (async () => {
      const res = await getMusicCategory();
      setMusicCategory(res.tags);
    })();
  }, []);

  function handleListItemClick(id: number) {
    push(DynamicPage.list(id));
  }

  function handleListItemIconClick(id: number) {
    dispatch(fetchAndSetCurrentTrack(id));
  }

  function renderPopover(setShow: (show: boolean) => void) {
    const getClass = classGenerator('popover', styles);
    function handleItemClick(cat: string) {
      setCat(cat);
      setShow(false);
    }

    return (
      <div className={getClass()}>
        <header className={getClass('header')}>
          <button
            className={classNames({ [styles['--active']]: cat === '全部' })}
            onClick={() => handleItemClick('全部')}
          >
            全部歌单
          </button>
        </header>
        {allMusicCategory.map(item => (
          <section key={item.name} className={getClass('item')}>
            <div className={getClass('left')}>
              <GlobalOutlined />
              <span>{item.name}</span>
            </div>
            <div className={getClass('right')}>
              {item.data.map(sub => (
                <div
                  key={sub.name}
                  className={classNames(getClass('label'), {
                    [styles['--active']]: sub.name === cat,
                  })}
                  onClick={() => handleItemClick(sub.name)}
                >
                  <span>{sub.name}</span>
                  {sub.hot && <strong>HOT</strong>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className={getClass()}>
      <header className={getClass('banner')}>
        {topPlaylistHighquality?.coverImgUrl && (
          <img src={resizeImg(topPlaylistHighquality.coverImgUrl, 300)} alt="banner" />
        )}
        <div className={getClass('banner-right')}>
          <button>
            <CrownOutlined /> 精品歌单
          </button>
          <h2>{topPlaylistHighquality?.name}</h2>
          <h3>{topPlaylistHighquality?.copywriter}</h3>
        </div>
      </header>
      <section className={getClass('guide')}>
        <Popover context={buttonContext} functionChildren={renderPopover} />
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
      <section className={getClass('card')}>
        {topPlaylist.map(item => (
          <div key={item.id} className={getClass('item')}>
            <Img
              className={getClass('img')}
              src={resizeImg(item.imgUrl)}
              icon={{ size: 'big', hoverDisplay: true, placement: 'bottom' }}
              onClick={() => handleListItemClick(item.id)}
              onIconClick={() => handleListItemIconClick(item.id)}
            />
            <p onClick={() => handleListItemClick(item.id)}>{item.name}</p>
          </div>
        ))}
      </section>
      <footer className={getClass('footer')}>
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
