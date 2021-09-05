import { SearchLyric } from '@/types';
import React from 'react';
import { usePagination, Props } from '../hook';
import { SearchType } from '@/enum';
import { SongWithLyric } from '@/types';
import Table, { Column } from '@/components/table';
import { formatMS } from '@/utils';
import styles from './lyric.module.less';
import Scrollbar from '@/components/scrollbar';

const Lyric: React.FC<Props> = props => {
  const params = { ...props, currentType: SearchType.LYRIC };
  const { wrapEmpty } = usePagination<SearchLyric>(params);
  const columns: Column<SongWithLyric>[] = [
    { title: '', key: 'ordinal' },
    { title: '', key: 'action' },
    {
      title: '音乐标题',
      key: 'name',
      render(track) {
        return (
          <>
            <div>{track.name}</div>
            <Scrollbar className={styles.lyric}>{track.lyrics.txt}</Scrollbar>
          </>
        );
      },
    },
    {
      title: '歌手',
      render(track) {
        return track.artists.map(item => <span key={item.id}>{item.name}</span>);
      },
    },
    { title: '专辑', key: 'album.name' },
    {
      title: '时长',
      key: 'duration',
      format: formatMS,
    },
  ];

  return wrapEmpty(data => <Table columns={columns} data={data.songs}></Table>);
};

export default Lyric;
