import React from 'react';
import styles from './table.module.less';
import { Data } from '@/types';
import NoData from '../no-data';

export type Column = { width?: number; title: string; key: string; render?: () => React.ReactNode };

type Props = {
  columns: Column[];
  data: Data<number | string>[];
};

const Table: React.FC<Props> = ({ columns, data }) => {
  return (
    <>
      <table className={styles.table}>
        <colgroup></colgroup>
        <thead>
          <tr>
            {columns.map((item, i) => (
              <th key={i}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0
            ? data.map((item, i) => (
                <tr key={i}>
                  {columns.map((column, j) => (
                    <td key={j}>{item[column.key]}</td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {data.length > 0 ? null : <NoData subTitle="还没有下载的音乐哦，快去下载吧～" />}
    </>
  );
};

export default Table;
