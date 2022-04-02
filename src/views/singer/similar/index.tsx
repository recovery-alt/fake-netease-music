import { useEffect, useState, FC } from 'react';
import styles from './similar.module.less';
import Img from '@/components/img';
import { getSimiArtist } from '@/api';
import { Artist } from '@/types';
import { useHistory } from 'react-router-dom';
import { DynamicPage } from '@/router';
import { classGenerator } from '@/utils';

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
