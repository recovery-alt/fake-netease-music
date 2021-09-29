import React, { useEffect, useState } from 'react';

export function useInfinityScroll(ref: React.RefObject<HTMLElement>, cb?: () => void) {
  const [moreText, setMoreText] = useState('');
  let more = true;

  function setMore(hasMore: boolean) {
    more = hasMore;
  }

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

  return { moreText, setMore };
}
