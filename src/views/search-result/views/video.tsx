import { SearchVideo } from '@/types';
import React from 'react';
import { usePagination, Props } from '../hook';
import { SearchType } from '@/enum';
import styles from './video.module.less';
import Img from '@/components/img';
import { resizeImg } from '@/utils';
import classNames from 'classnames';

const Video: React.FC<Props> = props => {
  const params = { ...props, currentType: SearchType.VIDEO, limit: 21 };
  const { wrapEmpty } = usePagination<SearchVideo>(params);

  return wrapEmpty(data => (
    <div className={styles.video}>
      {data.videos.map(item => (
        <div key={item.vid} className={styles.video__item}>
          <Img src={resizeImg(item.coverUrl, 460, 260)} className={styles.video__img} />
          <div className={styles.video__description}>
            <h2 className={classNames({ [styles['--mv']]: item.type === 0 })}>{item.title}</h2>
            <h3>by {item.creator.reduce((acc, val) => `${acc},${val.userName}`, '').slice(1)}</h3>
          </div>
        </div>
      ))}
    </div>
  ));
};

export default Video;
