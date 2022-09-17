import './video.less';

import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getMVSublist } from '@/api';
import { DynamicPage } from '@/router';
import { classGenerator } from '@/utils';
import List, { ListItem } from '@/views/video/list';

import Header from '../../header';

const Video: FC = () => {
  const getClass = classGenerator('collection-video');
  const [data, setData] = useState<ListItem[]>([]);
  const [count, setCount] = useState(0);
  const { push } = useHistory();

  async function loadData() {
    const res = await getMVSublist();
    setCount(res.count);
    const result = res.data.map(item => {
      const { vid: id, coverUrl: imgUrl, title: description, creator } = item;
      const author = creator.reduce((acc, val) => `${acc}/${val.userName}`, '').slice(1);

      return { id, imgUrl, description, author };
    });

    setData(result);
  }

  useEffect(() => {
    loadData();
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
