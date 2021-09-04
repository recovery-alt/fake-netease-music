import React, { useRef } from 'react';
import styles from './search-list.module.less';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import EmptySuggestion from './empty-suggestion';
import KeywordSuggestion from './keyword-suggestion';
import { useClickAway } from 'react-use';

type Props = { visible: boolean; setVisible: (visible: boolean) => void; keyword: string };

const SearchList: React.FC<Props> = ({ visible, setVisible, keyword }) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => setVisible(false));

  return createPortal(
    <div ref={ref} className={classNames(styles['search-list'], { [styles['--show']]: visible })}>
      {keyword ? <KeywordSuggestion keyword={keyword} /> : <EmptySuggestion />}
    </div>,
    document.getElementById('drawer')!
  );
};

export default SearchList;
