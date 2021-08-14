import React, { useState, useEffect, useMemo } from 'react';
import './mv.less';
import { RightOutlined } from '@ant-design/icons';
import Nav from '@/components/nav';
import { areaCategory } from '@/config';
import List, { ListItem } from '../../components/list';
import { getMVFirst, getMVAll, MVType, getMVExclusiveRcmd, getTopMV } from '@/api';

const MV: React.FC = () => {
  const initAreaCategory = areaCategory.map(item => ({ name: item, id: item }));
  const [mvFirst, setMVFirst] = useState<ListItem[]>([]);
  const [selected, setSelected] = useState(0);
  const [mvHot, setMVHot] = useState<ListItem[]>([]);
  const [mvExclusiveRcmd, setMVExclusiveRcmd] = useState<ListItem[]>([]);
  const [topMV, setTopMV] = useState<MVType[]>([]);
  const current = useMemo(() => initAreaCategory[selected], [selected]);

  function mv2ListAdapter(data: MVType[]) {
    return data.map(item => {
      const { artistName: description, cover: imgUrl, name: author } = item;
      return { description, imgUrl, author };
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
    <div className="mv">
      <header className="mv__header">
        <strong>
          最新MV
          <RightOutlined />
        </strong>
        <Nav data={initAreaCategory} />
      </header>
      <List data={mvFirst} />
      <header className="mv__header --margin">
        <strong>
          热播MV
          <RightOutlined />
        </strong>
      </header>
      <List data={mvHot} />
      <header className="mv__header --margin">
        <strong>
          网易出品
          <RightOutlined />
        </strong>
      </header>
      <List data={mvExclusiveRcmd} />
      <header className="mv__header --margin">
        <strong>
          MV排行榜
          <RightOutlined />
        </strong>
        <Nav data={initAreaCategory} />
      </header>
      <section className="mv__rank">
        {topMV.map((item, i) => (
          <div key={i} className="mv__rank-item">
            <div className="mv__rank-ordinal">
              <h3>{i + 1}</h3>
              <h4>-</h4>
            </div>
            <div className="mv__rank-img">
              <img src={item.cover} alt="cover" />
            </div>
            <div className="mv__rank-description">
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
