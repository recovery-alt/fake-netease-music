import React, { useEffect, useMemo, useState } from 'react';
import '../list/list.less';
import './radio-list.less';
import Img from '@/components/img';
import { classGenerator, formatMS, resizeImg } from '@/utils';
import Button from '@/components/button';
import {
  ShareAltOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  PlayCircleOutlined,
  LikeOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { getDJDetail, getDJProgram } from '@/api';
import { DJDetail, DJProgram } from '@/types';
import dayjs from 'dayjs';
import Subscriber from './subscriber';
import { useDispatch, useSelector } from 'react-redux';
import { insertSong, RootState } from '@/store';
import { setDJDetail } from '@/store';

const RadioList: React.FC = () => {
  const getListClass = classGenerator('list');
  const getClass = classGenerator('radio-list');
  const params = useParams<{ id: string }>();
  const id = useMemo(() => Number(params.id), [params.id]);
  const [programs, setPrograms] = useState<DJProgram[]>([]);
  const djDetail = useSelector((state: RootState) => state.djDetail);
  const dispatch = useDispatch();

  async function loadDJDetail() {
    const res = await getDJDetail(id);
    dispatch(setDJDetail(res.data));
  }

  async function loadDJProgram() {
    const res = await getDJProgram(id);
    setPrograms(res.programs);
  }

  async function handleItemClick(id: number) {
    dispatch(insertSong(id));
  }

  useEffect(() => {
    if (Number.isNaN(id)) return;
    loadDJDetail();
    loadDJProgram();
  }, [id]);

  return (
    <div className={getListClass()}>
      <header className={getListClass('header')}>
        <Img
          className={getListClass('img')}
          src={djDetail.picUrl && resizeImg(djDetail.picUrl, 200)}
        />
        <div className={getListClass('right')}>
          <div className={getListClass('title')}>
            <span>电台</span>
            <strong>{djDetail.name}</strong>
          </div>
          <div className={getListClass('user-info')}>
            <img src={djDetail.dj && resizeImg(djDetail.dj.avatarUrl, 30)} alt="avatar" />
            <a>{djDetail.dj?.nickname}</a>
          </div>
          <div className={getListClass('control')}>
            <Button compose />
            <Button>
              <StarOutlined />
              已订阅({djDetail.subCount})
            </Button>
            <Button>
              <ShareAltOutlined />
              分享({djDetail.shareCount})
            </Button>
          </div>
          <div className={getClass('tag')}>
            <span>{djDetail.category}</span>
            <strong>{djDetail.desc}</strong>
          </div>
        </div>
      </header>
      <section className={getListClass('tabs')}>
        <Tabs>
          <Tabs.TabPane tab="节目" key="1">
            <div className={getClass('control')}>
              <div>共{djDetail.programCount}期</div>
              <div className={getClass('control-right')}>
                <strong>排序</strong>
                <SortAscendingOutlined className={getClass('icon')} />
                <SortDescendingOutlined className={getClass('icon')} />
              </div>
            </div>
            {programs.map(item => (
              <div key={item.id} className={getClass('item')}>
                <div className={getClass('ordinal')}>{item.serialNum}</div>
                <Img
                  className={getClass('cover')}
                  icon={{ hoverDisplay: true }}
                  src={resizeImg(item.coverUrl, 60)}
                  onClick={() => handleItemClick(item.mainSong.id)}
                  onIconClick={() => handleItemClick(item.mainSong.id)}
                />
                <div className={getClass('name')}>{item.name}</div>
                <div className={getClass('play-count')}>
                  <PlayCircleOutlined /> {item.trackCount}
                </div>
                <div className={getClass('like-count')}>
                  <LikeOutlined /> {item.likedCount}
                </div>
                <div className={getClass('date')}>
                  {dayjs(item.createTime).format('YYYY-MM-DD')}
                </div>
                <div className={getClass('duration')}>{formatMS(item.duration)}</div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="订阅者" key="3">
            <Subscriber id={id} />
          </Tabs.TabPane>
        </Tabs>
      </section>
    </div>
  );
};

export default RadioList;
