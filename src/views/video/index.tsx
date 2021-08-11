import React, { useEffect } from 'react';
import './video.less';
import { RightOutlined } from '@ant-design/icons';
import className from 'classnames';
import { getVideoCategoryList } from '@/api';

const Video: React.FC = () => {
  useEffect(() => {
    (async () => {
      const res = await getVideoCategoryList();
      console.log(res);
    })();
  }, []);

  return (
    <div className="video">
      <header className="video__header">
        <button className="video__button">
          全部视频 <RightOutlined />
        </button>
        <div className="video__type">
          {Array(9)
            .fill(0)
            .map((item, i) => (
              <div key={i} className="video__type-item">
                <span className={className({ ['--active']: i === 0 })}>现场</span>
              </div>
            ))}
        </div>
      </header>
      <section className="video__list">
        {Array(18)
          .fill(0)
          .map((item, i) => (
            <div key={i} className="video__item">
              <div className="video__img">
                <img src="" alt="" />
              </div>
              <div className="video__description">
                <h3>大师大大大大大说</h3>
                <h4>basadddadadadadas</h4>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Video;
