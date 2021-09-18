import React from 'react';
import List from '../list';
import { Artist, SearchSinger } from '@/types';
import { usePagination, Props } from '../hook';
import { SearchType } from '@/enum';
import { useHistory } from 'react-router-dom';
import { DynamicPage } from '@/router';

const Singer: React.FC<Props> = props => {
  const params = { ...props, currentType: SearchType.SINGER };
  const { wrapEmpty } = usePagination<SearchSinger>(params);
  const { push } = useHistory();

  function listDataAdapter(artists: Artist[]) {
    return artists.map(artist => {
      const { picUrl: imgUrl, name, id } = artist;
      return { id, imgUrl, name };
    });
  }

  return wrapEmpty(data => (
    <List
      data={listDataAdapter(data.artists)}
      onItemClick={({ id }) => push(DynamicPage.singer(id))}
    />
  ));
};

export default Singer;
