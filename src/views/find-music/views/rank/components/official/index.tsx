import React from 'react';
import styles from './official.module.less';
import { PlayCircleFilled, RightOutlined } from '@ant-design/icons';
import { PlaylistDetail } from '@/api';
import Img from '@/components/img';

type Props = { data: PlaylistDetail };

const Official: React.FC<Props> = ({ data }) => (
  <div className={styles.official}>
    <div className={styles.official__left}>
      <Img className={styles.official__img} src={data.coverImgUrl} />
      <PlayCircleFilled />
    </div>
    <div className={styles.official__right}>
      <ul>
        {data.tracks.map((item, i) => (
          <li key={i} className={styles.official__item}>
            <div className={styles['official__item-left']}>
              <strong>{i + 1}</strong>
              <div>
                <span>-</span>
              </div>
              <span>{item.name}</span>
            </div>
            <div className={styles['official__item-right']}>
              {item.ar.reduce((acc, val) => `${acc}/${val.name}`, '').slice(1)}
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.official__all}>
        查看全部 <RightOutlined />
      </div>
    </div>
  </div>
);

export default Official;
