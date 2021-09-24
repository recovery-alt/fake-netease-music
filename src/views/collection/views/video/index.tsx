import React, { useState, useEffect } from 'react';
import Header from '../../header';
import './video.less';
import List, { ListItem } from '@/views/video/list';
import { getMVSublist } from '@/api';
import { classGenerator } from '@/utils';

const Video: React.FC = () => {
  const getClass = classGenerator('collection-video');
  const [data, setData] = useState<ListItem[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getMVSublist();
      const result = res.data.map(item => {
        const { id, coverUrl: imgUrl, title: description, creator } = item;
        const author = creator.reduce((acc, val) => `${acc}/${val}`, '').slice(1);

        return { id, imgUrl, description, author };
      });

      setData(result);
    })();
  }, []);

  return (
    <div className={getClass()}>
      <Header title="收藏的视频" count={8} />
      <div className={getClass('list')}>
        <List data={data} />
      </div>
    </div>
  );
};

export default Video;
