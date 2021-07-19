import React from 'react';
import type { RouteConfig } from '@/router';
import { Switch, Route, Redirect } from 'react-router-dom';
import './layout.less';
import {
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
  MailOutlined,
  SkinOutlined,
  CompressOutlined,
  CustomerServiceOutlined,
  TeamOutlined,
  PlaySquareOutlined,
  DownloadOutlined,
  FieldTimeOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  PlusOutlined,
  HeartOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
  PlayCircleFilled,
  DeleteOutlined,
  SoundOutlined,
  ControlOutlined,
  UnorderedListOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import ProgressBar from './progress-bar';
import avatar from '@/assets/img/avatar.svg';

export default function Layout({ routes }: { routes?: Array<RouteConfig> }) {
  return (
    <>
      <header className="header">
        <div className="header__left">
          <LeftOutlined className="header__left-icon" />
          <RightOutlined className="header__left-icon" />
        </div>
        <div className="header__right">
          <ul className="header__right-menu">
            {['个性推荐', '歌单', '主播电台', '排行榜', '歌手', '最新音乐'].map((item, i) => (
              <li className={i === 0 ? '--actived' : ''} key={item}>
                {item}
              </li>
            ))}
          </ul>
          <div className="header__right-search">
            <SearchOutlined />
            <input type="text" placeholder="搜索" />
          </div>
          <div className="header__right-icons">
            {[SettingOutlined, MailOutlined, SkinOutlined, CompressOutlined].map((Icon, i) => (
              <Icon key={i} />
            ))}
          </div>
        </div>
      </header>
      <section className="container">
        <aside className="aside">
          <header className="aside__header">
            <img src={avatar} alt="icon" />
            <span>未登录</span>
          </header>
          {[
            { name: '发现音乐', icon: CustomerServiceOutlined },
            { name: '私人FM', icon: TeamOutlined },
            { name: '视频', icon: PlaySquareOutlined },
            { name: '朋友', icon: TeamOutlined },
          ].map((item, i) => (
            <div key={i} className={`aside__item${i === 0 ? ' --actived' : ''}`}>
              <item.icon />
              <a>{item.name}</a>
            </div>
          ))}
          <div className="aside__title">我的音乐</div>
          {[
            { name: 'iTunes音乐', icon: CustomerServiceOutlined },
            { name: '下载管理', icon: DownloadOutlined },
            { name: '最近播放', icon: FieldTimeOutlined },
          ].map((item, i) => (
            <div key={i} className={`aside__item${i === 0 ? ' --actived' : ''}`}>
              <item.icon />
              <a>{item.name}</a>
            </div>
          ))}
          <div className="aside__title">
            <div className="aside__title-left">
              <CaretDownOutlined />
              <a>创建的歌单</a>
            </div>
            <PlusOutlined className="aside__title-right" />
          </div>
          {[{ name: '我喜欢的音乐', icon: HeartOutlined }].map((item, i) => (
            <div key={i} className={`aside__item${i === 1 ? ' --actived' : ''}`}>
              <item.icon />
              <a>{item.name}</a>
            </div>
          ))}
        </aside>
        <main className="main">
          <Switch>
            {routes &&
              routes.map(route => (
                <Route path={route.path} key={route.path}>
                  <route.component />
                </Route>
              ))}
            <Redirect to={routes![0].path} />
          </Switch>
        </main>
      </section>
      <footer className="footer">
        <ProgressBar />
        <div className="footer__left">
          <img src={avatar} alt="music" />
          <div className="footer__left-name">
            <div>老街 - 李荣浩</div>
            <div>01:30 / 04:50</div>
          </div>
        </div>
        <div className="footer__mid">
          <HeartOutlined />
          <VerticalRightOutlined className="--red" />
          <PlayCircleFilled className="--big --red" />
          <VerticalLeftOutlined className="--red" />
          <DeleteOutlined />
        </div>
        <div className="footer__right">
          <ControlOutlined />
          <RetweetOutlined />
          <UnorderedListOutlined />
          <span>词</span>
          <SoundOutlined />
        </div>
      </footer>
    </>
  );
}
