import React, { useState, useEffect, useMemo } from 'react';
import './mv.less';
import { RightOutlined } from '@ant-design/icons';
import Nav from '../../nav';
import { areaCategory } from '@/config';
import List, { ListItem } from '../../list';
import { getMVFirst, getMVAll, getMVExclusiveRcmd, getTopMV } from '@/api';
import { MV as MVType } from '@/types';
import Img from '@/components/img';
import { classGenerator } from '@/utils';

const MV: React.FC = () => {
  const getClass = classGenerator('mv');
  const initAreaCategory = areaCategory.map(item => ({ name: item, id: item }));
  const [mvFirst, setMVFirst] = useState<ListItem[]>([]);
  const [selected] = useState(0);
  const [mvHot, setMVHot] = useState<ListItem[]>([]);
  const [mvExclusiveRcmd, setMVExclusiveRcmd] = useState<ListItem[]>([]);
  const [topMV, setTopMV] = useState<MVType[]>([]);
  const current = useMemo(() => initAreaCategory[selected], [selected]);

  function mv2ListAdapter(data: MVType[]) {
    return data.map(item => {
      const { id, artistName: description, cover: imgUrl, name: author } = item;
      return { id, description, imgUrl, author };
    });
  }

  useEffect(() => {
    (async () => {
      if (current?.id) {
        const res = await getMVFirst(current.id);
        setMVFirst(mv2ListAdapter(res.data));
      }
    })();

    (async () => {
      const res = await getMVAll();
      setMVHot(mv2ListAdapter(res.data));
    })();

    (async () => {
      const res = await getMVExclusiveRcmd();
      setMVExclusiveRcmd(mv2ListAdapter(res.data));
    })();

    (async () => {
      const res = await getTopMV();
      setTopMV(res.data);
    })();
  }, []);

  return (
    <div className={getClass()}>
      <header className={getClass('header')}>
        <strong>
          最新MV
          <RightOutlined />
        </strong>
        <Nav data={initAreaCategory} id="" />
      </header>
      <List data={mvFirst} />
      <header className={getClass('header --margin')}>
        <strong>
          热播MV
          <RightOutlined />
        </strong>
      </header>
      <List data={mvHot} />
      <header className={getClass('header --margin')}>
        <strong>
          网易出品
          <RightOutlined />
        </strong>
      </header>
      <List data={mvExclusiveRcmd} />
      <header className={getClass('header --margin')}>
        <strong>
          MV排行榜
          <RightOutlined />
        </strong>
        <Nav data={initAreaCategory} id="" />
      </header>
      <section className={getClass('rank')}>
        {topMV.map((item, i) => (
          <div key={item.id} className={getClass('rank-item')}>
            <div className={getClass('rank-ordinal')}>
              <h3>{i + 1}</h3>
              <h4>-</h4>
            </div>
            <div className={getClass('rank-img-wrapper')}>
              <Img className={getClass('rank-img')} src={item.cover} />
            </div>
            <div className={getClass('rank-description')}>
              <h3>{item.name}</h3>
              <h4>{item.artistName}</h4>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MV;
