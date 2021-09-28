import React, { useState, useEffect, useMemo } from 'react';
import './list.less';
import Button from '@/components/button';
import { FolderAddOutlined, ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import Table from '@/components/table';
import { useHistory, useParams } from 'react-router-dom';
import avatar from '@/assets/img/avatar.svg';
import { HeartFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import dayjs from 'dayjs';
import { wrapNumber, resizeImg, classGenerator } from '@/utils';
import { getAlbum, getPlaylistDetail, getAlbumDetailDynamic } from '@/api';
import { UserPlaylist, Track } from '@/types';
import { useDispatch } from 'react-redux';
import { AppDispatch, setCurrentTrack } from '@/store';
import { Tabs } from 'antd';
import Collector from './collector';
import CommentsList from './comments-list';
import AlbumDetail from './album-detail';
import Img from '@/components/img';
import classNames from 'classnames';
import { CommonColumns } from '@/config';
import { DynamicPage } from '@/router';

type CurrentInfo = Partial<UserPlaylist & { artistName: string }>;

const List: React.FC = () => {
  const getClass = classGenerator('list');
  const params = useParams<{ id?: string; type?: 'album' }>();
  const [tracks, setTracks] = useState<Track[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [albumDescrition, setAlbumDescrition] = useState('');
  const [current, setCurrent] = useState<CurrentInfo>();
  const id = useMemo(() => Number(params.id), [params.id]);
  const { push } = useHistory();
  // 判断是否为专辑
  const isAlbum = useMemo(() => !!params.type, [params.type]);

  const profile = useSelector((state: RootState) => state.user.profile);

  function handlePlayTrack(current = 0) {
    dispatch(setCurrentTrack({ current, tracks, fm: [] }));
  }

  function toUserPage(id: number) {
    push(DynamicPage.user(id));
  }

  async function loadAlbum() {
    const [album, albumDynamic] = await Promise.all([getAlbum(id), getAlbumDetailDynamic(id)]);

    const tracksWithPrivilege = album.songs.map(item => {
      item.disable = item?.privilege?.cp ? !item.privilege.cp : false;
      return item;
    });
    setTracks(tracksWithPrivilege);
    const { picUrl: coverImgUrl, name, artist, publishTime: createTime, description } = album.album;
    const { subCount: subscribedCount, shareCount, commentCount } = albumDynamic;
    const current: CurrentInfo = {
      coverImgUrl,
      name,
      subscribedCount,
      shareCount,
      commentCount,
      createTime,
      artistName: artist.name,
    };

    setCurrent(current);
    setAlbumDescrition(description);
  }

  async function loadPlaylist() {
    const playlistDetail = await getPlaylistDetail(id);
    const tracksWithPrivilege = playlistDetail.playlist.tracks.map((track, i) => {
      track.disable = !playlistDetail.privileges[i].cp;
      return track;
    });
    setTracks(tracksWithPrivilege);
    setCurrent(playlistDetail.playlist);
  }

  function renderPlaylistDescription() {
    return (
      <div className={getClass('description')}>
        <div className={getClass('tag')}>
          <span className="--title">标签: </span>
          <span>{current?.tags?.join('/')}</span>
        </div>
        <div className={getClass('count')}>
          <span>
            <span className="--title">歌曲数: </span>
            {wrapNumber(current?.trackCount)}
          </span>
          <span className="--left">
            <span className="--title">播放数: </span>
            {wrapNumber(current?.playCount)}
          </span>
        </div>
        <div className={getClass('introduction')}>
          <span className="--title">简介: </span>
          <div>{current?.description}</div>
        </div>
      </div>
    );
  }

  function renderAlbumDescrition() {
    return (
      <div className={getClass('description')}>
        <div className={getClass('singer')}>
          <span className="--title">歌手: </span>
          <span onClick={() => push(DynamicPage.singer(current?.id))}>{current?.artistName}</span>
        </div>
        <div className={getClass('publish-time')}>
          <span className="--title">时间: </span>
          <span>{dayjs(current?.createTime).format('YYYY-MM-DD')}</span>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (Number.isNaN(id)) return;
    isAlbum ? loadAlbum() : loadPlaylist();
  }, [id, isAlbum]);

  return (
    <div className={getClass()}>
      <header className={getClass('header')}>
        {id && current?.coverImgUrl ? (
          <Img
            className={classNames('list__img', { '--album': isAlbum })}
            src={resizeImg(current.coverImgUrl, 300)}
            alt="avatar"
          />
        ) : (
          <div className={getClass('img-default')}>
            <HeartFilled />
          </div>
        )}

        <div className={getClass('right')}>
          <div className={getClass('title')}>
            <span>{isAlbum ? '专辑' : '歌单'}</span>
            <strong>{current?.name || '我喜欢的音乐'}</strong>
          </div>
          {!isAlbum && (
            <div className={getClass('user-info')}>
              <img
                src={resizeImg(profile.avatarUrl || avatar, 100)}
                alt="avatar"
                onClick={() => toUserPage(profile.userId)}
              />
              <a onClick={() => toUserPage(profile.userId)}>{profile.nickname}</a>
              <span>{dayjs(current?.createTime).format('YYYY-MM-DD')}创建</span>
            </div>
          )}
          <div className={getClass('control')}>
            <Button compose onClick={() => handlePlayTrack()} />
            <Button>
              <FolderAddOutlined />
              收藏({wrapNumber(current?.subscribedCount)})
            </Button>
            <Button>
              <ShareAltOutlined />
              分享({wrapNumber(current?.shareCount || 0)})
            </Button>
            <Button>
              <DownloadOutlined />
              下载全部
            </Button>
          </div>
          {isAlbum ? renderAlbumDescrition() : renderPlaylistDescription()}
        </div>
      </header>
      <section className={getClass('tabs')}>
        <Tabs>
          <Tabs.TabPane tab="歌曲列表" key="1">
            <Table columns={CommonColumns} data={tracks} onDoubleClick={handlePlayTrack} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={`评论(${current?.commentCount || 0})`} key="2">
            <CommentsList id={id} isAlbum={isAlbum} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={isAlbum ? '专辑详情' : '收藏者'} key="3">
            {isAlbum ? <AlbumDetail description={albumDescrition} /> : <Collector id={id} />}
          </Tabs.TabPane>
        </Tabs>
      </section>
    </div>
  );
};

export default List;
