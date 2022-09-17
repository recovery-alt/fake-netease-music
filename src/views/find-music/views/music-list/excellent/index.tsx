// 在Popover之后引入，覆盖样式
import './excellent.less';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { FC, useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getPlaylistHighqualityTags, getTopPlaylistHighquality } from '@/api';
import Img from '@/components/img';
import InfinityScroll, { SetMore } from '@/components/infinity-scroll';
import { DynamicPage } from '@/router';
import { AppDispatch, fetchAndSetCurrentTrack } from '@/store';
import { DataAction, PlaylistHighqualityTags, UserPlaylist } from '@/types';
import { classGenerator, resizeImg } from '@/utils';
import Popover from '@/views/video/popover';

import { usePopover } from './hooks';

const Excellent: FC = () => {
  const getClass = classGenerator('excellent');
  const [tags, setTags] = useState<PlaylistHighqualityTags[]>([]);
  const cat = useParams<{ id: string }>().id;
  const [playlists, playlistsDispatch] = useReducer(playlistsReducer, []);
  const setMore = useRef<SetMore>(null);
  const { push } = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const before = useRef<number>();
  const limit = 10;
  const { buttonContext, renderPopover } = usePopover(tags, cat);

  async function loadPlaylistHighqualityTags() {
    const res = await getPlaylistHighqualityTags();
    setTags(res.tags);
  }

  async function loadTopPlaylistHighquality() {
    const res = await getTopPlaylistHighquality(cat, limit, before.current);
    const type = before.current === undefined ? 'reset' : 'add';
    playlistsDispatch({ type, payload: res.playlists });
    before.current = res.lasttime;
    if (!res.lasttime) setMore.current?.(false);
  }

  function playlistsReducer(state: UserPlaylist[], action: DataAction<UserPlaylist>) {
    const { type, payload } = action;
    return type === 'add' ? [...state, ...payload] : payload;
  }

  useEffect(() => {
    loadPlaylistHighqualityTags();
  }, []);

  return (
    <div className={getClass()}>
      <header className={getClass('control')}>
        <div className={getClass('control-title')}>
          精品歌单 <QuestionCircleOutlined />
        </div>
        <Popover
          className={getClass('control-pick')}
          placement="right"
          context={buttonContext}
          functionChildren={renderPopover}
        />
      </header>
      <div className={getClass('card')}>
        {playlists.map(item => (
          <div key={item.id} className={getClass('item')}>
            <Img
              className={getClass('img')}
              icon={{ hoverDisplay: true, placement: 'bottom' }}
              src={resizeImg(item.coverImgUrl, 150)}
              onClick={() => push(DynamicPage.list(item.id))}
              onIconClick={() => dispatch(fetchAndSetCurrentTrack(item.id))}
            />
            <div className={getClass('right')}>
              <h3>{item.name}</h3>
              <small>by {item.creator.nickname}</small>
              <div className={getClass('description')}>
                <span>{item.tags.join(',')}</span> {item.copywriter}
              </div>
            </div>
          </div>
        ))}
      </div>
      <InfinityScroll ref={setMore} cb={loadTopPlaylistHighquality} />
    </div>
  );
};

export default Excellent;
