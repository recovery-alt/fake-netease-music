import React from 'react';
import styles from './button-group.module.less';
import { UngroupOutlined, AlignCenterOutlined, UnorderedListOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { AlbumPageMode } from '@/views/singer/album';

type Props = { activeButton: AlbumPageMode; setActiveButton: (button: AlbumPageMode) => void };

const Album: React.FC<Props> = ({ activeButton, setActiveButton }) => {
  const data: Array<{ key: AlbumPageMode; component: React.FC }> = [
    { key: 'list', component: UngroupOutlined },
    { key: 'card', component: AlignCenterOutlined },
    { key: 'overview', component: UnorderedListOutlined },
  ];

  return (
    <div className={styles['button-group']}>
      {data.map(item => (
        <button
          key={item.key}
          className={classNames(styles['button-group__item'], {
            [styles['--active']]: item.key === activeButton,
          })}
          onClick={() => setActiveButton(item.key)}
        >
          <item.component />
        </button>
      ))}
    </div>
  );
};

export default Album;
