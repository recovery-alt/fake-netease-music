import { FC } from 'react';
import styles from '../music-present.module.less';
import Img from '@/components/img';
import { Props as PresentProps } from '../';
import dayjs from 'dayjs';
import { classGenerator, resizeImg } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAndSetCurrentTrack, RootState } from '@/store';
import { message } from 'antd';
import { DynamicPage } from '@/router';

type Props = Omit<PresentProps, 'type'>;

const Card: FC<Props> = ({ data, isAlbum }) => {
  const getClass = classGenerator('card', styles);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const isLogin = useSelector((state: RootState) => !!state.user.cookie);

  function handleCardClick(id: number) {
    if (!id) return;
    if (isAlbum) {
      push(DynamicPage.list(id, 'album'));
    } else {
      isLogin ? push(DynamicPage.list(id)) : message.error('需要登录，才能查看他人歌单信息>_<');
    }
  }

  return (
    <div className={getClass()}>
      {data.map(item => (
        <div key={item.id} className={getClass('item')}>
          <div className={getClass('img-wrapper')}>
            <Img
              src={resizeImg(item.picUrl, 150)}
              className={getClass('img')}
              icon={{ size: 'big', hoverDisplay: true }}
              onClick={() => handleCardClick(item.id)}
              onIconClick={() => dispatch(fetchAndSetCurrentTrack({ id: item.id, isAlbum }))}
            />
          </div>
          <div className={getClass('description')}>
            <div className={getClass('title')}>{item.name}</div>
            <div className={getClass('subtitle')}>
              {dayjs(item.publishTime).format('YYYY-MM-DD')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
