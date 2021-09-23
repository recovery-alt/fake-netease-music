import './play-video.less';
import React, { useEffect, useState } from 'react';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import Img from '@/components/img';
import Button from '@/components/button';
import { getRelatedAllvideo, getVideoDetail, getVideoUrl, getCommentVideo } from '@/api';
import { useParams } from 'react-router-dom';
import { VideoDetail, VideoUrl, VideoMultiCreator } from '@/types';
import { classGenerator, resizeImg, wrapNumber } from '@/utils';
import dayjs from 'dayjs';
import { LikeOutlined, FolderAddOutlined, ShareAltOutlined } from '@ant-design/icons';
import WriteComment from '@/views/list/comments-list/write-comment';
import CommentGroup from '@/components/comment-group';
import Video from './video';
import { useHistory } from 'react-router-dom';

const PlayVideo: React.FC = () => {
  const getClass = classGenerator('play-video');
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [videoDetail, setVideoDetail] = useState<VideoDetail>();
  const [videoUrl, setVideoUrl] = useState<VideoUrl>();
  const [relatedAllvideo, setRelatedAllvideo] = useState<VideoMultiCreator[]>([]);
  const { goBack } = useHistory();

  async function loadVideoDetail() {
    const res = await getVideoDetail(id);
    setVideoDetail(res.data);
  }

  async function loadVideoUrl() {
    const res = await getVideoUrl(id);
    setVideoUrl(res);
  }

  async function loadRelatedAllvideo() {
    const res = await getRelatedAllvideo(id);
    setRelatedAllvideo(res.data);
  }

  useEffect(() => {
    loadVideoDetail();
    loadVideoUrl();
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
          <Video src={videoUrl?.urls[0].url} />
          <div className={getClass('author-wrapper')}>
            {videoDetail && (
              <div className={getClass('author')}>
                <Img
                  className={getClass('avatar')}
                  src={resizeImg(videoDetail.creator.avatarUrl, 50)}
                />

                <strong>{videoDetail.creator.nickname}</strong>
              </div>
            )}
            <button className={getClass('follow')}>
              <PlusOutlined /> 关注
            </button>
          </div>
          <h2 className={getClass('name')}>{videoDetail?.title}</h2>
          <div className={getClass('publish')}>
            <span>发布: {dayjs(videoDetail?.publishTime).format('YYYY-MM-DD')}</span>
            <span>播放: {wrapNumber(videoDetail?.playTime)}次</span>
          </div>
          <div className={getClass('tags')}>
            {videoDetail?.videoGroup.map(item => (
              <div key={item.id} className={getClass('tag')}>
                {item.name}
              </div>
            ))}
          </div>
          <div className={getClass('button-group')}>
            <div>
              <Button>
                <LikeOutlined />赞{wrapNumber(videoDetail?.praisedCount)}
              </Button>
              <Button>
                <FolderAddOutlined />
                收藏{wrapNumber(videoDetail?.subscribeCount)}
              </Button>
              <Button>
                <ShareAltOutlined />
                分享{wrapNumber(videoDetail?.shareCount)}
              </Button>
            </div>
            <a>举报</a>
          </div>
          <h3 className={getClass('comment')}>
            听友评论 <span>(已有{videoDetail?.commentCount}评论)</span>
          </h3>
          <WriteComment />
          <CommentGroup id={videoDetail?.vid} api={getCommentVideo} />
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
