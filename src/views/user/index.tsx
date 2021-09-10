import React, { useEffect, useMemo, useState } from 'react';
import './user.less';
import Img from '@/components/img';
import {
  ManOutlined,
  WomanOutlined,
  AudioOutlined,
  MailOutlined,
  PlusOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import List from '@/views/search-result/list';
import ButtonGroup from './button-group';
import Album, { AlbumPageMode } from '@/views/singer/album';
import { getUserDetail } from '@/api';
import { useParams } from 'react-router-dom';

const User: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = useMemo(() => Number(params.id), [params.id]);
  const [activeButton, setActiveButton] = useState<AlbumPageMode>('overview');

  async function loadUserDetail() {
    const res = await getUserDetail(id);
  }

  useEffect(() => {
    if (Number.isNaN(id)) return;
    loadUserDetail();
  }, []);

  return (
    <div>
      <header className="user__header">
        <Img src="" className="user__cover" />
        <div className="user__introduction">
          <h2>薛之谦</h2>
          <div className="user__title">
            <div className="user__title-left">
              <strong>原创歌手薛之谦</strong>
              <mark>Lv1</mark>
              <ManOutlined />
            </div>
            <div className="user__title-right">
              <button>
                <AudioOutlined />
                歌手页
              </button>
              <button>
                <MailOutlined />
                发私信
              </button>
              <button>
                <PlusOutlined />
                关注
              </button>
              <button className="--circle">
                <EllipsisOutlined />
              </button>
            </div>
          </div>
          <div className="user__statistic">
            <div className="user__statistic-item">
              <h3>17</h3>
              <div>动态</div>
            </div>
            <div className="user__statistic-item">
              <h3>0</h3>
              <div>关注</div>
            </div>
            <div className="user__statistic-item">
              <h3>121221</h3>
              <div>粉丝</div>
            </div>
          </div>
          <div className="user__social">
            <div>
              社交网络: <span>未绑定</span>
            </div>
            <div>
              个人介绍: <span>暂无介绍</span>
            </div>
          </div>
        </div>
      </header>
      <h2 className="user__tag">
        <div>
          Ta创建的电台<strong>（1）</strong>
        </div>
      </h2>
      <div className="user__radio">
        <List data={[]} />
      </div>
      <h2 className="user__tag">
        <div>
          歌单<strong>（1）</strong>
        </div>
        <ButtonGroup activeButton={activeButton} setActiveButton={setActiveButton} />
      </h2>
      <div className="user__playlist">
        <Album type={activeButton} id={0} albums={[]} />
      </div>
    </div>
  );
};

export default User;
