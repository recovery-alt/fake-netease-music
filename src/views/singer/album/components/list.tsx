import React from 'react';
import ListBox from '@/views/search-result/list';

const List: React.FC = () => {
  const data = Array(31)
    .fill(0)
    .map(item => ({ imgUrl: '', name: '1', col2: '2', col3: '3' }));
  return <ListBox imgType="extra" data={data} />;
};

export default List;
