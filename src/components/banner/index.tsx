import React from 'react';
import './banner.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner__item" style={{ transform: 'translateX(150px) scale(0.8)' }}></div>
      <div className="banner__item"></div>
      <div className="banner__item" style={{ transform: 'translateX(-150px) scale(0.8)' }}></div>
      <div className="banner__dot-wrapper">
        <div className="banner__dot --actived"></div>
        <div className="banner__dot"></div>
        <div className="banner__dot"></div>
        <div className="banner__dot"></div>
        <div className="banner__dot"></div>
      </div>
      <LeftOutlined className="banner__array --left" />
      <RightOutlined className="banner__array --right" />
    </div>
  );
}
