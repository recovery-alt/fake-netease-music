import './radio-host.less';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { FC, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  getDJBanner,
  getDJCatelist,
  getDJPaygift,
  getDJPersonalizeRecommend,
  getDJRecommendType,
} from '@/api';
import Banner from '@/components/banner';
import Card, { CardData } from '@/components/card';
import Img from '@/components/img';
import Title from '@/components/title';
import { DynamicPage, Page } from '@/router';
import { AppDispatch, insertSong } from '@/store';
import { BannerType, DJCatelist } from '@/types';
import { classGenerator } from '@/utils';

import List, { ListParams } from '../../list';

const RadioHost: FC = () => {
  const getClass = classGenerator('radio-host');
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
  type Callback = (value: SetStateAction<CardData[]>) => void;
  const dispatch = useDispatch<AppDispatch>();
  const { push } = useHistory();

  function loadDJRecommendType(type: number, cb: Callback) {
    getDJRecommendType(type).then(res => {
      const result = res.djRadios.map(item => {
        const { id, name, picUrl: imgUrl } = item;
        return { id, name, imgUrl };
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
      <div className={getClass('list')}>
        <h2>{item.name}</h2>
        <h4>{item.extra?.rcmdText}</h4>
        <h4>{item.extra?.lastProgramName}</h4>
        {<h3>¥{Number(item.extra?.originalPrice) / 100}</h3>}
      </div>
    );
  }

  function handleBannerClick(id: number) {
    dispatch(insertSong(id));
  }

  function pushRadioList(id: number) {
    push(DynamicPage.radioList(id));
  }

  function handlePayItemClick(id: number) {
    push(DynamicPage.radioList(id, 'pay'));
  }

  function toRadioZonePageByName(name: string) {
    const id = djCatelist.find(item => item.name === name)?.id;
    push(DynamicPage.radioZone(id));
  }

  async function loadDJBanner() {
    const res = await getDJBanner();
    setBanner(res.data.map(item => ({ targetId: item.targetId, imageUrl: item.pic })));
  }

  async function loadDJCatelist() {
    const res = await getDJCatelist();
    setDJCatelist(res.categories);
    setLength(Math.ceil(res.categories.length / 8));
  }

  async function loadDJPersonalizeRecommend() {
    const res = await getDJPersonalizeRecommend();
    const result = res.data.map(item => ({
      id: item.id,
      name: item.rcmdText,
      imgUrl: item.picUrl,
    }));
    setDJPersonalizeRecommend(result);
  }

  async function loadDJPaygift() {
    const res = await getDJPaygift();
    const result = res.data.list.map(item => {
      const { id, name, picUrl: imgUrl, ...rest } = item;
      return { id, name, imgUrl, extra: rest };
    });

    setDJPaygift(result);
  }

  useEffect(() => {
    loadDJBanner();
    loadDJCatelist();
    loadDJPersonalizeRecommend();
    loadDJPaygift();

    const recommendTypes: [number, Callback][] = [
      [10001, setSoundingBook],
      [2001, setDJRecommendType],
      [2, setMusicRecommend],
      [3, setEmotion],
      [8, setTalkShow],
    ];

    recommendTypes.forEach(item => loadDJRecommendType(...item));
  }, []);

  return (
    <div className={getClass()}>
      <Banner data={banner} onBannerClick={handleBannerClick} />
      <div className={getClass('category')}>
        {current > 0 ? (
          <LeftOutlined
            className={getClass('category-arrow --left')}
            onClick={() => handleCurrentChange()}
          />
        ) : null}
        {length - current > 1 ? (
          <RightOutlined
            className={getClass('category-arrow --right')}
            onClick={() => handleCurrentChange(true)}
          />
        ) : null}
        <div
          className={getClass('category-wrapper')}
          style={{ transform: `translateX(${2 - current * 72}vw)` }}
        >
          {djCatelist.map(item => (
            <div
              key={item.id}
              className={getClass('category-item')}
              onClick={() => push(DynamicPage.radioZone(item.id))}
            >
              <div className={getClass('category-img-wrapper')}>
                <Img className={getClass('category-img')} src={item.pic56x56Url} />
              </div>
              <div className={getClass('category-text')}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <Title name="付费精品" onClick={() => push(Page.findMusicRadioHostPay)} />
      <List
        size="large"
        data={djPaygift}
        functionChildren={renderDJPaygift}
        onItemClick={handlePayItemClick}
      />
      <Title name="电台个性推荐" />
      <Card data={djPersonalizeRecommend} onItemClick={pushRadioList} />
      <Title name="有声书" onClick={() => toRadioZonePageByName('有声书')} />
      <Card data={soundingBook} onItemClick={pushRadioList} />
      <Title name="创作翻唱" onClick={() => toRadioZonePageByName('创作翻唱')} />
      <Card data={djRecommendType} onItemClick={pushRadioList} />
      <Title name="音乐推荐" onClick={() => toRadioZonePageByName('音乐推荐')} />
      <Card data={musicRecommend} onItemClick={pushRadioList} />
      <Title name="情感" onClick={() => toRadioZonePageByName('情感')} />
      <Card data={emotion} onItemClick={pushRadioList} />
      <Title name="脱口秀" onClick={() => toRadioZonePageByName('脱口秀')} />
      <Card data={talkshow} onItemClick={pushRadioList} />
    </div>
  );
};

export default RadioHost;
