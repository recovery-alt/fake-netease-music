import classNames from 'classnames';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import Img from '@/components/img';
import { SearchType } from '@/enum';
import { DynamicPage } from '@/router';
import { SearchVideo } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

import { Props, usePagination } from '../hook';
import styles from './video.module.less';

const getClass = classGenerator('video', styles);

const Video: FC<Props> = props => {
  const params = { ...props, currentType: SearchType.VIDEO, limit: 21 };
  const { wrapEmpty } = usePagination<SearchVideo>(params);
  const { push } = useHistory();

  function toPlayVideoPage(id: number | string) {
    push(DynamicPage.playVideo(id));
  }

  return wrapEmpty(data => (
    <div className={getClass()}>
      {data.videos.map(item => (
        <div key={item.vid} className={getClass('item')} onClick={() => toPlayVideoPage(item.vid)}>
          <Img src={resizeImg(item.coverUrl, 460, 260)} className={getClass('img')} />
          <div className={getClass('description')}>
            <h2 className={classNames({ [styles['--mv']]: item.type === 0 })}>{item.title}</h2>
            <h3>by {item.creator.reduce((acc, val) => `${acc},${val.userName}`, '').slice(1)}</h3>
          </div>
        </div>
      ))}
    </div>
  ));
};

export default Video;
