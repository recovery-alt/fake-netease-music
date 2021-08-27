import React, { useEffect, useState } from 'react';
import styles from './lyric.module.less';
import Scrollbar from '@/components/scrollbar';
import { QuestionOutlined } from '@ant-design/icons';
import { Music } from '@/api';
import { getLyric } from '@/api';

type Props = { music: Music };

const Lyric: React.FC<Props> = ({ music }) => {
  type LyricItem = { timestamp: string; value: string };
  const [lyrics, setLyrics] = useState<LyricItem[]>([]);

  function transLyric2Arr(lyric: string) {
    const result: Array<LyricItem> = [];
    lyric.replace(/\[(.*?)\](?!\n)\s?(.+)\n/g, ($1, $2, $3) => {
      result.push({ timestamp: $2, value: $3 });
      return '';
    });
    return result;
  }

  useEffect(() => {
    if (!music?.id) return;
    getLyric(music.id).then(res => {
      const { lrc } = res;
      setLyrics(transLyric2Arr(lrc.lyric));
    });
  }, [music?.id]);
  return (
    <div className={styles.lyric}>
      <h2>
        <span>{music?.name}</span>
        <span className={styles.lyric__quality}>标准音质</span>
      </h2>
      <div className={styles.lyric__info}>
        <p>
          <span>专辑：</span>
          <a>{music?.album.name}</a>
        </p>
        <p>
          <span>歌手：</span>
          {music?.artists.map(artist => (
            <a className={styles.lyric__anchor} key={artist.name}>
              {artist.name}
            </a>
          ))}
        </p>
      </div>
      <div style={{ borderRight: '1px solid #f2f2f2' }}>
        <Scrollbar className={styles.lyric__wrapper}>
          {lyrics.map(lyric => (
            <p key={lyric.timestamp}>{lyric.value}</p>
          ))}
        </Scrollbar>
      </div>

      <QuestionOutlined className={styles.lyric__question} />
    </div>
  );
};

export default Lyric;
