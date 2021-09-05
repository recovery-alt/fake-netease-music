import React, { useEffect, useState } from 'react';
import styles from './empty-suggestion.module.less';
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { getSearchHotDetail } from '@/api';
import { SearchHot } from '@/types';
import json from 'json5';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setKeywords } from '@/store';

type Props = { visible: boolean; setVisible: (visible: boolean) => void };

const EmptySuggestion: React.FC<Props> = ({ visible, setVisible }) => {
  const [searchHot, setSearchHot] = useState<SearchHot[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { push } = useHistory();
  const dispatch = useDispatch();

  const handleCloseClick: React.MouseEventHandler<HTMLSpanElement> = e => {
    e.stopPropagation();
  };

  function handleSearch(keywords: string) {
    dispatch(setKeywords(keywords));
    setVisible(false);
    push({ pathname: '/search-result', state: { keywords } });
  }

  useEffect(() => {
    if (!visible) return;
    const searchHistory = localStorage.getItem('search-history');
    if (searchHistory) setSearchHistory(json.parse<string[]>(searchHistory));

    (async () => {
      const res = await getSearchHotDetail();
      setSearchHot(res.data);
    })();
  }, [visible]);

  return (
    <>
      {searchHistory.length > 0 && (
        <header className={styles['empty-suggestion__header']}>
          <h2>
            搜索历史 <DeleteOutlined className={styles['empty-suggestion__header-delete']} />
          </h2>
          <div className={styles['empty-suggestion__history']}>
            {searchHistory.map((item, i) => (
              <div
                key={i}
                className={styles['empty-suggestion__history-item']}
                onClick={() => handleSearch(item)}
              >
                {item}
                <CloseOutlined onClick={handleCloseClick} />
              </div>
            ))}
          </div>
        </header>
      )}
      <h3 className={styles['empty-suggestion__title']}>热搜榜</h3>
      {searchHot.map((item, i) => (
        <div
          key={item.searchWord}
          className={styles['empty-suggestion__item']}
          onClick={() => handleSearch(item.searchWord)}
        >
          <p>{i + 1}</p>
          <div className={styles['empty-suggestion__item-right']}>
            <div className={styles['empty-suggestion__item-top']}>
              <strong>{item.searchWord}</strong>
              {item.iconUrl ? <mark>HOT</mark> : null}
              <span>{item.score}</span>
            </div>
            <div className={styles['empty-suggestion__item-bottom']}>{item.content}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EmptySuggestion;
