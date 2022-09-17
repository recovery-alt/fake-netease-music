import { FolderAddOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useClickAway } from 'react-use';

import Table, { Column } from '@/components/table';
import { AppDispatch, changeCurrent, RootState } from '@/store';
import { Track } from '@/types';
import { classGenerator, formatMS } from '@/utils';

import styles from './music-list.module.less';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  target: HTMLElement | null;
};

const MusicList: FC<Props> = ({ visible, setVisible, target }) => {
  const getClass = classGenerator('music-list', styles);
  const dispatch = useDispatch<AppDispatch>();
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
    <div ref={ref} className={classNames(getClass(), { [styles['--show']]: visible })}>
      <header className={getClass('header')}>
        <h2>当前播放</h2>
        <div className={getClass('subtitle')}>
          <div className={getClass('total')}>总{currentTrack.tracks.length}首</div>
          <div className={getClass('subtitle-right')}>
            <span className={getClass('subtitle-all')}>
              <FolderAddOutlined />
              收藏全部
            </span>
            <span className={getClass('subtitle-clear')}>清空列表</span>
          </div>
        </div>
      </header>
      <section className={getClass('subtitle-table')}>
        <Table
          noHead
          selectedRow={currentTrack.current}
          data={currentTrack.tracks}
          columns={columns}
          onDoubleClick={handleDoubleClick}
        />
      </section>
    </div>,
    document.getElementById('drawer')!
  );
};

export default MusicList;
