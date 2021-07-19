import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import styles from './title.module.less';

type Props = {
  name: string;
};

export default function Title(props: Props) {
  return (
    <header className={styles.title}>
      {props.name}
      <RightOutlined />
    </header>
  );
}
