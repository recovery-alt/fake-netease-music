import React, { useState } from 'react';
import styles from './button-group.module.less';
import { UngroupOutlined, AlignCenterOutlined, UnorderedListOutlined } from '@ant-design/icons';
import classNames from 'classnames';

const Album: React.FC = () => {
  const data = [UngroupOutlined, AlignCenterOutlined, UnorderedListOutlined];
  const [active, setActive] = useState(2);

  return (
    <div className={styles['button-group']}>
      {data.map((Item, i) => (
        <button
          key={i}
          className={classNames(styles['button-group__item'], {
            [styles['--active']]: i === active,
          })}
          onClick={() => setActive(i)}
        >
          <Item />
        </button>
      ))}
    </div>
  );
};

export default Album;
