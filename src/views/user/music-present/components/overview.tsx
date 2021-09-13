import React, { useEffect, useRef, useState } from 'react';
import styles from '../music-present.module.less';
import { getAlbum, getArtistTopSong } from '@/api';
import { Track } from '@/types';
import OverviewItem from './overview-item';
import { Props as PresentProps, DataType } from '../';

type Props = Omit<PresentProps, 'type'>;

const Overview: React.FC<Props> = ({ id, data, isAlbum }) => {
  const [topSongs, setTopSongs] = useState<Track[]>([]);
  const footerRef = useRef<HTMLElement>(null);
  const [sliceData, setSliceData] = useState<DataType[]>([]);
  const [more, setMore] = useState('加载中...');
  let index = 0;

  async function loadArtistTopSong() {
    const topSong = await getArtistTopSong(id);
    setTopSongs(topSong.songs);
  }

  async function loadSongs(index: number) {
    const current = data[index];
    if (!current?.id) return;
    const res = await getAlbum(current.id);
    current.songs = res.songs;
  }

  useEffect(() => {
    if (isAlbum) {
      loadArtistTopSong();
      loadSongs(index);
    }
  }, [id]);

  useEffect(() => {
    if (!isAlbum) {
      setSliceData([...data]);
      return;
    }
    if (!footerRef?.current) return;

    const io = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return;
      index++;
      if (index < data.length) {
        loadSongs(index);
        setSliceData(data.slice(0, index));
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
      {isAlbum && <OverviewItem data={topSongs} isAlbum />}
      {sliceData.map(item => (
        <OverviewItem
          key={item.id}
          id={item.id}
          title={item.name}
          imgUrl={item.picUrl}
          data={item.songs}
          isAlbum
        />
      ))}
      {isAlbum && (
        <footer ref={footerRef} className={styles.overview__more}>
          {more}
        </footer>
      )}
    </div>
  );
};

export default Overview;
