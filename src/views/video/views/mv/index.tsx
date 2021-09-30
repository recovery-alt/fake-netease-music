import React, { useState, useEffect } from 'react';
import './mv.less';
import { RightOutlined } from '@ant-design/icons';
import Nav from '../../nav';
import { areaCategory } from '@/config';
import List, { ListItem } from '../../list';
import { getMVFirst, getMVAll, getMVExclusiveRcmd, getTopMV } from '@/api';
import { MV as MVType } from '@/types';
import Img from '@/components/img';
import { classGenerator } from '@/utils';
import { useHistory } from 'react-router-dom';
import { DynamicPage } from '@/router';

const MV: React.FC = () => {
  const getClass = classGenerator('mv');
  const initAreaCategory = areaCategory.map(item => ({ name: item, id: item }));
  const [mvFirst, setMVFirst] = useState<ListItem[]>([]);
  const [mvHot, setMVHot] = useState<ListItem[]>([]);
  const [mvExclusiveRcmd, setMVExclusiveRcmd] = useState<ListItem[]>([]);
  const [topMV, setTopMV] = useState<MVType[]>([]);
  const [mvFirstId, setMVFirstId] = useState<number | string>(initAreaCategory[0].id);
  const [topMVId, setRankMVId] = useState<number | string>(initAreaCategory[0].id);
  const { push } = useHistory();

  function mv2ListAdapter(data: MVType[]) {
    return data.map(item => {
      const { id, artistName: description, cover: imgUrl, name: author } = item;
      return { id, description, imgUrl, author };
    });
  }

  async function loadMVFirst() {
    const res = await getMVFirst(mvFirstId);
    setMVFirst(mv2ListAdapter(res.data));
  }

  async function loadMVHot() {
    const res = await getMVAll();
    setMVHot(mv2ListAdapter(res.data));
  }

  async function loadMVExclusiveRcmd() {
    const res = await getMVExclusiveRcmd();
    setMVExclusiveRcmd(mv2ListAdapter(res.data));
  }

  async function loadTopMV() {
    const res = await getTopMV(topMVId);
    setTopMV(res.data);
  }

  function handleNewestMVNavClick(id: string | number) {
    setMVFirstId(id);
  }

  function handleTopMVNavClick(id: string | number) {
    setRankMVId(id);
  }

  function toPlayVideoPage(id: number | string) {
    push(DynamicPage.playVideo(id));
  }

  useEffect(() => {
    loadMVHot();
    loadMVExclusiveRcmd();
  }, []);

  useEffect(() => {
    loadMVFirst();
  }, [mvFirstId]);

  useEffect(() => {
    loadTopMV();
  }, [topMVId]);

  return (
    <div className={getClass()}>
      <header className={getClass('header')}>
        <strong>
          最新MV
          <RightOutlined />
        </strong>
        <Nav data={initAreaCategory} id={mvFirstId} onNavClick={handleNewestMVNavClick} />
      </header>
      <List data={mvFirst} onItemClick={toPlayVideoPage} />
      <header className={getClass('header --margin')}>
        <strong>
          热播MV
          <RightOutlined />
        </strong>
      </header>
      <List data={mvHot} onItemClick={toPlayVideoPage} />
      <header className={getClass('header --margin')}>
        <strong>
          网易出品
          <RightOutlined />
        </strong>
      </header>
      <List data={mvExclusiveRcmd} onItemClick={toPlayVideoPage} />
      <header className={getClass('header --margin')}>
        <strong>
          MV排行榜
          <RightOutlined />
        </strong>
        <Nav data={initAreaCategory} id={topMVId} onNavClick={handleTopMVNavClick} />
      </header>
      <section className={getClass('rank')}>
        {topMV.map((item, i) => (
          <div key={item.id} className={getClass('rank-item')}>
            <div className={getClass('rank-ordinal')}>
              <h3>{i + 1}</h3>
              <h4>-</h4>
            </div>
            <div className={getClass('rank-img-wrapper')}>
              <Img
                className={getClass('rank-img')}
                src={item.cover}
                icon={{ size: 'medium', hoverDisplay: true }}
                onClick={() => push(DynamicPage.playVideo(item.id))}
              />
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
