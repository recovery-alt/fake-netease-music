import React from 'react';
import styles from './cover.module.less';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { Music } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch, setPause } from '@/store';
import classNames from 'classnames';

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
          <img className={styles['cover__pre-img']} src={next?.album?.picUrl} alt="pre-cover" />
        )}
        {current?.album.picUrl && (
          <div className={styles['cover__img']}>
            <img src={current?.album?.picUrl} alt="cover" />
            <div
              className={classNames(styles.cover__play, { [styles['--pause']]: !pause })}
              onClick={handlePauseClick}
            >
              {pause ? <PlayCircleFilled /> : <PauseCircleFilled />}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cover;
