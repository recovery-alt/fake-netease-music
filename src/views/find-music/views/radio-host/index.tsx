import React, { useEffect, useState } from 'react';
import Banner from '@/components/banner';
import {
  getDJBanner,
  BannerType,
  getDJCatelist,
  DJCatelist,
  getDJPersonalizeRecommend,
  getDJPaygift,
  getDJRecommendType,
} from '@/api';
import './radio-host.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Title from '@/components/title';
import Card, { CardData } from '@/components/card';
import List, { ListParams } from '../../components/list';

const RadioHost: React.FC = () => {
  const [banner, setBanner] = useState<BannerType[]>([]);
  const [djCatelist, setDJCatelist] = useState<DJCatelist[]>([]);
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(0);
  const [djPersonalizeRecommend, setDJPersonalizeRecommend] = useState<CardData[]>([]);
  const [djPaygift, setDJPaygift] = useState<CardData[]>([]);
  const [soundingBook, setSoundingBook] = useState<CardData[]>([]);
  const [djRecommendType, setDJRecommendType] = useState<CardData[]>([]);
  const [musicRecommend, setMusicRecommend] = useState<CardData[]>([]);
  const [emotion, setEmotion] = useState<CardData[]>([]);
  const [talkshow, setTalkShow] = useState<CardData[]>([]);
  type Callback = (value: React.SetStateAction<CardData[]>) => void;

  useEffect(() => {
    getDJBanner().then(res => {
      setBanner(res.data.map(item => ({ imageUrl: item.pic })));
    });

    getDJCatelist().then(res => {
      setDJCatelist(res.categories);
      setLength(Math.ceil(res.categories.length / 8));
    });

    getDJPersonalizeRecommend().then(res => {
      const result = res.data.map(item => ({ name: item.rcmdText, imgUrl: item.picUrl }));
      setDJPersonalizeRecommend(result);
    });

    getDJPaygift().then(res => {
      const result = res.data.list.map(item => {
        const { name, picUrl: imgUrl, ...rest } = item;
        return { name, imgUrl, extra: rest };
      });

      setDJPaygift(result);
    });

    const recommendTypes: [number, Callback][] = [
      [10001, setSoundingBook],
      [2001, setDJRecommendType],
      [2, setMusicRecommend],
      [3, setEmotion],
      [8, setTalkShow],
    ];

    recommendTypes.forEach(item => loadDJRecommendType(...item));
  }, []);

  function loadDJRecommendType(type: number, cb: Callback) {
    getDJRecommendType(type).then(res => {
      const result = res.djRadios.map(item => {
        const { name, picUrl: imgUrl } = item;
        return { name, imgUrl };
      });
      cb(result.slice(0, 5));
    });
  }

  function handleCurrentChange(plus = false) {
    if (plus && length - current > 1) setCurrent(current + 1);
    if (!plus && current > 0) setCurrent(current - 1);
  }

  function renderDJPaygift({ item }: ListParams) {
    return (
      <div className="radio-host__list">
        <h2>{item.name}</h2>
        <h4>{item.extra?.rcmdText}</h4>
        <h4>{item.extra?.lastProgramName}</h4>
        {<h3>¥{Number(item.extra?.originalPrice) / 100}</h3>}
      </div>
    );
  }

  return (
    <div className="radio-host">
      <Banner data={banner} />
      <div className="radio-host__category">
        {current > 0 ? (
          <LeftOutlined
            className="radio-host__category-arrow --left"
            onClick={() => handleCurrentChange()}
          />
        ) : null}
        {length - current > 1 ? (
          <RightOutlined
            className="radio-host__category-arrow --right"
            onClick={() => handleCurrentChange(true)}
          />
        ) : null}
        <div
          className="radio-host__category-wrapper"
          style={{ transform: `translateX(${2 - current * 72}vw)` }}
        >
          {djCatelist.map(item => (
            <div key={item.id} className="radio-host__category-item">
              <div className="radio-host__category-img">
                <img src={item.pic56x56Url} alt="icon" />
              </div>
              <div className="radio-host__category-text">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <Title name="付费精品" />
      <List size={135} data={djPaygift} functionChildren={renderDJPaygift} />
      <Title name="电台个性推荐" />
      <Card data={djPersonalizeRecommend} />
      <Title name="有声书" />
      <Card data={soundingBook} />
      <Title name="创作翻唱" />
      <Card data={djRecommendType} />
      <Title name="音乐推荐" />
      <Card data={musicRecommend} />
      <Title name="情感" />
      <Card data={emotion} />
      <Title name="脱口秀" />
      <Card data={talkshow} />
    </div>
  );
};

export default RadioHost;
