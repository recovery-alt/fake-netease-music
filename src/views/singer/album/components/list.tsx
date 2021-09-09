import React from 'react';
import ListBox from '@/views/search-result/list';
import { Props as AlbumProps } from '../';
import dayjs from 'dayjs';

type Props = Omit<AlbumProps, 'type'>;

const List: React.FC<Props> = ({ albums }) => {
  const data = albums.map(item => ({
    imgUrl: item.picUrl,
    name: item.name,
    col2: `${item.size}首`,
    col3: `发行时间： ${dayjs(item.publishTime).format('YYYY-MM-DD')}`,
  }));
  return <ListBox imgType="extra" data={data} />;
};

export default List;
