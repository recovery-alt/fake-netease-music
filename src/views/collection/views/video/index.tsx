import React, { useState, useEffect } from 'react';
import Header from '../../header';
import './video.less';
import List, { ListItem } from '@/views/video/list';
import { getMVSublist } from '@/api';
import { classGenerator } from '@/utils';
import { useHistory } from 'react-router-dom';
import { DynamicPage } from '@/router';

const Video: React.FC = () => {
  const getClass = classGenerator('collection-video');
  const [data, setData] = useState<ListItem[]>([]);
  const [count, setCount] = useState(0);
  const { push } = useHistory();

  useEffect(() => {
    (async () => {
      const res = await getMVSublist();
      setCount(res.count);
      const result = res.data.map(item => {
        const { vid: id, coverUrl: imgUrl, title: description, creator } = item;
        const author = creator.reduce((acc, val) => `${acc}/${val.userName}`, '').slice(1);

        return { id, imgUrl, description, author };
      });

      setData(result);
    })();
  }, []);

  return (
    <div className={getClass()}>
      <Header title="收藏的视频" count={count} />
      <div className={getClass('list')}>
        <List data={data} onItemClick={id => push(DynamicPage.playVideo(id))} />
      </div>
    </div>
  );
};

export default Video;
