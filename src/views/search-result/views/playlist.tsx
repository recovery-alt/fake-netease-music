import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { SearchType } from '@/enum';
import { DynamicPage } from '@/router';
import { SearchPlaylist, UserPlaylist as UserPlaylist } from '@/types';

import { Props, usePagination } from '../hook';
import List from '../list';

const Playlist: FC<Props> = props => {
  const params = { ...props, currentType: SearchType.PLAYLIST };
  const { wrapEmpty } = usePagination<SearchPlaylist>(params);
  const { push } = useHistory();

  function listDataAdapter(playlists: UserPlaylist[]) {
    return playlists.map(playlist => {
      const { coverImgUrl: imgUrl, name, trackCount, creator, id } = playlist;
      const col2 = `${trackCount}首`;
      const col3 = `by ${creator.nickname}`;
      return { id, imgUrl, name, col2, col3 };
    });
  }

  return wrapEmpty(data => (
    <List
      data={listDataAdapter(data.playlists)}
      onItemClick={({ id }) => push(DynamicPage.list(id))}
    />
  ));
};

export default Playlist;
