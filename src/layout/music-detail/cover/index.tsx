import React from 'react';
import styles from './cover.module.less';
import Img from '@/components/img';
import classNames from 'classnames';
import { classGenerator, resizeImg } from '@/utils';

type Props = { img: string; pause: boolean };

const Cover: React.FC<Props> = ({ img, pause }) => {
  const getClass = classGenerator('cover', styles);
  return (
    <>
      <div className={getClass()}>
        <Img
          className={classNames(getClass('inner'), { [styles['--animate']]: !pause })}
          src={resizeImg(img, 300)}
        />
      </div>
    </>
  );
};

export default Cover;
