import { classGenerator } from '@/utils';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import styles from './popover.module.less';

interface Props {
  functionChildren?: (name: (show: boolean) => void) => React.ReactNode;
  children?: React.ReactNode;
  context: React.ReactNode;
  placement?: 'left' | 'right';
  className?: string;
}

const Popover: React.FC<Props> = ({
  functionChildren,
  children,
  context,
  placement = 'left',
  className,
}) => {
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
    <div
      ref={button}
      className={classNames(getClass('button'), className)}
      onClickCapture={handleButtonClick}
    >
      {context}
      {show && (
        <div ref={container} className={classNames(getClass(), styles[`--${placement}`])}>
          {functionChildren ? functionChildren(setShow) : children}
        </div>
      )}
    </div>
  );
};

export default Popover;
