import { FC } from 'react';

import Scrollbar from '@/components/scrollbar';
import Table, { Column } from '@/components/table';
import { SearchType } from '@/enum';
import { SearchLyric } from '@/types';
import { SongWithLyric } from '@/types';
import { formatMS } from '@/utils';

import { Props, usePagination } from '../hook';
import styles from './lyric.module.less';

const Lyric: FC<Props> = props => {
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
