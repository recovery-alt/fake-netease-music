import classNames from 'classnames';
import { FC } from 'react';

import Img from '@/components/img';
import { classGenerator, resizeImg } from '@/utils';

import styles from './cover.module.less';

type Props = { img: string; pause: boolean };

const Cover: FC<Props> = ({ img, pause }) => {
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
