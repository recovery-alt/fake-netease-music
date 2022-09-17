import { StarOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/button';
import { RootState } from '@/store';
import { Music } from '@/types';
import { classGenerator } from '@/utils';

import styles from './radio-detail.module.less';

type Props = { music: Music };

const RadioDetail: FC<Props> = ({ music }) => {
  const getClass = classGenerator('radio-detail', styles);
  const djDetail = useSelector((state: RootState) => state.djDetail);

  return (
    <div className={getClass()}>
      <h2>{music.name}</h2>
      <div className={getClass('name')}>
        <strong>{djDetail?.name}</strong>
        <Button>
          <StarOutlined /> 订阅({djDetail.subCount})
        </Button>
      </div>
      <div className={getClass('detail')}>
        <div className={getClass('item')}>
          <label>主播:</label>
          <a>{djDetail.dj?.nickname}</a>
        </div>
        <div className={getClass('item')}>
          <label>来源:</label>
          <a>{djDetail.original}</a>
        </div>
        <div className={getClass('item')}>
          <label>创建时间:</label>
          <span>{djDetail.createTime}</span>
        </div>
        <div className={getClass('item')}>
          <label>已播放:</label>
          <span>{djDetail.playCount}次</span>
        </div>
      </div>
      <div className={getClass('tag-wrapper')}>
        <span className={getClass('tag')}>{djDetail.category}</span>
        {djDetail.desc}
      </div>
    </div>
  );
};

export default RadioDetail;
