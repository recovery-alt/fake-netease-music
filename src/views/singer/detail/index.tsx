import { FC, useEffect, useState } from 'react';

import { getArtistDesc } from '@/api';
import { clearRequests } from '@/api/api';
import { ArtistDesc } from '@/types';
import { classGenerator } from '@/utils';

import styles from './detail.module.less';

type Props = { id: number };

const Detail: FC<Props> = ({ id }) => {
  const getClass = classGenerator('detail', styles);
  const [artistDesc, setArtistDesc] = useState<ArtistDesc>();

  async function loadArtistDesc() {
    const res = await getArtistDesc(id);
    setArtistDesc(res);
  }

  useEffect(() => {
    loadArtistDesc();

    return clearRequests;
  }, [id]);

  return (
    <div className={getClass()}>
      {artistDesc?.introduction.map(item => (
        <div key={item.ti}>
          <h2>{item.ti}</h2>
          <p>{item.txt}</p>
        </div>
      ))}
    </div>
  );
};

export default Detail;
