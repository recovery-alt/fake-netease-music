import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { PlaySquareOutlined } from '@ant-design/icons';
import styles from './list.module.less';
import { Song } from '@/types';
import { classGenerator, formatMS, resizeImg } from '@/utils';
import Img from '@/components/img';
import { getTopSong } from '@/api';
import { useDispatch } from 'react-redux';
import { insertSong } from '@/store';

type Props = { type: number };

const SongList = forwardRef<Song[], Props>(({ type }, ref) => {
  const getClass = classGenerator('song-list', styles);
  const [songs, setSongs] = useState<Song[]>([]);
  const dispatch = useDispatch();

  function handleItemClick(id: number) {
    dispatch(insertSong(id));
  }

  useEffect(() => {
    if (type === undefined) return;
    let doCancel = false;

    async function setTopSong() {
      const res = await getTopSong(type);
      doCancel || setSongs(res.data);
    }

    setTopSong();

    return () => {
      doCancel = true;
    };
  }, [type]);

  useImperativeHandle(ref, () => songs, [songs]);

  return (
    <div className={getClass()}>
      {songs.map((item, i) => (
        <div key={item.id} className={getClass('item')}>
          <div className={getClass('left')}>
            <div className={getClass('ordinal')}>{i + 1}</div>
            <div className={getClass('img-wrapper')}>
              <Img
                className={getClass('img')}
                src={resizeImg(item.album.picUrl, 100)}
                icon
                onClick={() => handleItemClick(item.id)}
              />
            </div>
            <div className={getClass('song')}>
              <p>{item.name}</p>
              <small>SQ</small>
              <PlaySquareOutlined />
            </div>
          </div>
          <div className={getClass('right')}>
            <div className={getClass('author')}>
              {item.album.artists.reduce((acc, val) => `${acc}/${val.name}`, '').slice(1)}
            </div>
            <div className={getClass('album')}>{item.album.name}</div>
            <div className={getClass('duration')}>{formatMS(item.duration)}</div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default SongList;
