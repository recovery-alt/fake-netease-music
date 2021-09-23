import { classGenerator } from '@/utils';
import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import styles from './popover.module.less';

type Props = {
  functionChildren?: (name: (show: boolean) => void) => React.ReactNode;
  children?: React.ReactNode;
  context: React.ReactNode;
};

const Popover: React.FC<Props> = ({ functionChildren, children, context }) => {
  const getClass = classGenerator('popover', styles);
  const container = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  function handleButtonClick() {
    if (!show) setShow(true);
  }

  useClickAway(container, () => {
    setShow(false);
  });

  return (
    <div ref={button} className={getClass('button')} onClickCapture={handleButtonClick}>
      {context}
      {show && (
        <div ref={container} className={getClass()}>
          {functionChildren ? functionChildren(setShow) : children}
        </div>
      )}
    </div>
  );
};

export default Popover;
