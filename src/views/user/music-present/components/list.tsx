import { message } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { DynamicPage } from '@/router';
import { RootState } from '@/store';
import ListBox, { ListItem } from '@/views/search-result/list';

import { Props as PresentProps } from '../';

type Props = Omit<PresentProps, 'type'>;

const List: FC<Props> = ({ data, isAlbum }) => {
  const { push } = useHistory();
  const transData = data.map(item => ({
    id: item.id,
    imgUrl: item.picUrl,
    name: item.name,
    col2: `${item.size}首`,
    col3: `发行时间： ${dayjs(item.publishTime).format('YYYY-MM-DD')}`,
  }));
  const isLogin = useSelector((state: RootState) => !!state.user.cookie);

  function handleItemClick(item: ListItem) {
    if (!item.id) return;
    if (isAlbum) {
      push(DynamicPage.list(item.id, 'album'));
    } else {
      isLogin
        ? push(DynamicPage.list(item.id))
        : message.error('需要登录，才能查看他人歌单信息>_<');
    }
  }

  return <ListBox imgType="extra" data={transData} onItemClick={handleItemClick} />;
};

export default List;
