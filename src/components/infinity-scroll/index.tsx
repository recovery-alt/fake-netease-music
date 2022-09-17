import classNames from 'classnames';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { HTMLAttributes } from 'react';

import { classGenerator } from '@/utils';

import styles from './infinity-scroll.module.less';

interface Props extends HTMLAttributes<HTMLElement> {
  cb: () => void;
}
export type SetMore = (hasMore: boolean) => void;

const InfinityScroll = forwardRef<SetMore, Props>(({ cb, className, ...restProps }, exportRef) => {
  const getClass = classGenerator('infinity-scroll', styles);
  const ref = useRef<HTMLElement>(null);
  const [moreText, setMoreText] = useState('');
  const more = useRef(true);

  function setMore(hasMore: boolean) {
    more.current = hasMore;
  }

  useImperativeHandle(exportRef, () => setMore, []);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return;
      if (more) {
        setMoreText('加载中...');
        cb?.();
      } else {
        setMoreText('没有更多了~');
      }
    });

    io.observe(ref.current);

    return () => {
      if (ref.current) io.unobserve(ref.current);
      io.disconnect();
    };
  }, []);

  return (
    <footer ref={ref} className={classNames(getClass(), className)} {...restProps}>
      {moreText}
    </footer>
  );
});

export default InfinityScroll;
