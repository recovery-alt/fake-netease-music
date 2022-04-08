import { useEffect, useState, FC } from 'react';
import styles from './mv.module.less';
import Img from '@/components/img';
import { getArtistMV } from '@/api';
import { MV as MVType } from '@/types';
import { classGenerator, resizeImg } from '@/utils';
import { DynamicPage } from '@/router';
import { useHistory } from 'react-router-dom';
import { clearRequests } from '@/api/api';

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
