import { FC, useEffect, useRef, useState } from 'react';

import { getAlbum, getArtistTopSong, getPlaylistDetail } from '@/api';
import { clearRequests } from '@/api/api';
import { Track } from '@/types';
import { classGenerator } from '@/utils';

import { DataType, Props as PresentProps } from '../';
import styles from '../music-present.module.less';
import OverviewItem from './overview-item';

type Props = Omit<PresentProps, 'type'>;

export const getClass = classGenerator('overview', styles);

const Overview: FC<Props> = ({ id, data, isAlbum, myself }) => {
  const [topSongs, setTopSongs] = useState<Track[]>([]);
  const footerRef = useRef<HTMLElement>(null);
  const [sliceData, setSliceData] = useState<DataType[]>([]);
  const [more, setMore] = useState('加载中...');
  let index = 0;

  async function loadArtistTopSong() {
    const topSong = await getArtistTopSong(id);
    setTopSongs(topSong.songs);
  }

  async function loadAlbumSongs(index: number) {
    const current = data[index];
    if (!current?.id) return;
    const res = await getAlbum(current.id);
    // TODO: 有副作用
    current.songs = res.songs;
  }

  async function loadPlaylistSongs(index: number) {
    if (!myself) return;
    const current = data[index];
    if (!current?.id) return;
    const res = await getPlaylistDetail(current.id);
    // TODO: 有副作用
    current.songs = res.playlist.tracks;
  }

  useEffect(() => {
    if (isAlbum) {
      loadArtistTopSong();
      loadAlbumSongs(index);
    } else {
      loadPlaylistSongs(index);
    }

    return clearRequests;
  }, [id]);

  useEffect(() => {
    if (!footerRef?.current) return;

    const io = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return;
      index++;
      if (index < data.length) {
        isAlbum ? loadAlbumSongs(index) : loadPlaylistSongs(index);
        setSliceData(data.slice(0, index));
      } else {
        setMore('');
      }
    });

    io.observe(footerRef.current);

    return () => {
      if (footerRef.current) io.unobserve(footerRef.current);
      io.disconnect();
    };
  }, []);

  return (
    <div className={getClass()}>
      {isAlbum && <OverviewItem data={topSongs} isAlbum />}
      {sliceData.map(item => (
        <OverviewItem
          key={item.id}
          id={item.id}
          title={item.name}
          imgUrl={item.picUrl}
          data={item.songs}
          isAlbum={isAlbum}
        />
      ))}
      <footer ref={footerRef} className={getClass('more')}>
        {more}
      </footer>
    </div>
  );
};

export default Overview;
