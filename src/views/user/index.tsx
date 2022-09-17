import './user.less';

import {
  AudioOutlined,
  EllipsisOutlined,
  MailOutlined,
  ManOutlined,
  PlusOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { getUserAudio, getUserDetail, getUserPlaylist } from '@/api';
import Button from '@/components/button';
import Img from '@/components/img';
import { DynamicPage } from '@/router';
import { RootState } from '@/store';
import { UserDetail, UserPlaylist } from '@/types';
import { classGenerator, resizeImg, toHttps } from '@/utils';
import List, { ListItem } from '@/views/search-result/list';

import ButtonGroup from './button-group';
import MusicPresent, { DataType, PageMode } from './music-present';

const User: FC = () => {
  const getClass = classGenerator('user');
  const params = useParams<{ id: string }>();
  const { push } = useHistory();
  const userId = useSelector((state: RootState) => state.user.profile.userId);
  const id = useMemo(() => Number(params.id), [params.id]);
  const { state: myself } = useLocation<boolean | undefined>();
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const [radios, setRadios] = useState<ListItem[]>([]);
  const [playlist, setPlaylist] = useState<UserPlaylist[]>([]);
  const transPlaylist = useMemo<DataType[]>(
    () => dataTypeAdapter(playlist.filter(item => item.userId === userId)),
    [playlist]
  );
  const transCollectPlaylist = useMemo<DataType[]>(
    () => dataTypeAdapter(playlist.filter(item => item.userId !== userId)),
    [playlist]
  );

  function dataTypeAdapter(playlist: UserPlaylist[]) {
    return playlist.map(item => {
      const {
        id,
        name,
        coverImgUrl: picUrl,
        trackCount: size,
        copywriter: description,
        createTime: publishTime,
        tracks,
      } = item;
      const songs = tracks || [];
      return { id, name, picUrl, size, description, publishTime, songs };
    });
  }

  async function loadUserDetail() {
    const res = await getUserDetail(id);
    setUserDetail(res);
  }

  async function loadRadio() {
    const res = await getUserAudio(id);
    const radios = res.djRadios.map(radio => {
      const { id, name, programCount, subCount, picUrl: imgUrl } = radio;
      const col2 = `节目${programCount}`;
      const col3 = `订阅${subCount}`;
      return { id, imgUrl, name, col2, col3 };
    });
    setRadios(radios);
  }

  async function loadUserPlaylist() {
    const res = await getUserPlaylist(id);
    setPlaylist(res.playlist);
  }

  function renderRadio() {
    if (radios.length > 0)
      return (
        <>
          <h2 className={getClass('tag')}>
            <div>
              Ta创建的电台<strong>（{radios.length}）</strong>
            </div>
          </h2>
          <div className={getClass('radio')}>
            <List data={radios} />
          </div>
        </>
      );
  }

  const PlaylistItem: FC<{ title: string; playlist: DataType[] }> = ({ title, playlist }) => {
    const [activeButton, setActiveButton] = useState<PageMode>('overview');

    return playlist.length > 0 ? (
      <>
        <h2 className={getClass('tag')}>
          <div>
            {title}
            <strong>（{playlist.length}）</strong>
          </div>
          <ButtonGroup activeButton={activeButton} setActiveButton={setActiveButton} />
        </h2>
        <div className={getClass('playlist')}>
          <MusicPresent type={activeButton} id={id} data={playlist} myself={myself} />
        </div>
      </>
    ) : null;
  };

  useEffect(() => {
    if (Number.isNaN(id)) return;
    loadUserDetail();
    loadRadio();
    loadUserPlaylist();
  }, []);

  return (
    <div>
      <header className={getClass('header')}>
        <Img
          src={userDetail && resizeImg(userDetail.profile.avatarUrl, 200)}
          className={getClass('cover')}
        />
        <div className={getClass('introduction')}>
          <h2>{userDetail?.profile.nickname}</h2>
          <div className={getClass('title')}>
            <div className={getClass('title-left')}>
              {userDetail?.identify && (
                <div className={getClass('title-auth')}>
                  <img src={toHttps(userDetail.identify.imageUrl)} />
                  <strong>{userDetail.identify.imageDesc}</strong>
                </div>
              )}
              <mark>Lv{userDetail?.level}</mark>
              {userDetail?.profile.gender ? <ManOutlined /> : <WomanOutlined />}
            </div>
            {userDetail?.identify && (
              <div className={getClass('title-right')}>
                <Button onClick={() => push(DynamicPage.singer(userDetail.profile.artistId))}>
                  <AudioOutlined />
                  歌手页
                </Button>
                <Button>
                  <MailOutlined />
                  发私信
                </Button>
                <Button>
                  <PlusOutlined />
                  关注
                </Button>
                <Button className="--circle">
                  <EllipsisOutlined />
                </Button>
              </div>
            )}
          </div>
          <div className={getClass('statistic')}>
            <div className={getClass('statistic-item')}>
              <h3>{userDetail?.profile.eventCount}</h3>
              <div>动态</div>
            </div>
            <div className={getClass('statistic-item')}>
              <h3>{userDetail?.profile.follows}</h3>
              <div>关注</div>
            </div>
            <div className={getClass('statistic-item')}>
              <h3>{userDetail?.profile.followeds}</h3>
              <div>粉丝</div>
            </div>
          </div>
          <div className={getClass('social')}>
            <div>
              社交网络: <span>未绑定</span>
            </div>
            <div>
              个人介绍: <span>{userDetail?.profile.signature || '暂无介绍'}</span>
            </div>
          </div>
        </div>
      </header>
      {renderRadio()}
      <PlaylistItem title="歌单" playlist={transPlaylist} />
      <PlaylistItem title="收藏的歌单" playlist={transCollectPlaylist} />
    </div>
  );
};

export default User;
