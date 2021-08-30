import React, { useRef, useEffect, useState } from 'react';
import styles from './img.module.less';
import classNames from 'classnames';
import { AppProps } from '@/types';
import { PlayCircleFilled, LoadingOutlined } from '@ant-design/icons';

interface Props extends AppProps {
  src: string;
  icon?: boolean;
  alt?: string;
  banLoading?: boolean;
}

const Img: React.FC<Props> = ({
  alt = '',
  banLoading = false,
  style,
  className,
  src,
  icon = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && ref && ref.current?.style) setVisible(true);
    });
  });

  function handleOnload() {
    setLoading(false);
  }

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
      className={classNames(styles.img, className && { [className]: loading })}
      style={style}
    >
      {visible && <img className={className} src={src} alt={alt} onLoad={handleOnload} />}
      {!banLoading && loading && <LoadingOutlined className={styles.img__loading} />}
      {!loading && icon && <PlayCircleFilled className={styles.img__play} />}
    </div>
  );
};

export default Img;
