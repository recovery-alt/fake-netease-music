import classNames from 'classnames';
import { FC } from 'react';

import { AlbumCategory } from '@/types';
import { classGenerator } from '@/utils';

import styles from './album-control.module.less';

type Props = { albumType: AlbumCategory; setAlbumType: (albumType: AlbumCategory) => void };

const AlbumControl: FC<Props> = ({ albumType, setAlbumType }) => {
  const getClass = classGenerator('album-control', styles);
  const albumOptions: { text: string; type: AlbumCategory }[] = [
    { text: '推荐', type: 'hot' },
    { text: '全部', type: 'new' },
  ];

  return (
    <div className={getClass()}>
      {albumOptions.map(item => (
        <div key={item.text} className={getClass('item')}>
          <span
            className={classNames({ [styles['--active']]: albumType === item.type })}
            onClick={() => setAlbumType(item.type)}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AlbumControl;
