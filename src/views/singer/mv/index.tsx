import React, { useEffect, useState } from 'react';
import styles from './mv.module.less';
import Img from '@/components/img';
import { getArtistMV } from '@/api';
import { MV as MVType } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

type Props = { id: number };

const MV: React.FC<Props> = ({ id }) => {
  const getClass = classGenerator('mv', styles);
  const [mvs, setMVs] = useState<MVType[]>([]);

  async function loadArtistMV() {
    const res = await getArtistMV(id);
    setMVs(res.mvs);
  }

  useEffect(() => {
    loadArtistMV();
  }, [id]);
  return (
    <div className={getClass()}>
      {mvs.map(item => (
        <div key={item.id} className={getClass('item')}>
          <Img src={resizeImg(item.imgurl, 230, 130)} className={getClass('img')} />
          <div className={getClass('description')}>{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default MV;
