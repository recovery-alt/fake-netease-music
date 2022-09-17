import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getSimiArtist } from '@/api';
import { clearRequests } from '@/api/api';
import Img from '@/components/img';
import { DynamicPage } from '@/router';
import { Artist } from '@/types';
import { classGenerator } from '@/utils';

import styles from './similar.module.less';

type Props = { id: number };

const Similar: FC<Props> = ({ id }) => {
  const getClass = classGenerator('similar', styles);
  const [simiArtist, setSimiArtist] = useState<Artist[]>([]);
  const { push } = useHistory();

  async function loadSimiArtist() {
    const res = await getSimiArtist(id);
    setSimiArtist(res.artists);
  }

  useEffect(() => {
    loadSimiArtist();

    return clearRequests;
  }, [id]);

  return (
    <div className={getClass()}>
      {simiArtist.map(item => (
        <div
          key={item.id}
          className={getClass('item')}
          onClick={() => push(DynamicPage.singer(item.id))}
        >
          <Img src={item.picUrl} className={getClass('img')} />
          <div className={getClass('description')}>{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Similar;
