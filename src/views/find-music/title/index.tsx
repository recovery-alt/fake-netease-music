import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import styles from './title.module.less';

type Props = {
  name: string;
  welt?: boolean;
};

const Title: React.FC<Props> = ({ name, welt = false }: Props) => (
  <header className={`${styles.title} ${welt ? styles.welt : ''}`}>
    {name}
    <RightOutlined />
  </header>
);

export default Title;
