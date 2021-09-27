import './play-video.less';
import React, { useEffect, useMemo, useState } from 'react';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import Img from '@/components/img';
import Button from '@/components/button';
import {
  getRelatedAllvideo,
  getVideoDetail,
  getVideoUrl,
  getCommentVideo,
  getMVUrl,
  getMVDetail,
  getMVDetailInfo,
  getCommentMV,
} from '@/api';
import { useParams } from 'react-router-dom';
import { VideoDetail, VideoMultiCreator } from '@/types';
import { classGenerator, resizeImg, wrapNumber } from '@/utils';
import dayjs from 'dayjs';
import { LikeOutlined, FolderAddOutlined, ShareAltOutlined } from '@ant-design/icons';
import WriteComment from '@/views/list/comments-list/write-comment';
import CommentGroup from '@/components/comment-group';
import Video from './video';
import { useHistory } from 'react-router-dom';

type Detail = Pick<
  VideoDetail,
  | 'title'
  | 'playTime'
  | 'videoGroup'
  | 'praisedCount'
  | 'subscribeCount'
  | 'shareCount'
  | 'commentCount'
> & { publishTime: string; avatarUrl: string; nickname: string };

const PlayVideo: React.FC = () => {
  const getClass = classGenerator('play-video');
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [detail, setDetail] = useState<Detail>();
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [relatedAllvideo, setRelatedAllvideo] = useState<VideoMultiCreator[]>([]);
  const { goBack } = useHistory();
  const isMV = useMemo(() => !Number.isNaN(Number(id)), [id]);

  async function loadVideoDetail() {
    const res = await getVideoDetail(id);
    const {
      creator,
      title,
      publishTime: publishTimestamp,
      playTime,
      videoGroup,
      praisedCount,
      subscribeCount,
      shareCount,
      commentCount,
    } = res.data;

    const publishTime = dayjs(publishTimestamp).format('YYYY-MM-DD');
    const { avatarUrl, nickname } = creator;

    setDetail({
      title,
      publishTime,
      playTime,
      videoGroup,
      praisedCount,
      subscribeCount,
      shareCount,
      commentCount,
      avatarUrl,
      nickname,
    });
  }

  async function loadMVDetail() {
    const [mvDetail, mvDetailInfo] = await Promise.all([
      getMVDetail(Number(id)),
      getMVDetailInfo(Number(id)),
    ]);
    const {
      name: title,
      publishTime,
      playCount: playTime,
      videoGroup,
      subCount: subscribeCount,
      shareCount,
      commentCount,
      artistName: nickname,
      cover: avatarUrl,
    } = mvDetail.data;

    const { likedCount: praisedCount } = mvDetailInfo;
    const detail = {
      title,
      publishTime,
      playTime,
      videoGroup,
      subscribeCount,
      shareCount,
      commentCount,
      praisedCount,
      nickname,
      avatarUrl,
    };

    setDetail(detail);
  }

  async function loadVideoUrl() {
    const res = await getVideoUrl(id);
    setVideoUrl(res.urls?.[0].url);
  }

  async function loadMVUrl() {
    const res = await getMVUrl(Number(id));
    setVideoUrl(res.data.url);
  }

  async function loadRelatedAllvideo() {
    const res = await getRelatedAllvideo(id);
    setRelatedAllvideo(res.data);
  }

  useEffect(() => {
    if (isMV) {
      loadMVDetail();
      loadMVUrl();
    } else {
      loadVideoDetail();
      loadVideoUrl();
    }

    loadRelatedAllvideo();
  }, [id]);

  return (
    <div className={getClass()}>
      <div className={getClass('detail')}>
        <div className={getClass('left')}>
          <h2 className={getClass('title')}>
            <span onClick={() => goBack()}>
              <LeftOutlined /> 视频详情
            </span>
          </h2>
          <Video src={videoUrl} />
          <div className={getClass('author-wrapper')}>
            {detail && (
              <div className={getClass('author')}>
                <Img className={getClass('avatar')} src={resizeImg(detail.avatarUrl, 50)} />

                <strong>{detail.nickname}</strong>
              </div>
            )}
            <button className={getClass('follow')}>
              <PlusOutlined /> 关注
            </button>
          </div>
          <h2 className={getClass('name')}>{detail?.title}</h2>
          <div className={getClass('publish')}>
            <span>发布: {detail?.publishTime}</span>
            <span>播放: {wrapNumber(detail?.playTime)}次</span>
          </div>
          <div className={getClass('tags')}>
            {detail?.videoGroup.map(item => (
              <div key={item.id} className={getClass('tag')}>
                {item.name}
              </div>
            ))}
          </div>
          <div className={getClass('button-group')}>
            <div>
              <Button>
                <LikeOutlined />赞{wrapNumber(detail?.praisedCount)}
              </Button>
              <Button>
                <FolderAddOutlined />
                收藏{wrapNumber(detail?.subscribeCount)}
              </Button>
              <Button>
                <ShareAltOutlined />
                分享{wrapNumber(detail?.shareCount)}
              </Button>
            </div>
            <a>举报</a>
          </div>
          <h3 className={getClass('comment')}>
            听友评论 <span>(已有{detail?.commentCount}评论)</span>
          </h3>
          <WriteComment />
          <CommentGroup id={id} api={isMV ? getCommentMV : getCommentVideo} />
        </div>
        <div className={getClass('right')}>
          <h2 className={getClass('title')}>相关推荐</h2>
          {relatedAllvideo.map(item => (
            <div key={item.vid} className={getClass('item')}>
              <Img className={getClass('item-img')} src={item.coverUrl} />
              <div className={getClass('item-description')}>
                <div className={getClass('item-title')}>{item.title}</div>
                <div className={getClass('item-author')}>
                  by {item.creator.reduce((acc, val) => `${acc}/${val.userName}`, '').slice(1)}
                </div>
              </div>
            </div>
          ))}
          {/* <div className={getClass('related')}>相关音乐</div>
          <div className={getClass('related-item')}>
            <Img className={getClass('related-img')} icon={{ size: 'medium' }} />
            <div className={getClass('related-description')}>
              <div>你的答案</div>
              <div>阿荣</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
