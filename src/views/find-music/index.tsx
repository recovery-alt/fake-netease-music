import React from 'react';
import Banner from '@/components/banner';
import './find-music.less';
import { RightOutlined, PlayCircleFilled } from '@ant-design/icons';

export default function FindMusic() {
  return (
    <div className="find-music">
      <Banner />
      <header className="find-music__title">
        推荐歌单
        <RightOutlined />
      </header>
      <div className="find-music__card-wrapper">
        {Array(10)
          .fill(0)
          .map((item, i) => (
            <div key={i} className="find-music__card-item">
              <div className="find-music__card-box"></div>
              <span>
                推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单
              </span>
            </div>
          ))}
      </div>
      <header className="find-music__title" style={{ marginTop: 0 }}>
        独家放送
        <RightOutlined />
      </header>
      <div className="find-music__card-wrapper">
        {Array(4)
          .fill(0)
          .map((item, i) => (
            <div key={i} className="find-music__card-item --rect">
              <div className="find-music__card-box --rect"></div>
              <span>
                推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单
              </span>
            </div>
          ))}
      </div>
      <header className="find-music__title" style={{ marginTop: 0 }}>
        最新音乐
        <RightOutlined />
      </header>
      <div className="find-music__newest-wrapper">
        {Array(10)
          .fill(0)
          .map((item, i) => (
            <div key={i} className={`find-music__newest-item ${i === 2 ? '--actived' : ''}`}>
              <div className="find-music__newest-img">
                <img src="/src/assets/img/avatar.svg" alt="music" />
                <PlayCircleFilled />
              </div>
              <strong>{i + 1}</strong>
              <div className="find-music__newest-name">
                <div>变废为宝</div>
                <div>薛之谦</div>
              </div>
            </div>
          ))}
      </div>
      <header className="find-music__title">
        推荐MV
        <RightOutlined />
      </header>
      <div className="find-music__card-wrapper">
        {Array(4)
          .fill(0)
          .map((item, i) => (
            <div key={i} className="find-music__card-item --rect">
              <div className="find-music__card-box --rect"></div>
              <span>
                推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单推荐歌单
              </span>
            </div>
          ))}
      </div>
      <header className="find-music__title" style={{ marginTop: 0 }}>
        主播电台
        <RightOutlined />
      </header>
      <div className="find-music__newest-wrapper">
        {Array(10)
          .fill(0)
          .map((item, i) => (
            <div key={i} className={`find-music__newest-item ${i === 2 ? '--actived' : ''}`}>
              <div className="find-music__newest-img">
                <img src="/src/assets/img/avatar.svg" alt="music" />
                <PlayCircleFilled />
              </div>
              <strong>{i + 1}</strong>
              <div className="find-music__newest-name">
                <div>变废为宝</div>
                <div>薛之谦</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
