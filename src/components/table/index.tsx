import React, { useEffect, useState } from 'react';
import styles from './table.module.less';
import { Data } from '@/types';
import NoData from '../no-data';
import get from 'lodash/get';
import classNames from 'classnames';
import { message } from 'antd';
import { classGenerator } from '@/utils';

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
  onDoubleClick?: (index: number) => void;
  disableColumn?: string;
};

const Table: React.FC<Props> = ({
  columns,
  data,
  disableColumn = 'disable',
  noHead = false,
  selectedRow,
  onDoubleClick,
}) => {
  const getClass = classGenerator('table', styles);
  const [selected, setSelected] = useState(-1);

  function handleDoubleClick(index: number) {
    if (!onDoubleClick) return;
    if (data[index][disableColumn]) {
      message.error('应合作方要求，该资源暂时下架>_<');
      return;
    }
    // setSelected(index);
    onDoubleClick(index);
  }

  useEffect(() => {
    if (selectedRow !== undefined) setSelected(selectedRow);
  }, [selectedRow]);

  return (
    <>
      <table className={getClass()}>
        <colgroup></colgroup>
        {!noHead && (
          <thead>
            <tr>
              {columns.map((item, i) => (
                <th key={i}>
                  <div className={getClass('cell')}>{item.title}</div>
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
                        <div className={getClass('cell')}>{text}</div>
                      </td>
                    );
                  })}
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {data.length > 0 ? null : <NoData subTitle="暂无数据" />}
    </>
  );
};

export default Table;
