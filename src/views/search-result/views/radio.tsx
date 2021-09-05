import { DJRadio, SearchRadio } from '@/types';
import React from 'react';
import List from '../list';
import { usePagination, Props } from '../hook';
import { SearchType } from '@/enum';

const Radio: React.FC<Props> = props => {
  const params = { ...props, currentType: SearchType.RADIO };
  const { wrapEmpty } = usePagination<SearchRadio>(params);

  function listDataAdapter(radios: DJRadio[]) {
    return radios.map(radio => {
      const { picUrl: imgUrl, name, dj } = radio;
      const col3 = `by ${dj.nickname}`;
      return { imgUrl, name, col3 };
    });
  }

  return wrapEmpty(data => <List data={listDataAdapter(data.djRadios)} />);
};

export default Radio;
