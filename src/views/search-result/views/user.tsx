import { UserProfile as UserType, SearchUser } from '@/types';
import React from 'react';
import List from '../list';
import { usePagination, Props } from '../hook';
import { SearchType } from '@/enum';

const UserProfile: React.FC<Props> = props => {
  const params = { ...props, currentType: SearchType.USER, limit: 20 };
  const { wrapEmpty } = usePagination<SearchUser>(params);

  function listDataAdapter(users: UserType[]) {
    return users.map(user => {
      const { avatarUrl: imgUrl, nickname, description, userId: id } = user;
      const name = nickname;
      const col3 = description;
      return { id, imgUrl, name, col3 };
    });
  }

  return wrapEmpty(data => <List imgType="circle" data={listDataAdapter(data.userprofiles)} />);
};

export default UserProfile;