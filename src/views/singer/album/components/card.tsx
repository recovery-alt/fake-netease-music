import React from 'react';
import styles from '../album.module.less';
import Img from '@/components/img';
import { Props as AlbumProps } from '../';
import dayjs from 'dayjs';
import { resizeImg } from '@/utils';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAndSetCurrentTrack } from '@/store';

type Props = Omit<AlbumProps, 'type'>;

const Card: React.FC<Props> = ({ albums }) => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  return (
    <div className={styles.card}>
      {albums.map(item => (
        <div key={item.id} className={styles.card__item}>
          <div className={styles['card__img-wrapper']}>
            <Img
              src={resizeImg(item.picUrl, 150)}
              className={styles.card__img}
              icon={{ size: 'large', hoverDisplay: true }}
              onClick={() => push(`/list/${item.id}/album`)}
              onIconClick={() => dispatch(fetchAndSetCurrentTrack({ id: item.id, isAlbum: true }))}
            />
          </div>
          <div className={styles.card__description}>
            <div className={styles.card__title}>{item.name}</div>
            <div className={styles.card__subtitle}>
              {dayjs(item.publishTime).format('YYYY-MM-DD')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
