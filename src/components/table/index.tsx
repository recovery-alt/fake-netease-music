import React from 'react';
import styles from './table.module.less';
import { Data } from '@/types';
import NoData from '../no-data';
import { get } from 'lodash';

export type Column<T = Data> = {
  width?: number;
  title: string;
  key?: string;
  render?: (item: T) => React.ReactNode;
  format?: (item: string) => string;
};

type Props = {
  columns: Column<any>[];
  data: Data[];
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
                  {columns.map((column, j) => {
                    let text;
                    if (column.render) {
                      text = column.render(item);
                    } else if (column.key) {
                      text = get(item, column.key) as string;
                      if (column.format) text = column.format(text);
                    }

                    return <td key={j}>{text}</td>;
                  })}
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
