import React, { useEffect, useMemo, useState } from 'react';
import { PlayCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import Img from '@/components/img';
import top50 from '@/assets/img/top50.png';
import styles from '../album.module.less';
import Table, { Column } from '@/components/table';
import { formatMS, resizeImg } from '@/utils';
import classNames from 'classnames';
import { Track } from '@/types';

export type Props = { title?: string; imgUrl?: string; data: Array<Track> };

const OverviewItem: React.FC<Props> = ({ title = '热门50首', imgUrl = top50, data }) => {
  const [previewAll, setPreviewAll] = useState(false);
  const columns: Column[] = [{ key: 'ordinal' }, { key: 'name' }, { key: 'dt', format: formatMS }];
  const sliceData = useMemo(() => (previewAll ? data : data.slice(0, 10)), [previewAll, data]);

  useEffect(() => {
    if (data.length < 10 && data.length > 0) setPreviewAll(true);
  }, [data]);

  return (
    <section className={styles.overview__item}>
      <Img
        src={resizeImg(imgUrl, 150)}
        className={classNames(styles.overview__img, {
          [styles['--top50']]: title === '热门50首',
        })}
      />
      <div className={styles.overview__right}>
        <header className={styles.overview__header}>
          <h2>{title}</h2>
          <div className={styles.overview__icon}>
            <PlayCircleOutlined />
            <FileAddOutlined />
          </div>
        </header>
        <div className={styles.overview__table}>
          <Table noHead columns={columns} data={sliceData} />
          {!previewAll && (
            <footer className={styles.overview__footer} onClick={() => setPreviewAll(true)}>
              <div>查看全部 &gt;</div>
            </footer>
          )}
        </div>
      </div>
    </section>
  );
};

export default OverviewItem;
