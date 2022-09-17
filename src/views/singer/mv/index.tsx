import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getArtistMV } from '@/api';
import { clearRequests } from '@/api/api';
import Img from '@/components/img';
import { DynamicPage } from '@/router';
import { MV as MVType } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

import styles from './mv.module.less';

type Props = { id: number };

const MV: FC<Props> = ({ id }) => {
  const getClass = classGenerator('mv', styles);
  const [mvs, setMVs] = useState<MVType[]>([]);
  const { push } = useHistory();

  async function loadArtistMV() {
    const res = await getArtistMV(id);
    setMVs(res.mvs);
  }

  function toPlayVideoPage(id: number | string) {
    push(DynamicPage.playVideo(id));
  }

  useEffect(() => {
    loadArtistMV();

    return clearRequests;
  }, [id]);

  return (
    <div className={getClass()}>
      {mvs.map(item => (
        <div key={item.id} className={getClass('item')} onClick={() => toPlayVideoPage(item.id)}>
          <Img src={resizeImg(item.imgurl, 230, 130)} className={getClass('img')} />
          <div className={getClass('description')}>{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default MV;
