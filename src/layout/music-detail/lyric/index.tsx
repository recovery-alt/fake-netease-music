import { QuestionOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getLyric } from '@/api';
import { clearRequests } from '@/api/api';
import Scrollbar from '@/components/scrollbar';
import { DynamicPage } from '@/router';
import { RootState } from '@/store';
import { Music } from '@/types';
import { classGenerator, resolveLyricTime } from '@/utils';

import styles from './lyric.module.less';

type Props = { music: Music };

const Lyric: FC<Props> = ({ music }) => {
  const getClass = classGenerator('lyric', styles);
  type LyricItem = { timestamp: number[]; value: string };
  const [lyrics, setLyrics] = useState<LyricItem[]>([]);
  const currentTime = useSelector((state: RootState) => state.controller.currentTime);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { push } = useHistory();

  function transLyric2Arr(lyric: string) {
    const result: Array<LyricItem> = [];
    const rows = lyric.split('\n');
    rows.forEach(row => {
      row.replace(/\[(.*?)\](.*)(\[.*?\])?/, (_, timeStr, value) => {
        const timestamp = [resolveLyricTime(timeStr)];
        if (!value || !value.trim()) return '';
        result.push({ timestamp, value });
        return '';
      });
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
    containerRef.current?.scrollTo({ top: 0 });
    setCurrentIndex(0);
    getLyric(music.id).then(res => {
      const { lrc, nolyric } = res;
      setLyrics(nolyric ? [] : transLyric2Arr(lrc.lyric));
    });

    return clearRequests;
  }, [music?.id]);

  useEffect(() => {
    if (lyrics.length) scroll();
  }, [currentTime, lyrics]);

  return (
    <div className={getClass()}>
      <h2>
        <span className={getClass('music-name')}>{music?.name}</span>
        <span className={getClass('quality')}>标准音质</span>
      </h2>
      <div className={getClass('info')}>
        <p>
          <span>专辑：</span>
          <a onClick={() => push(DynamicPage.list(music.album.id, 'album'))}>{music?.album.name}</a>
        </p>
        <p>
          <span>歌手：</span>
          {music?.artists.map(artist => (
            <a
              className={getClass('anchor')}
              key={artist.name}
              onClick={() => push(DynamicPage.singer(artist.id))}
            >
              {artist.name}
            </a>
          ))}
        </p>
      </div>
      <div className={getClass('container')}>
        {lyrics.length > 0 ? (
          <Scrollbar ref={containerRef} className={getClass('wrapper')}>
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

      <QuestionOutlined className={getClass('question')} />
    </div>
  );
};

export default Lyric;
