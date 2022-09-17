import '../list/list.less';
import './radio-list.less';

import {
  AccountBookOutlined,
  PlayCircleOutlined,
  ShareAltOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Tabs } from 'antd';
import classNames from 'classnames';
import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getDJDetail, getDJProgram } from '@/api';
import { clearRequests } from '@/api/api';
import Button from '@/components/button';
import Img from '@/components/img';
import { AppDispatch, insertSong, RootState } from '@/store';
import { setDJDetail } from '@/store';
import { DJProgram } from '@/types';
import { classGenerator, resizeImg, toHttps } from '@/utils';

import Card from './card';
import Subscriber from './subscriber';

const RadioList: FC = () => {
  const getListClass = classGenerator('list');
  const getClass = classGenerator('radio-list');
  const params = useParams<{ id: string; type?: 'pay' }>();
  const id = useMemo(() => Number(params.id), [params.id]);
  const isPay = useMemo(() => !!params.type, [params.type]);
  const [programs, setPrograms] = useState<DJProgram[]>([]);
  const recentPrograms = useMemo(
    () => programs.sort((a, b) => a.createTime - b.createTime).slice(0, 3),
    [programs]
  );
  const freePrograms = useMemo(
    () => programs.filter(item => item.programFeeType === 5),
    [programs]
  );
  const djDetail = useSelector((state: RootState) => state.djDetail);
  const dispatch = useDispatch<AppDispatch>();

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

  function renderRadioDetail() {
    return (
      <>
        <div className={getListClass('user-info')}>
          <img src={djDetail.dj && toHttps(resizeImg(djDetail.dj.avatarUrl, 30))} alt="avatar" />
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
      </>
    );
  }

  function renderPayDetail() {
    return (
      <>
        <div className={getClass('price')}>¥{(djDetail?.feeInfo?.originalPrice || 0) / 100}</div>
        <div className={getClass('buttons')}>
          <button className={classNames(getClass('button'), '--bg')}>
            <AccountBookOutlined />
            立即购买
          </button>
          <button className={classNames(getClass('button'), '--border')}>
            <PlayCircleOutlined />
            免费试听
          </button>
          <Button>
            <ShareAltOutlined />
            分享(175)
          </Button>
        </div>
        <div className={getClass('slogan')}>{djDetail.feeInfo?.slogan}</div>
        <small className={getClass('brief')}>最新上架</small>
      </>
    );
  }

  useEffect(() => {
    if (Number.isNaN(id)) return;
    loadDJDetail();
    loadDJProgram();

    return clearRequests;
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
            <span>{isPay ? '付费精品' : '电台'}</span>
            <strong>{djDetail.name}</strong>
          </div>
          {isPay ? renderPayDetail() : renderRadioDetail()}
        </div>
      </header>
      <section className={getListClass('tabs')}>
        <Tabs>
          {isPay && (
            <Tabs.TabPane tab="详情" key="0">
              <div className={getClass('detail')}>
                <h3 className={getClass('detail-title')}>电台内容简介</h3>
                <p>{djDetail.desc}</p>
                {recentPrograms.length > 0 && (
                  <>
                    <h3 className={getClass('detail-title')}>最近更新</h3>
                    {recentPrograms.map(item => (
                      <Card key={item.id} item={item} onItemClick={handleItemClick} />
                    ))}
                  </>
                )}
                {freePrograms.length > 0 && (
                  <>
                    <h3 className={getClass('detail-title')}>免费试听 &gt;</h3>
                    {freePrograms.map(item => (
                      <Card key={item.id} item={item} onItemClick={handleItemClick} />
                    ))}
                  </>
                )}
                <h3 className={classNames(getClass('detail-title'), getClass('detail-notice'))}>
                  购买须知
                </h3>
                <p>
                  1. 本音频为付费订阅产品￥12.9/12期，购买成功后即可畅听/下载
                  <br />
                  2. 请在网易云音乐手机APP支付购买，购买后支持移动、PC、Web等端收听
                  <br />
                  3. 购买成功后不可退款，同时不支持转让，敬请谅解；
                  <br />
                  4. 购买过程遇到任何问题，请私信联系@云音乐客服
                </p>
              </div>
            </Tabs.TabPane>
          )}
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
              <Card key={item.id} item={item} onItemClick={handleItemClick} />
            ))}
          </Tabs.TabPane>
          {!isPay && (
            <Tabs.TabPane tab="订阅者" key="3">
              <Subscriber id={id} />
            </Tabs.TabPane>
          )}
        </Tabs>
      </section>
    </div>
  );
};

export default RadioList;
