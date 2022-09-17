import { Pagination } from 'antd';
import { ReactElement, useEffect, useMemo, useState } from 'react';

import { getSearch } from '@/api';
import { clearRequests } from '@/api/api';
import { SearchType } from '@/enum';
import { SearchMultimatch, SearchResult } from '@/types';

import { getClass } from '.';

export type Props = {
  type: SearchType;
  keywords: string;
  limit?: number;
  setTotal: (total: number) => void;
  bestMatch?: SearchMultimatch;
};

type Params = { currentType: SearchType } & Props;

export const usePagination = <T,>({
  limit = 20,
  type,
  keywords,
  currentType,
  setTotal,
}: Params) => {
  const [data, setData] = useState<T>();
  const [current, setCurrent] = useState(1);
  const total = useMemo(() => getTotal(data), [type, data]);

  async function loadData(current = 1, pageSize = 20) {
    const offset = (current - 1) * pageSize;
    const res = await getSearch<SearchResult<T>>({
      type,
      keywords,
      offset,
      limit,
    });
    setTotal(getTotal(res.result));
    setData(res.result);
  }

  function handleCurrentChange(current: number, pageSize?: number) {
    setCurrent(current);
    loadData(current, pageSize);
  }

  function getTotal(data: any) {
    if (!data) return 0;
    const map: Record<SearchType, string> = {
      1: 'songCount',
      100: 'artistCount',
      10: 'albumCount',
      1014: 'videoCount',
      1000: 'playlistCount',
      1006: 'songCount',
      1009: 'djRadiosCount',
      1002: 'userprofileCount',
    };
    return (data as any)[map[type]] || 0;
  }

  function wrapEmpty(renderSlot: (data: T) => ReactElement<any, any> | null) {
    const empty = (
      <div className={getClass('empty')}>
        很抱歉，未能找到与“<span>{keywords}</span>”相关的任何信息。
      </div>
    );
    return data ? (
      <>
        {renderSlot(data)}
        {total > limit && (
          <footer className={getClass('footer')}>
            <Pagination
              total={total}
              showSizeChanger={false}
              current={current}
              onChange={handleCurrentChange}
            />
          </footer>
        )}
      </>
    ) : (
      empty
    );
  }

  useEffect(() => {
    if (type === currentType) loadData();
    return clearRequests;
  }, [type, keywords]);

  return { wrapEmpty };
};
