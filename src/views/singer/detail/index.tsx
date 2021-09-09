import React, { useEffect, useState } from 'react';
import styles from './detail.module.less';
import { getArtistDesc } from '@/api';
import { ArtistDesc } from '@/types';

type Props = { id: number };

const Detail: React.FC<Props> = ({ id }) => {
  const [artistDesc, setArtistDesc] = useState<ArtistDesc>();

  async function loadArtistDesc() {
    const res = await getArtistDesc(id);
    setArtistDesc(res);
  }

  useEffect(() => {
    loadArtistDesc();
  }, [id]);

  return (
    <div className={styles.detail}>
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
