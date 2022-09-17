import { FC } from 'react';

import { SearchType } from '@/enum';
import { DJRadio, SearchRadio } from '@/types';

import { Props, usePagination } from '../hook';
import List from '../list';

const Radio: FC<Props> = props => {
  const params = { ...props, currentType: SearchType.RADIO };
  const { wrapEmpty } = usePagination<SearchRadio>(params);

  function listDataAdapter(radios: DJRadio[]) {
    return radios.map(radio => {
      const { picUrl: imgUrl, name, dj, id } = radio;
      const col3 = `by ${dj.nickname}`;
      return { id, imgUrl, name, col3 };
    });
  }

  return wrapEmpty(data => <List data={listDataAdapter(data.djRadios)} />);
};

export default Radio;
