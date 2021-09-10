import React from 'react';
import ListBox, { ListItem } from '@/views/search-result/list';
import { Props as AlbumProps } from '../';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

type Props = Omit<AlbumProps, 'type'>;

const List: React.FC<Props> = ({ albums }) => {
  const { push } = useHistory();
  const data = albums.map(item => ({
    id: item.id,
    imgUrl: item.picUrl,
    name: item.name,
    col2: `${item.size}首`,
    col3: `发行时间： ${dayjs(item.publishTime).format('YYYY-MM-DD')}`,
  }));

  function handleItemClick(item: ListItem) {
    push(`/list/${item.id}/album`);
  }

  return <ListBox imgType="extra" data={data} onItemClick={handleItemClick} />;
};

export default List;
