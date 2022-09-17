import { Column } from '@/components/table';
import { AlbumArea, Track } from '@/types';
import { formatMS } from '@/utils';

export const categoryList: { name: string; area: number; type: number; albumArea?: AlbumArea }[] = [
  { name: '全部', area: -1, type: 0, albumArea: 'ALL' },
  { name: '华语', area: 7, type: 7, albumArea: 'ZH' },
  { name: '欧美', area: 96, type: 96, albumArea: 'EA' },
  { name: '日本', area: 8, type: 8, albumArea: 'JP' },
  { name: '韩国', area: 16, type: 16, albumArea: 'KR' },
  { name: '其他', area: 0, type: -1 },
];

export const CommonColumns: Column<Track>[] = [
  { title: '', key: 'ordinal' },
  { title: '', key: 'action' },
  { title: '音乐标题', key: 'name' },
  {
    title: '歌手',
    render(track) {
      return track.ar.map(item => <span key={item.id}>{item.name}</span>);
    },
  },
  { title: '专辑', key: 'al.name' },
  {
    title: '时长',
    key: 'dt',
    format: formatMS,
  },
];

export const areaCategory = ['内地', '港台', '欧美', '日本', '韩国'];
