import React, { useEffect, useState } from 'react';
import styles from './empty-suggestion.module.less';
import { DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { getSearchHotDetail } from '@/api';
import { SearchHot } from '@/types';
import json from 'json5';
import { useClickAway } from 'react-use';

const EmptySuggestion: React.FC = () => {
  const [searchHot, setSearchHot] = useState<SearchHot[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleCloseClick: React.MouseEventHandler<HTMLSpanElement> = e => {
    e.stopPropagation();
  };

  function handleLabelClick() {
    // TODO
  }

  useEffect(() => {
    const searchHistory = localStorage.getItem('search-history');
    if (searchHistory) setSearchHistory(json.parse<string[]>(searchHistory));

    (async () => {
      const res = await getSearchHotDetail();
      setSearchHot(res.data);
    })();
  }, []);

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
                onClick={handleLabelClick}
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
        <div className={styles['empty-suggestion__item']}>
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
