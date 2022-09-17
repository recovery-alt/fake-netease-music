import classNames from 'classnames';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '@/components/icon';
import { AppDispatch, RootState, setPause } from '@/store';
import { Music } from '@/types';
import { classGenerator, resizeImg, toHttps } from '@/utils';

import styles from './cover.module.less';

type Props = { current?: Music; next?: Music };

const Cover: FC<Props> = ({ current, next }) => {
  const getClass = classGenerator('cover', styles);
  const pause = useSelector((state: RootState) => state.controller.pause);
  const dispatch = useDispatch<AppDispatch>();

  const handlePauseClick = () => {
    dispatch(setPause(!pause));
  };

  return (
    <>
      <div className={getClass()}>
        {next?.album?.picUrl && (
          <img
            className={getClass('pre-img')}
            src={toHttps(resizeImg(next.album.picUrl, 300))}
            alt="pre-cover"
          />
        )}
        {current?.album.picUrl && (
          <div className={getClass('img')}>
            <img src={toHttps(resizeImg(current.album.picUrl, 300))} alt="cover" />
            <div
              className={classNames(getClass('play'), { [styles['--pause']]: !pause })}
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
