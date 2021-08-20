import React, { useEffect, useState } from 'react';
import './rank.less';
import Official from './components/official';
import {
  getToplist,
  Toplist,
  getToplistDetail,
  getPlaylistDetail,
  PlaylistDetail,
  Track,
} from '@/api';
import Img from '@/components/img';

const Rank: React.FC = () => {
  const [toplist, setToplist] = useState<Toplist[]>([]);
  const [playlistDetail, SetPlaylistDetail] = useState<PlaylistDetail[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getToplist();
      setToplist(res.list);
      const list = res.list.slice(0, 5);
      const playlist: PlaylistDetail[] = [];
      for (const item of list) {
        const playlistDetail = await getPlaylistDetail(item.id);
        const { tracks, ...rest } = playlistDetail.playlist;
        playlist.push({ ...rest, tracks: tracks.slice(0, 5) });
      }
      SetPlaylistDetail(playlist);
    })();
  }, []);
  return (
    <div className="rank">
      <header className="rank__header">官方榜</header>
      <div className="rank__official">
        {playlistDetail.map((item, i) => (
          <Official key={i} data={item} />
        ))}
      </div>
      <header className="rank__header">全球榜</header>
      <div className="rank__global">
        {toplist.map(item => (
          <div key={item.id} className="rank__item">
            <div className="rank__img-wrapper">
              <Img className="rank__img" src={item.coverImgUrl} />
            </div>
            <div className="rank__detail">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rank;
