import React, { useEffect, useState } from 'react';
import './singer.less';
import classNames from 'classnames';
import { getArtistList, ArtistList } from '@/api';
import { categoryList } from '@/config';

const Singer: React.FC = () => {
  const [data, setData] = useState<ArtistList[]>([]);

  const searchData = [
    {
      label: '语种',
      list: categoryList,
    },
    {
      label: '分类',
      list: [
        { name: '全部', type: -1 },
        { name: '男歌手', type: 1 },
        { name: '女歌手', type: 2 },
        { name: '乐队组合', type: 3 },
      ],
    },
    { label: '筛选', list: getA2Z() },
  ];

  function getA2Z() {
    const result = [{ name: '热门', initial: '' }];
    const start = 65;
    for (let i = 0; i < 26; i++) {
      const charUpper = String.fromCharCode(start + i);
      const charLower = String.fromCharCode(start + i + 20);
      result.push({ name: charUpper, initial: charLower });
    }

    return result;
  }

  useEffect(() => {
    (async () => {
      const res = await getArtistList();
      setData(res.artists);
    })();
  }, []);

  return (
    <div className="singer">
      {searchData.map((item, i) => (
        <header key={i} className="singer__header">
          <div className="singer__label">{item.label}：</div>
          <div className="singer__category">
            {item.list.map((val, i) => (
              <div key={i} className="singer__category-item">
                <span className={classNames({ ['--active']: i === 0 })}>{val.name}</span>
              </div>
            ))}
          </div>
        </header>
      ))}
      <div className="singer__list">
        {data.map(item => (
          <div key={item.id} className="singer__item">
            <img src={item.picUrl} alt="" />
            <div className="singer__description">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Singer;
