import React, { useRef } from 'react';
import styles from './search-list.module.less';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import EmptySuggestion from './empty-suggestion';
import KeywordSuggestion from './keyword-suggestion';
import { useClickAway } from 'react-use';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  inputRef: HTMLInputElement | null;
};

const SearchList: React.FC<Props> = ({ visible, setVisible, inputRef }) => {
  const ref = useRef<HTMLDivElement>(null);
  const keywords = useSelector((state: RootState) => state.controller.keywords);
  useClickAway(ref, e => {
    if (e.target !== inputRef) setVisible(false);
  });

  return createPortal(
    <div ref={ref} className={classNames(styles['search-list'], { [styles['--show']]: visible })}>
      {keywords ? (
        <KeywordSuggestion setVisible={setVisible} />
      ) : (
        <EmptySuggestion {...{ visible, setVisible }} />
      )}
    </div>,
    document.getElementById('drawer')!
  );
};

export default SearchList;
