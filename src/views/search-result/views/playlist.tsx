import { Playlist as PlaylistType, SearchPlaylist } from '@/types';
import React from 'react';
import List from '../list';
import { usePagination, Props } from '../hook';
import { SearchType } from '@/enum';

const Playlist: React.FC<Props> = props => {
  const params = { ...props, currentType: SearchType.PLAYLIST };
  const { wrapEmpty } = usePagination<SearchPlaylist>(params);

  function listDataAdapter(playlists: PlaylistType[]) {
    return playlists.map(playlist => {
      const { coverImgUrl: imgUrl, name, trackCount, creator } = playlist;
      const col2 = `${trackCount}首`;
      const col3 = `by ${creator.nickname}`;
      return { imgUrl, name, col2, col3 };
    });
  }

  return wrapEmpty(data => <List data={listDataAdapter(data.playlists)} />);
};

export default Playlist;
