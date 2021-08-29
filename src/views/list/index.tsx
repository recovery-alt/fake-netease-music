import React, { useState, useEffect, useMemo } from 'react';
import './list.less';
import Button from '@/components/button';
import { FolderAddOutlined, ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import Tab from './tab';
import Table, { Column } from '@/components/table';
import { useParams } from 'react-router-dom';
import avatar from '@/assets/img/avatar.svg';
import { HeartFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import dayjs from 'dayjs';
import { wrapNumber, formatMS } from '@/utils';
import { getPlaylistDetail } from '@/api';
import { Track } from '@/types';
import { useDispatch } from 'react-redux';
import { AppDispatch, setCurrentTrack } from '@/store';

const List: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<Track[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const id = Number(params.id);
    if (Number.isNaN(id)) return;

    (async () => {
      const playlistDetail = await getPlaylistDetail(id);
      setTracks(playlistDetail.playlist.tracks);
    })();
  }, [params]);
  const columns: Column<Track>[] = [
    { title: '', key: 'ordinal' },
    { title: '', key: 'action' },
    { title: '音乐标题', key: 'name' },
    {
      title: '歌手',
      render(track) {
        return track.ar.map(item => <span key={item.id}>{item.name}</span>);
      },
    },
    { title: '专辑', key: 'al.name' },
    {
      title: '时长',
      key: 'dt',
      format: formatMS,
    },
  ];
  const profile = useSelector((state: RootState) => state.user.profile);
  const playList = useSelector((state: RootState) => state.userPlaylist.playlist);

  const curPlaylist = useMemo(
    () => playList.find(item => item.id === Number(params.id)),
    [playList, params]
  );

  const handleTableDoubleClick = (current: number) => {
    dispatch(setCurrentTrack({ current, tracks, fm: [] }));
  };

  return (
    <div className="list">
      <header className="list__header">
        {params.id ? (
          <img className="list__img" src={curPlaylist?.coverImgUrl} alt="avatar" />
        ) : (
          <div className="list__img-default">
            <HeartFilled />
          </div>
        )}

        <div className="list__right">
          <div className="list__title">
            <span>歌单</span>
            <strong>{curPlaylist?.name || '我喜欢的音乐'}</strong>
          </div>
          <div className="list__user-info">
            <img src={profile.avatarUrl || avatar} alt="avatar" />
            <a>{profile.nickname}</a>
            <span>{dayjs(curPlaylist?.createTime).format('YYYY-MM-DD')}创建</span>
          </div>
          <div className="list__control">
            <Button />
            <button className="">
              <FolderAddOutlined />
              收藏({wrapNumber(curPlaylist?.subscribedCount)})
            </button>
            <button className="">
              <ShareAltOutlined />
              分享(0)
            </button>
            <button className="">
              <DownloadOutlined />
              下载全部
            </button>
          </div>
          <div className="list__description">
            <div className="list__tag">
              <span className="--title">标签: </span>
              <span>{curPlaylist?.tags.join('/')}</span>
            </div>
            <div className="list__count">
              <span>
                <span className="--title">歌曲数: </span>
                {wrapNumber(curPlaylist?.trackCount)}
              </span>
              <span className="--left">
                <span className="--title">播放数: </span>
                {wrapNumber(curPlaylist?.playCount)}
              </span>
            </div>
            <div className="list__introduction">
              <span className="--title">简介: </span>
              <div>{curPlaylist?.description}</div>
            </div>
          </div>
        </div>
      </header>
      <Tab />
      <Table columns={columns} data={tracks} doubleClick={handleTableDoubleClick} />
    </div>
  );
};

export default List;
