import './video.less';

import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getVideoCategoryList } from '@/api';
import { DynamicPage } from '@/router';
import { classGenerator } from '@/utils';

import { useMore, usePopover } from './hook';
import List from './list';
import Nav, { NavItem } from './nav';
import Popover from './popover';

const Video: FC = () => {
  const getClass = classGenerator('video');
  const [videoCategory, setVideoCategory] = useState<NavItem[]>([]);
  const [categoryId, setCategoryId] = useState<number | string>(0);
  const { push } = useHistory();
  const { buttonContext, videoGroupList } = usePopover(categoryId);
  const { moreText, videoList, footerRef } = useMore(categoryId);

  function handleItemClick(id: number | string) {
    push(DynamicPage.playVideo(id));
  }

  function handleNavClick(id: number | string) {
    setCategoryId(id);
  }

  async function loadVideoCategoryList() {
    const res = await getVideoCategoryList();
    setVideoCategory(res.data.map(item => ({ name: item.name, id: item.id })));
  }

  function renderPopover(setShow: (show: boolean) => void) {
    function handleTagClick(id: number | string) {
      setCategoryId(id);
      setShow(false);
    }

    function handleAllClick() {
      setCategoryId(0);
      setShow(false);
    }

    return (
      <div className={getClass('popover')}>
        <header className={getClass('popover-header')}>
          <button className={classNames({ ['--active']: !categoryId })} onClick={handleAllClick}>
            全部视频
          </button>
        </header>
        <div className={getClass('popover-main')}>
          {videoGroupList.map(item => (
            <div key={item.id}>
              <span
                className={classNames({ '--active': item.id === categoryId })}
                onClick={() => handleTagClick(item.id)}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  useEffect(() => {
    loadVideoCategoryList();
  }, []);

  return (
    <div className={getClass()}>
      <header className={getClass('header')}>
        <Popover context={buttonContext} functionChildren={renderPopover} />
        <Nav id={categoryId} data={videoCategory} onNavClick={handleNavClick} />
      </header>
      <List data={videoList} onItemClick={handleItemClick} />
      <footer ref={footerRef} className={getClass('footer')}>
        {moreText}
      </footer>
    </div>
  );
};

export default Video;
