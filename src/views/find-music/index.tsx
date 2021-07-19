import React from 'react';
import Banner from './banner';
import './find-music.less';
import { PlayCircleFilled } from '@ant-design/icons';
import Title from './title';
import avatar from '@/assets/img/avatar.svg';

export default function FindMusic() {
  return (
    <div className="find-music">
      <Banner />
      <Title name="推荐歌单" />
      <div className="find-music__card-wrapper">
        {Array(10)
          .fill(0)
          .map((item, i) => (
            <div key={i} className="find-music__card-item">
              <div className="find-music__card-box"></div>
              <span>一段描述信息</span>
            </div>
          ))}
      </div>
      <Title name="独家放送" />
      <div className="find-music__card-wrapper">
        {Array(4)
          .fill(0)
          .map((item, i) => (
            <div key={i} className="find-music__card-item --rect">
              <div className="find-music__card-box --rect"></div>
              <span>一段描述信息</span>
            </div>
          ))}
      </div>
      <Title name="最新音乐" />
      <div className="find-music__newest-wrapper">
        {Array(10)
          .fill(0)
          .map((item, i) => (
            <div key={i} className={`find-music__newest-item ${i === 2 ? '--actived' : ''}`}>
              <div className="find-music__newest-img">
                <img src={avatar} alt="music" />
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
      <Title name="推荐MV" />
      <div className="find-music__card-wrapper">
        {Array(4)
          .fill(0)
          .map((item, i) => (
            <div key={i} className="find-music__card-item --rect">
              <div className="find-music__card-box --rect"></div>
              <span>一段描述信息</span>
            </div>
          ))}
      </div>
      <Title name="主播电台" />
      <div className="find-music__newest-wrapper">
        {Array(10)
          .fill(0)
          .map((item, i) => (
            <div key={i} className={`find-music__newest-item ${i === 2 ? '--actived' : ''}`}>
              <div className="find-music__newest-img">
                <img src={avatar} alt="music" />
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
