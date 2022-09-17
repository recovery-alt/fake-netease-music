import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { SearchType } from '@/enum';
import { DynamicPage } from '@/router';
import { Artist, SearchSinger } from '@/types';

import { Props, usePagination } from '../hook';
import List from '../list';

const Singer: FC<Props> = props => {
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
