import React, { useRef, useEffect } from 'react';
import styles from './img.module.less';
import classNames from 'classnames';
import { AppProps } from '@/types';

interface Props extends AppProps {
  src: string;
}

const Img: React.FC<Props> = ({ style, className, src }) => {
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
    />
  );
};

export default Img;
