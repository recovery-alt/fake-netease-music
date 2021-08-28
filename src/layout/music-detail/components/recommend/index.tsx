import React, { useEffect, useState } from 'react';
import styles from './recommend.module.less';
import Img from '@/components/img';
import { getSimiPlaylist, getSimiSong, Music, Playlist } from '@/api';
import { wrapNumber } from '@/utils';

type Props = { id: number };

const Recommend: React.FC<Props> = ({ id }) => {
  const [simiPlaylist, setSimiPlaylist] = useState<Playlist[]>([]);
  const [simiSong, setSimiSong] = useState<Music[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getSimiPlaylist(id);
      setSimiPlaylist(res.playlists);
    })();

    (async () => {
      const res = await getSimiSong(id);
      setSimiSong(res.songs);
    })();
  }, [id]);
  return (
    <div className={styles.recommend}>
      <h2 className={styles.recommend__title}>包含这首歌的歌单</h2>
      {simiPlaylist.map(item => (
        <div key={item.id} className={styles.recommend__item}>
          <Img className={styles.recommend__img} src={item.coverImgUrl} />
          <div className={styles['recommend__item-info']}>
            <div>{item.name}</div>
            <div>{wrapNumber(item.playCount)}</div>
          </div>
        </div>
      ))}
      <h2 className={styles.recommend__title}>相似歌曲</h2>
      {simiSong.map(item => (
        <div key={item.id} className={styles['recommend__item']}>
          <Img className={styles['recommend__img']} src={item.album.picUrl} icon />
          <div className={styles['recommend__item-info']}>
            <div>{item.name}</div>
            <div>{item.artists.reduce((acc, val) => `${acc} ${val.name}`, '').slice(1)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommend;
