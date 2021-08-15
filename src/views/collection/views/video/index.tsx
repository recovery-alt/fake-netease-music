import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import './video.less';
import List, { ListItem } from '@/views/video/components/list';
import { getMVSublist } from '@/api';

const Video: React.FC = () => {
  const [data, setData] = useState<ListItem[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getMVSublist();
      const result = res.data.map(item => {
        const { coverUrl: imgUrl, title: description, creator } = item;
        const author = creator.reduce((acc, val) => `${acc}/${val}`, '').slice(1);

        return { imgUrl, description, author };
      });

      setData(result);
    })();
  }, []);

  return (
    <div className="collection-video">
      <Header title="收藏的视频" count={8} />
      <div className="collection-video__list">
        <List data={data} />
      </div>
    </div>
  );
};

export default Video;
