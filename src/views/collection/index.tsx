import './collection.less';

import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getAlbumSublist } from '@/api';
import disk from '@/assets/img/disk.svg';
import List, { ListData } from '@/components/list';
import { DynamicPage } from '@/router';
import { classGenerator } from '@/utils';

import Header from './header';

const Collection: FC = () => {
  const getClass = classGenerator('collection');
  const myAlbums: ListData[] = [{ id: 0, imgUrl: disk, col2: '我的数字专辑' }];
  const [albumSublist, setAlbumSublist] = useState<ListData[]>([]);
  const { push } = useHistory();

  function toAlbumPage(id: number) {
    push(DynamicPage.list(id, 'album'));
  }

  async function loadAlbumSublist() {
    const res = await getAlbumSublist();
    const result = res.data.map(item => {
      const { id, picUrl: imgUrl, name: col2, artists, size } = item;
      const col3 = artists.reduce((acc, val) => `${acc}/${val.name}`, '').slice(1);
      const col4 = `${size}首`;
      return { id, imgUrl, col2, col3, col4 };
    });
    setAlbumSublist(result);
  }

  useEffect(() => {
    loadAlbumSublist();
  }, []);

  return (
    <div className={getClass()}>
      <List data={myAlbums} />
      <Header title="收藏的专辑" count={2} style={{ marginTop: '4.5vh' }} />
      <List data={albumSublist} onItemClick={toAlbumPage} />
    </div>
  );
};

export default Collection;
