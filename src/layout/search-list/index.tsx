import React from 'react';
import styles from './search-list.module.less';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import EmptySuggestion from './empty-suggestion';
import KeywordSuggestion from './keyword-suggestion';

type Props = { visible: boolean; keyword: string };

const SearchList: React.FC<Props> = ({ visible, keyword }) => {
  return createPortal(
    <div className={classNames(styles['search-list'], { [styles['--show']]: visible })}>
      {keyword ? <KeywordSuggestion /> : <EmptySuggestion />}
    </div>,
    document.getElementById('drawer')!
  );
};

export default SearchList;
