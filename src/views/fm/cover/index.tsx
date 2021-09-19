import React from 'react';
import styles from './cover.module.less';
import { Music } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, setPause } from '@/store';
import classNames from 'classnames';
import { resizeImg } from '@/utils';
import Icon from '@/components/icon';

type Props = { current?: Music; next?: Music };

const Cover: React.FC<Props> = ({ current, next }) => {
  const pause = useSelector((state: RootState) => state.controller.pause);
  const dispatch = useDispatch<AppDispatch>();

  const handlePauseClick = () => {
    dispatch(setPause(!pause));
  };

  return (
    <>
      <div className={styles.cover}>
        {next?.album?.picUrl && (
          <img
            className={styles['cover__pre-img']}
            src={resizeImg(next.album.picUrl, 300)}
            alt="pre-cover"
          />
        )}
        {current?.album.picUrl && (
          <div className={styles['cover__img']}>
            <img src={resizeImg(current.album.picUrl, 300)} alt="cover" />
            <div
              className={classNames(styles.cover__play, { [styles['--pause']]: !pause })}
              onClick={handlePauseClick}
            >
              <Icon type={pause ? 'play' : 'pause'} size="large" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cover;
