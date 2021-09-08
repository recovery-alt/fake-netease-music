import React, { useCallback, useState } from 'react';
import './singer.less';
import Img from '@/components/img';
import { FileAddOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import Album from './album';
import Detail from './detail';
import MV from './mv';
import Similar from './similar';
import Show from './show';
import ButtonGroup from './button-group';

const { TabPane } = Tabs;

const Singer: React.FC = () => {
  const [activeKey, setActiveKey] = useState('专辑');
  const tabs = [
    { name: '专辑', component: Album },
    { name: 'MV', component: MV },
    { name: '歌手详情', component: Detail },
    { name: '相似歌手', component: Similar },
    { name: '演出', component: Show },
  ];

  const extraContent = activeKey === '专辑' ? { right: <ButtonGroup /> } : undefined;

  return (
    <div className="singer">
      <header className="singer__header">
        <Img src="" className="singer__img" />
        <section className="singer__right">
          <h2>薛之谦</h2>
          <h3>Joker Xue</h3>
          <div>
            <button className="singer__button">
              <FileAddOutlined />
              收藏
            </button>
            <button className="singer__button">
              <UserOutlined />
              个人主页
            </button>
          </div>
          <div className="singer__description">
            <span>
              单曲数:<strong>300</strong>
            </span>
            <span>
              专辑数:<strong>300</strong>
            </span>
            <span>
              MV数:<strong>300</strong>
            </span>
            <span>
              演出数:<strong>300</strong>
            </span>
          </div>
        </section>
      </header>
      <Tabs
        tabBarExtraContent={extraContent}
        destroyInactiveTabPane
        onChange={tab => setActiveKey(tab)}
      >
        {tabs.map(tab => (
          <TabPane tab={tab.name} key={tab.name}>
            <tab.component />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Singer;
