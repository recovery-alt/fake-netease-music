import React from 'react';
import List from '../list';
import { Artist, SearchSinger } from '@/types';
import { usePagination, Props } from '../hook';
import { SearchType } from '@/enum';

const Singer: React.FC<Props> = props => {
  const params = { ...props, currentType: SearchType.SINGER };
  const { wrapEmpty } = usePagination<SearchSinger>(params);

  function listDataAdapter(artists: Artist[]) {
    return artists.map(artist => {
      const { picUrl: imgUrl, name, id } = artist;
      return { id, imgUrl, name };
    });
  }

  return wrapEmpty(data => <List data={listDataAdapter(data.artists)} />);
};

export default Singer;
