import React, { useEffect, useRef, useState } from 'react';
import styles from '../album.module.less';
import { getArtistTopSong } from '@/api';
import { Album, Track } from '@/types';
import OverviewItem from './overview-item';
import { Props as AlbumProps } from '../';
import { getAlbum } from '@/api';

type Props = Omit<AlbumProps, 'type'>;

const Overview: React.FC<Props> = ({ id, albums }) => {
  const [topSongs, setTopSongs] = useState<Track[]>([]);
  const footerRef = useRef<HTMLElement>(null);
  const [sliceAlbums, setSliceAlbums] = useState<Album[]>([]);
  const [more, setMore] = useState('加载中...');
  let index = 0;

  async function loadArtistTopSong() {
    const topSong = await getArtistTopSong(id);
    setTopSongs(topSong.songs);
  }

  async function loadSongsOfAlbum(index: number) {
    const currentAlbum = albums[index];
    if (!currentAlbum.id) return;
    const res = await getAlbum(currentAlbum.id);
    currentAlbum.songs = res.songs;
  }

  useEffect(() => {
    loadArtistTopSong();
    loadSongsOfAlbum(index);
  }, [id]);

  useEffect(() => {
    if (!footerRef?.current) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return;
      index++;
      if (index < albums.length) {
        loadSongsOfAlbum(index);
        setSliceAlbums(albums.slice(0, index));
      } else {
        setMore('没有更多了~');
      }
    });

    io.observe(footerRef.current);

    return () => {
      if (footerRef.current) io.unobserve(footerRef.current);
      io.disconnect();
    };
  }, []);

  return (
    <div className={styles.overview}>
      <OverviewItem data={topSongs} />
      {sliceAlbums.map(album => (
        <OverviewItem key={album.id} title={album.name} imgUrl={album.picUrl} data={album.songs} />
      ))}
      <footer ref={footerRef} className={styles.overview__more}>
        {more}
      </footer>
    </div>
  );
};

export default Overview;
