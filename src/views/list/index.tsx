import React, { useState, useEffect, useMemo } from 'react';
import './list.less';
import Button from '@/components/button';
import { FolderAddOutlined, ShareAltOutlined, DownloadOutlined } from '@ant-design/icons';
import Table, { Column } from '@/components/table';
import { useParams } from 'react-router-dom';
import avatar from '@/assets/img/avatar.svg';
import { HeartFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import dayjs from 'dayjs';
import { wrapNumber, formatMS, resizeImg } from '@/utils';
import { getPlaylistDetail } from '@/api';
import { Track } from '@/types';
import { useDispatch } from 'react-redux';
import { AppDispatch, setCurrentTrack } from '@/store';
import { Tabs } from 'antd';
import Collector from './collector';
import CommentsList from './comments-list';

const List: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<Track[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [commentCount, setCommentCount] = useState(0);
  const id = useMemo(() => Number(params.id), [params.id]);
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

  const curPlaylist = useMemo(() => playList.find(item => item.id === id), [playList, params]);

  useEffect(() => {
    (async () => {
      const playlistDetail = await getPlaylistDetail(id);
      setCommentCount(playlistDetail.playlist.commentCount);
      setTracks(playlistDetail.playlist.tracks);
    })();
  }, [params.id]);

  const handleTableDoubleClick = (current: number) => {
    dispatch(setCurrentTrack({ current, tracks, fm: [] }));
  };

  return (
    <div className="list">
      <header className="list__header">
        {id && curPlaylist?.coverImgUrl ? (
          <img className="list__img" src={resizeImg(curPlaylist.coverImgUrl, 300)} alt="avatar" />
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
            <img src={resizeImg(profile.avatarUrl || avatar, 100)} alt="avatar" />
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
      <section className="list__tabs">
        <Tabs>
          <Tabs.TabPane tab="歌曲列表" key="1">
            <Table columns={columns} data={tracks} doubleClick={handleTableDoubleClick} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={`评论(${commentCount})`} key="2">
            <CommentsList id={id} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="收藏者" key="3">
            <Collector id={id} />
          </Tabs.TabPane>
        </Tabs>
      </section>
    </div>
  );
};

export default List;
