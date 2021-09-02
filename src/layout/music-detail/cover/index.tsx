import React from 'react';
import styles from './cover.module.less';
import Img from '@/components/img';
import classNames from 'classnames';
import { resizeImg } from '@/utils';

type Props = { img: string; pause: boolean };

const Cover: React.FC<Props> = ({ img, pause }) => {
  return (
    <>
      <div className={styles.cover}>
        <Img
          className={classNames(styles.cover__inner, { [styles['--animate']]: !pause })}
          src={resizeImg(img, 300)}
        />
      </div>
    </>
  );
};

export default Cover;
