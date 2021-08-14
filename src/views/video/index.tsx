import React, { useEffect, useState, useMemo } from 'react';
import './video.less';
import { RightOutlined } from '@ant-design/icons';
import { getVideoCategoryList, VideoCategogy, getVideoGroup, VideoType } from '@/api';
import Nav, { NavItem } from '@/components/nav';
import List, { ListItem } from './components/list';

const Video: React.FC = () => {
  const [videoCategory, setVideoCategory] = useState<NavItem[]>([]);
  const [selected, SetSelected] = useState<number>(0);
  const [videoList, setVideoList] = useState<ListItem[]>([]);
  const current = useMemo(() => videoCategory[selected] || null, [selected, videoCategory]);

  useEffect(() => {
    (async () => {
      const res = await getVideoCategoryList();
      setVideoCategory(res.data.map(item => ({ name: item.name, id: item.id })));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!current) return;
      const res = await getVideoGroup(current.id as number);
      const result = res.datas.map(item => {
        const { coverUrl: imgUrl, title: description, creator } = item.data;
        const { nickname: author } = creator;
        return { imgUrl, description, author };
      });
      setVideoList(result);
    })();
  }, [current]);

  return (
    <div className="video">
      <header className="video__header">
        <button className="video__button">
          {current?.name} <RightOutlined />
        </button>
        <Nav data={videoCategory} />
      </header>
      <List data={videoList} />
    </div>
  );
};

export default Video;
