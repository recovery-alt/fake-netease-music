import { useEffect, useReducer, useRef, useState, FC } from 'react';
import { classGenerator, resizeImg } from '@/utils';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Img from '@/components/img';
import { getPlaylistHighqualityTags, getTopPlaylistHighquality } from '@/api';
import { DataAction, PlaylistHighqualityTags, UserPlaylist } from '@/types';
import Popover from '@/views/video/popover';
// 在Popover之后引入，覆盖样式
import './excellent.less';
import { usePopover } from './hooks';
import { useParams, useHistory } from 'react-router-dom';
import { DynamicPage } from '@/router';
import { useDispatch } from 'react-redux';
import { fetchAndSetCurrentTrack } from '@/store';
import InfinityScroll, { SetMore } from '@/components/infinity-scroll';
import { clearRequests } from '@/api/api';

const Excellent: FC = () => {
  const getClass = classGenerator('excellent');
  const [tags, setTags] = useState<PlaylistHighqualityTags[]>([]);
  const cat = useParams<{ id: string }>().id;
  const [playlists, playlistsDispatch] = useReducer(playlistsReducer, []);
  const setMore = useRef<SetMore>(null);
  const { push } = useHistory();
  const dispatch = useDispatch();
  const before = useRef<number>();
  const limit = 10;
  const { buttonContext, renderPopover } = usePopover(tags, cat);
  const firstUpdate = useRef(true);

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

  useEffect(() => {
    if (firstUpdate.current) firstUpdate.current = false;
    else loadTopPlaylistHighquality();
    return clearRequests;
  }, [cat]);

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
