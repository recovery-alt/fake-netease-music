import React, { useState, useEffect } from 'react';
import './collection.less';
import List, { ListData } from '@/components/list';
import Input from '@/components/input';
import { getAlbumSublist } from '@/api';
import disk from '@/assets/img/disk.svg';
import Header from './components/header';

const Collection: React.FC = () => {
  const myAlbums: ListData[] = [{ imgUrl: disk, col2: '我的数字专辑' }];
  const [albumSublist, setAlbumSublist] = useState<ListData[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getAlbumSublist();
      const result = res.data.map(item => {
        const { picUrl: imgUrl, name: col2, artists, size } = item;
        const col3 = artists.reduce((acc, val) => `${acc}/${val.name}`, '').slice(1);
        const col4 = `${size}首`;
        return { imgUrl, col2, col3, col4 };
      });
      setAlbumSublist(result);
    })();
  }, []);

  return (
    <div className="collection">
      <List data={myAlbums} />
      <Header title="收藏的专辑" count={2} style={{ marginTop: '4.5vh' }} />
      <List data={albumSublist} />
    </div>
  );
};

export default Collection;
