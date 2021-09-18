import React, { useEffect, useState } from 'react';
import styles from './similar.module.less';
import Img from '@/components/img';
import { getSimiArtist } from '@/api';
import { Artist } from '@/types';
import { useHistory } from 'react-router-dom';
import { DynamicPage } from '@/router';

type Props = { id: number };

const Similar: React.FC<Props> = ({ id }) => {
  const [simiArtist, setSimiArtist] = useState<Artist[]>([]);
  const { push } = useHistory();

  async function loadSimiArtist() {
    const res = await getSimiArtist(id);
    setSimiArtist(res.artists);
  }

  useEffect(() => {
    loadSimiArtist();
  }, [id]);

  return (
    <div className={styles.similar}>
      {simiArtist.map(item => (
        <div
          key={item.id}
          className={styles.similar__item}
          onClick={() => push(DynamicPage.singer(item.id))}
        >
          <Img src={item.picUrl} className={styles.similar__img} />
          <div className={styles.similar__description}>{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Similar;
