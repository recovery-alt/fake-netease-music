import classNames from 'classnames';
import { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { useClickAway } from 'react-use';

import { RootState } from '@/store';
import { classGenerator } from '@/utils';

import EmptySuggestion from './empty-suggestion';
import KeywordSuggestion from './keyword-suggestion';
import styles from './search-list.module.less';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  inputRef: HTMLInputElement | null;
};

const SearchList: FC<Props> = ({ visible, setVisible, inputRef }) => {
  const getClass = classGenerator('search-list', styles);
  const ref = useRef<HTMLDivElement>(null);
  const keywords = useSelector((state: RootState) => state.controller.keywords);

  useClickAway(ref, e => {
    if (e.target !== inputRef) setVisible(false);
  });

  return createPortal(
    <div ref={ref} className={classNames(getClass(), { [styles['--show']]: visible })}>
      {visible ? (
        keywords && keywords.trim() ? (
          <KeywordSuggestion setVisible={setVisible} />
        ) : (
          <EmptySuggestion {...{ visible, setVisible }} />
        )
      ) : null}
    </div>,
    document.getElementById('drawer')!
  );
};

export default SearchList;
