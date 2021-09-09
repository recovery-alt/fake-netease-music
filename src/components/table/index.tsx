import React, { useEffect, useState } from 'react';
import styles from './table.module.less';
import { Data } from '@/types';
import NoData from '../no-data';
import { get } from 'lodash';
import classNames from 'classnames';
import { message } from 'antd';

export type Column<T = Data> = {
  width?: number;
  title?: string;
  key?: string;
  render?: (item: T) => React.ReactNode;
  format?: (item: string) => string;
};

type Props = {
  columns: Column<any>[];
  data: Data<any>[];
  noHead?: boolean;
  selectedRow?: number;
  doubleClick?: (index: number) => void;
  disableColumn?: string;
};

const Table: React.FC<Props> = ({
  columns,
  data,
  disableColumn = 'disable',
  noHead = false,
  selectedRow,
  doubleClick,
}) => {
  const [selected, setSelected] = useState(-1);

  const handleDoubleClick = (index: number) => {
    if (!doubleClick) return;
    if (data[index][disableColumn]) {
      message.error('应合作方要求，该资源暂时下架>_<');
      return;
    }
    // setSelected(index);
    doubleClick(index);
  };

  useEffect(() => {
    if (selectedRow) setSelected(selectedRow);
  }, [selectedRow]);

  return (
    <>
      <table className={styles.table}>
        <colgroup></colgroup>
        {!noHead && (
          <thead>
            <tr>
              {columns.map((item, i) => (
                <th key={i}>
                  <div className={styles.table__cell}>{item.title}</div>
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.length > 0
            ? data.map((item, i) => (
                <tr
                  key={i}
                  className={classNames({
                    [styles['--active']]: selected === i,
                    [styles['--disable']]: item[disableColumn],
                  })}
                  onDoubleClick={() => handleDoubleClick(i)}
                >
                  {columns.map((column, j) => {
                    let text;
                    if (column.render) {
                      text = column.render(item);
                    } else if (column.key) {
                      text = get(item, column.key) as string;
                      if (column.format) text = column.format(text);
                    }

                    return (
                      <td key={j}>
                        <div className={styles.table__cell}>{text}</div>
                      </td>
                    );
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
