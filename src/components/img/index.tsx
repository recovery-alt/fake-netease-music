import React, { useRef, useEffect } from 'react';
import styles from './img.module.less';
import classNames from 'classnames';
import { AppProps } from '@/types';
import { CaretRightFilled, PlayCircleFilled } from '@ant-design/icons';

interface Props extends AppProps {
  src: string;
  icon?: boolean;
}

const Img: React.FC<Props> = ({ style, className, src, icon = false }) => {
  const ref = useRef<HTMLDivElement>(null);

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLDataElement;
        const img = target.dataset.img;
        if (!img) return;
        target.style.backgroundImage = img;
      }
    });
  });

  useEffect(() => {
    if (!ref.current) return;
    io.observe(ref.current);

    return () => {
      if (!ref.current) return;
      io.unobserve(ref.current);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(styles.img, className)}
      style={style}
      data-img={`url(${src})`}
    >
      {icon && <PlayCircleFilled className={styles.img__play} />}
    </div>
  );
};

export default Img;
