import React, { useState } from 'react';
import './list.less';
import Button from '@/components/button';
import { FolderAddOutlined, ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import Tab from './components/tab';
import Table, { Column } from '@/components/table';
import { Data } from '@/types';

const List: React.FC = () => {
  const columns: Column[] = [
    { title: '', key: 'ordinal' },
    { title: '', key: 'action' },
    { title: '音乐标题', key: 'title' },
    { title: '歌手', key: 'artist' },
    { title: '专辑', key: 'album' },
    { title: '时长', key: 'duration' },
  ];
  const [data, setData] = useState<Data<string | number>[]>([]);

  return (
    <div className="list">
      <header className="list__header">
        <img className="list__img" src="" alt="" />
        <div className="list__right">
          <div className="list__title">
            <span>歌单</span>
            <strong>我喜欢的音乐</strong>
          </div>
          <div className="list__description">
            <img src="" alt="" />
            <a>渣秋</a>
            <span>2015-12-04创建</span>
          </div>
          <div className="list__control">
            <Button />
            <button className="">
              <FolderAddOutlined />
              收藏(0)
            </button>
            <button className="">
              <ShareAltOutlined />
              分享(0)
            </button>
            <button className="">
              <DownloadOutlined />
              下载全部
            </button>
          </div>
          <div className="list__count">
            <span>歌曲数: 12</span>
            <span>播放数: 2602</span>
          </div>
        </div>
      </header>
      <Tab />
      <Table columns={columns} data={data} />
    </div>
  );
};

export default List;
