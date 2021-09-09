import React from 'react';
import './cloud-music.less';
import Button from '@/components/button';
import Input from '@/components/input';
import Table, { Column } from '@/components/table';
import { Data } from '@/types';

const CloudMusic: React.FC = () => {
  const columns: Column[] = [
    { key: 'ordinal' },
    { key: 'title', title: '音乐标题' },
    { key: 'artist', title: '歌手' },
    { key: 'album', title: '专辑' },
    { key: 'format', title: '格式' },
    { key: 'size', title: '大小' },
    { key: 'time', title: '上传时间' },
  ];
  const data: Data<string | number>[] = [];

  return (
    <div>
      <header className="cloud-music__header">
        <div className="cloud-music__capacity">
          <span className="cloud-music__capacity-title">云盘容量</span>
          <div className="cloud-music__ruler">
            <div></div>
          </div>
          <span className="cloud-music__capacity-ratio">4.8G/60G</span>
          <span className="cloud-music__capacity-description">歌曲永久保存，随时随地多端畅听</span>
        </div>
        <div className="cloud-music__control">
          <Button />
          <Input />
        </div>
      </header>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default CloudMusic;
