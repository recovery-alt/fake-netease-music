import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import json from 'json5';
import { stringify } from 'qs';
import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getSearchHotDetail } from '@/api';
import { clearRequests } from '@/api/api';
import { Page } from '@/router';
import { AppDispatch, setKeywords } from '@/store';
import { SearchHot } from '@/types';
import { classGenerator } from '@/utils';

import styles from './empty-suggestion.module.less';

type Props = { visible: boolean; setVisible: (visible: boolean) => void };

const EmptySuggestion: FC<Props> = ({ visible, setVisible }) => {
  const getClass = classGenerator('empty-suggestion', styles);
  const [searchHot, setSearchHot] = useState<SearchHot[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { push } = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseClick: MouseEventHandler<HTMLSpanElement> = e => {
    e.stopPropagation();
  };

  function handleSearch(keywords: string) {
    dispatch(setKeywords(keywords));
    setVisible(false);
    const query = stringify({ keywords });
    push(`${Page.searchResult}?${query}`);
  }

  async function loadSearchHot() {
    const res = await getSearchHotDetail();
    setSearchHot(res.data);
  }

  useEffect(() => {
    if (!visible) return;
    const searchHistory = localStorage.getItem('search-history');
    if (searchHistory) setSearchHistory(json.parse<string[]>(searchHistory));
    loadSearchHot();

    return clearRequests;
  }, [visible]);

  return (
    <>
      {searchHistory.length > 0 && (
        <header className={getClass('header')}>
          <h2>
            搜索历史 <DeleteOutlined className={getClass('header-delete')} />
          </h2>
          <div className={getClass('history')}>
            {searchHistory.map((item, i) => (
              <div key={i} className={getClass('history-item')} onClick={() => handleSearch(item)}>
                {item}
                <CloseOutlined onClick={handleCloseClick} />
              </div>
            ))}
          </div>
        </header>
      )}
      <h3 className={getClass('title')}>热搜榜</h3>
      {searchHot.map((item, i) => (
        <div
          key={item.searchWord}
          className={getClass('item')}
          onClick={() => handleSearch(item.searchWord)}
        >
          <p>{i + 1}</p>
          <div className={getClass('item-right')}>
            <div className={getClass('item-top')}>
              <strong>{item.searchWord}</strong>
              {item.iconUrl ? <mark>HOT</mark> : null}
              <span>{item.score}</span>
            </div>
            {item.content && <div className={getClass('item-bottom')}>{item.content}</div>}
          </div>
        </div>
      ))}
    </>
  );
};

export default EmptySuggestion;
