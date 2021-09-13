import React, { useEffect, useMemo, useState } from 'react';
import { PlayCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import Img from '@/components/img';
import top50 from '@/assets/img/top50.png';
import styles from '../music-present.module.less';
import Table, { Column } from '@/components/table';
import { formatMS, resizeImg } from '@/utils';
import classNames from 'classnames';
import { Track } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCurrentTrack } from '@/store';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

export type Props = {
  id?: number;
  isAlbum?: boolean;
  title?: string;
  imgUrl?: string;
  data: Array<Track>;
};

const OverviewItem: React.FC<Props> = ({
  id,
  title = '热门50首',
  imgUrl = top50,
  data,
  isAlbum,
}) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [previewAll, setPreviewAll] = useState(false);
  const columns: Column[] = [{ key: 'ordinal' }, { key: 'name' }, { key: 'dt', format: formatMS }];
  const sliceData = useMemo(() => (previewAll ? data : data.slice(0, 10)), [previewAll, data]);
  const isLogin = useSelector((state: RootState) => !!state.user.cookie);

  function handlePlay(current = 0) {
    dispatch(setCurrentTrack({ current, tracks: data, fm: [] }));
  }

  function handleImgClick() {
    if (!id) return;
    if (isAlbum) {
      push(`/list/${id}/album`);
    } else {
      isLogin ? push(`/list/${id}`) : message.error('需要登录，才能查看他人歌单信息>_<');
    }
  }

  function handleCollect() {
    // TODO: 收藏
  }

  useEffect(() => {
    if (data.length <= 10 && data.length > 0) setPreviewAll(true);
  }, [data]);

  return (
    <section className={styles.overview__item}>
      <Img
        src={resizeImg(imgUrl, 150)}
        className={classNames(styles.overview__img, {
          [styles['--top50']]: title === '热门50首',
        })}
        onClick={handleImgClick}
      />
      <div className={styles.overview__right}>
        <header className={styles.overview__header}>
          <h2>{title}</h2>
          <div className={styles.overview__icon}>
            <PlayCircleOutlined onClick={() => handlePlay()} />
            <FileAddOutlined onClick={handleCollect} />
          </div>
        </header>
        <div className={styles.overview__table}>
          <Table noHead columns={columns} data={sliceData} onDoubleClick={handlePlay} />
          {!previewAll && data.length > 0 && (
            <footer className={styles.overview__footer} onClick={() => setPreviewAll(true)}>
              <div>查看全部{data.length}首 &gt;</div>
            </footer>
          )}
        </div>
      </div>
    </section>
  );
};

export default OverviewItem;
