import React, { useRef } from 'react';
import styles from './music-list.module.less';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { FolderAddOutlined } from '@ant-design/icons';
import Table, { Column } from '@/components/table';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, changeCurrent } from '@/store';
import { Track } from '@/types';
import { formatMS } from '@/utils';
import { useClickAway } from 'react-use';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  target: HTMLElement | null;
};

const MusicList: React.FC<Props> = ({ visible, setVisible, target }) => {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state: RootState) => state.currentTrack);
  const ref = useRef<HTMLDivElement>(null);
  const columns: Column<Track>[] = [
    { title: '音乐标题', key: 'name' },
    {
      title: '歌手',
      render(track) {
        return track.ar.map(item => <span key={item.id}>{item.name}</span>);
      },
    },
    { title: '链接到', key: '' },
    {
      title: '时长',
      key: 'dt',
      format: formatMS,
    },
  ];

  function handleDoubleClick(index: number) {
    dispatch(changeCurrent(index));
  }

  useClickAway(ref, e => {
    if (e.target !== target?.querySelector('svg')) setVisible(false);
  });

  return createPortal(
    <div ref={ref} className={classNames(styles['music-list'], { [styles['--show']]: visible })}>
      <header className={styles['music-list__header']}>
        <h2>当前播放</h2>
        <div className={styles['music-list__subtitle']}>
          <div className={styles['music-list__total']}>总{currentTrack.tracks.length}首</div>
          <div className={styles['music-list__subtitle-right']}>
            <span className={styles['music-list__subtitle-all']}>
              <FolderAddOutlined />
              收藏全部
            </span>
            <span className={styles['music-list__subtitle-clear']}>清空列表</span>
          </div>
        </div>
      </header>
      <section className={styles['music-list__subtitle-table']}>
        <Table
          noHead
          data={currentTrack.tracks}
          columns={columns}
          doubleClick={handleDoubleClick}
        />
      </section>
    </div>,
    document.getElementById('music-list')!
  );
};

export default MusicList;
