import React, { useState, useEffect } from 'react';
import './singer.less';
import List, { ListData } from '@/components/list';
import { getArtistSublist } from '@/api';
import Header from '../../components/header';

const Singer: React.FC = () => {
  const [data, setData] = useState<ListData[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getArtistSublist();
      const result = res.data.map(item => {
        const { picUrl: imgUrl, name: col2, mvSize, albumSize } = item;
        const col3 = `专辑：${albumSize}`;
        const col4 = `MV：${mvSize}`;
        return { imgUrl, col2, col3, col4 };
      });

      setData(result);
    })();
  }, []);

  return (
    <div className="collection-singer">
      <Header title="收藏的歌手" count={26} />
      <List data={data} />
    </div>
  );
};

export default Singer;
