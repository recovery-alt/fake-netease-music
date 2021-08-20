import { useRef, useCallback } from 'react';

type UseVisibility = (
  cb: (isVisible: boolean) => void,
  deps: React.DependencyList
) => (node: any) => void;

export const useVisibility: UseVisibility = (cb, deps) => {
  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  return useCallback(node => {
    if (intersectionObserver.current) {
      intersectionObserver.current.disconnect();
    }

    intersectionObserver.current = new IntersectionObserver(([entry]) => {
      cb(entry.isIntersecting);
    });

    if (node) intersectionObserver.current.observe(node);
  }, deps);
};
