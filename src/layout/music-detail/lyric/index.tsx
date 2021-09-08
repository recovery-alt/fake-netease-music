import React, { useEffect, useRef, useState } from 'react';
import styles from './lyric.module.less';
import Scrollbar from '@/components/scrollbar';
import { QuestionOutlined } from '@ant-design/icons';
import { Music } from '@/types';
import { getLyric } from '@/api';
import { resolveLyricTime } from '@/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import classNames from 'classnames';

type Props = { music: Music };

const Lyric: React.FC<Props> = ({ music }) => {
  type LyricItem = { timestamp: number[]; value: string };
  const [lyrics, setLyrics] = useState<LyricItem[]>([]);
  const currentTime = useSelector((state: RootState) => state.controller.currentTime);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  function transLyric2Arr(lyric: string) {
    const result: Array<LyricItem> = [];
    lyric.replace(/((?:\[\d{2}:\d{2}\.\d{2,3}\])+)([\s\S]*?)(?=\[)/g, ($1, $2, value) => {
      const matcher = $2.match(/(?<=\[)\d{2}:\d{2}\.\d{2,3}(?=\])/g) as [];
      const timestamp = matcher.map(item => resolveLyricTime(item));
      result.push({ timestamp, value });
      return '';
    });

    return result;
  }

  function scroll() {
    if (!containerRef?.current) return;
    const len = lyrics.length;
    if (currentIndex === len - 1) return;
    const dom = containerRef.current;
    let index = 0;
    for (let i = currentIndex; i < len; i++) {
      if (!lyrics[i]?.timestamp?.[0]) continue;
      if (currentTime <= lyrics[i].timestamp[0]) {
        setCurrentIndex(i - 1);
        index = i - 1;
        break;
      }
    }
    const top = (44 * index * window.innerWidth) / 1000;
    if (index !== currentIndex) dom.scrollTo({ top, behavior: 'smooth' });
  }

  useEffect(() => {
    if (!music?.id) return;
    setCurrentIndex(0);
    getLyric(music.id).then(res => {
      const { lrc, nolyric } = res;
      setLyrics(nolyric ? [] : transLyric2Arr(lrc.lyric));
    });
  }, [music?.id]);

  useEffect(() => {
    if (lyrics.length) scroll();
  }, [currentTime, lyrics]);

  return (
    <div className={styles.lyric}>
      <h2>
        <span className={styles['lyric__music-name']}>{music?.name}</span>
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
      <div className={styles.lyric__container}>
        {lyrics.length > 0 ? (
          <Scrollbar ref={containerRef} className={styles.lyric__wrapper}>
            {lyrics.map((lyric, i) => (
              <p key={i} className={classNames({ [styles['--selected']]: i === currentIndex })}>
                {lyric.value}
              </p>
            ))}
          </Scrollbar>
        ) : (
          <span>纯音乐，请您欣赏</span>
        )}
      </div>

      <QuestionOutlined className={styles.lyric__question} />
    </div>
  );
};

export default Lyric;
