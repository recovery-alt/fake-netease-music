import React, { useState, useEffect } from 'react';
import './singer.less';
import List, { ListData } from '@/components/list';
import { getArtistSublist } from '@/api';
import Header from '../../header';
import { classGenerator } from '@/utils';
import { useHistory } from 'react-router-dom';
import { DynamicPage } from '@/router';

const Singer: React.FC = () => {
  const getClass = classGenerator('collection-singer');
  const [data, setData] = useState<ListData[]>([]);
  const { push } = useHistory();

  useEffect(() => {
    (async () => {
      const res = await getArtistSublist();
      const result = res.data.map(item => {
        const { id, picUrl: imgUrl, name: col2, mvSize, albumSize } = item;
        const col3 = `专辑：${albumSize}`;
        const col4 = `MV：${mvSize}`;
        return { id, imgUrl, col2, col3, col4 };
      });

      setData(result);
    })();
  }, []);

  return (
    <div className={getClass()}>
      <Header title="收藏的歌手" count={26} />
      <List data={data} onItemClick={id => push(DynamicPage.singer(id))} />
    </div>
  );
};

export default Singer;
