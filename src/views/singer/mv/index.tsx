import React, { useEffect, useState } from 'react';
import styles from './mv.module.less';
import Img from '@/components/img';
import { getArtistMV } from '@/api';
import { MV as MVType } from '@/types';
import { resizeImg } from '@/utils';

type Props = { id: number };

const MV: React.FC<Props> = ({ id }) => {
  const [mvs, setMVs] = useState<MVType[]>([]);

  async function loadArtistMV() {
    const res = await getArtistMV(id);
    setMVs(res.mvs);
  }

  useEffect(() => {
    loadArtistMV();
  }, [id]);
  return (
    <div className={styles.mv}>
      {mvs.map((item, i) => (
        <div key={item.id} className={styles.mv__item}>
          <Img src={resizeImg(item.imgurl, 230, 130)} className={styles.mv__img} />
          <div className={styles.mv__description}>{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default MV;
