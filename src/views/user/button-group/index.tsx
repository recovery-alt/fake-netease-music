import React from 'react';
import styles from './button-group.module.less';
import { UngroupOutlined, AlignCenterOutlined, UnorderedListOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { PageMode } from '@/views/user/music-present';

type Props = { activeButton: PageMode; setActiveButton: (button: PageMode) => void };

const Album: React.FC<Props> = ({ activeButton, setActiveButton }) => {
  const data: Array<{ key: PageMode; component: React.FC }> = [
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
