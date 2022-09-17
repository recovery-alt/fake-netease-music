import { RightOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { getVideoGroup, getVideoGroupList, getVideoTimelineAll } from '@/api';
import { clearRequests } from '@/api/api';
import { VideoCategogy } from '@/types';

import { ListItem } from './list';

export function usePopover(id?: string | number) {
  const [videoGroupList, setVideoGroupList] = useState<VideoCategogy[]>([]);
  const name = useMemo(() => {
    const finder = videoGroupList.find(item => item.id === id);
    return finder ? finder.name : '全部视频';
  }, [id]);

  const buttonContext = (
    <>
      {name} <RightOutlined />
    </>
  );
  async function loadVideoGroupList() {
    const res = await getVideoGroupList();
    setVideoGroupList(res.data);
  }

  useEffect(() => {
    loadVideoGroupList();
  }, []);

  return { videoGroupList, buttonContext };
}

export function useMore(categoryId: number | string) {
  type Action = { type?: 'add' | 'reset'; payload: ListItem[] };
  const [videoList, videoListDispatch] = useReducer(videoListReducer, []);
  const [moreText, setMoreText] = useState('');
  const [hasmore, setHasMore] = useState(true);
  const footerRef = useRef<HTMLElement>(null);
  let offset = 0;
  const limit = 8;

  async function loadVideoList(offset = 0) {
    const res = categoryId
      ? await getVideoGroup(categoryId, offset)
      : await getVideoTimelineAll(offset);

    setHasMore(res.hasmore);

    const result = res.datas
      .filter(item => item.data.creator)
      .map(item => {
        const { vid, coverUrl: imgUrl, title: description, creator } = item.data;
        const { nickname: author } = creator;
        return { id: vid, imgUrl, description, author };
      });
    const action: Action = offset === 0 ? { payload: result } : { type: 'add', payload: result };
    videoListDispatch(action);
  }

  function videoListReducer(state: ListItem[], { type = 'reset', payload }: Action) {
    return type === 'add' ? [...state, ...payload] : payload;
  }

  useEffect(() => {
    loadVideoList();

    return clearRequests;
  }, [categoryId]);

  useEffect(() => {
    if (!footerRef.current) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return;
      if (hasmore) {
        setMoreText('加载中...');
        offset += limit;
        loadVideoList(offset);
      } else {
        setMoreText('没有更多了~');
      }
    });

    io.observe(footerRef.current);

    return () => {
      if (footerRef.current) io.unobserve(footerRef.current);
      io.disconnect();
    };
  }, []);

  return { moreText, videoList, footerRef };
}
