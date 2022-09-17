import './singer.less';

import { FileAddOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { FC, lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { getArtistAlbum, getArtistDetail } from '@/api';
import { clearRequests } from '@/api/api';
import Button from '@/components/button';
import Img from '@/components/img';
import { DynamicPage } from '@/router';
import { Album as AlbumType, Artist, UserProfile } from '@/types';
import { classGenerator, resizeImg } from '@/utils';
import ButtonGroup from '@/views/user/button-group';
import { PageMode } from '@/views/user/music-present';

const Album = lazy(() => import('@/views/user/music-present'));
const MV = lazy(() => import('./mv'));
const Detail = lazy(() => import('./detail'));
const Similar = lazy(() => import('./similar'));

const Singer: FC = () => {
  const getClass = classGenerator('singer');
  const params = useParams<{ id: string }>();
  const id = useMemo(() => Number(params.id), [params.id]);
  const location = useLocation<string[]>();
  const alias = location.state;
  const [activeKey, setActiveKey] = useState('album');
  const [artistDetail, setArtistDetail] = useState<Artist>();
  const [user, setUser] = useState<UserProfile>();
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [activeButton, setActiveButton] = useState<PageMode>('overview');
  const { push } = useHistory();

  const extraContent =
    activeKey === 'album'
      ? { right: <ButtonGroup {...{ activeButton, setActiveButton }} /> }
      : undefined;

  async function loadArtistDetail() {
    const artistDetail = await getArtistDetail(id);
    artistDetail.data.artist.alias = alias;
    setArtistDetail(artistDetail.data.artist);
    setUser(artistDetail.data.user);
  }

  async function loadArtistAlbum() {
    const albums = await getArtistAlbum(id);
    setAlbums(albums.hotAlbums);
  }

  useEffect(() => {
    if (Number.isNaN(id)) return;
    loadArtistDetail();
    loadArtistAlbum();

    return clearRequests;
  }, [id]);

  return (
    <div className={getClass()}>
      <header className={getClass('header')}>
        <Img
          src={artistDetail?.cover && resizeImg(artistDetail.cover)}
          className={getClass('img')}
        />
        <section className={getClass('right')}>
          <h2>{artistDetail?.name}</h2>
          <h3>{artistDetail?.alias?.join(' ')}</h3>
          <div>
            <Button className={getClass('button')}>
              <FileAddOutlined />
              收藏
            </Button>
            <Button
              className={getClass('button')}
              onClick={() => push(DynamicPage.user(user?.userId))}
            >
              <UserOutlined />
              个人主页
            </Button>
          </div>
          <div className={getClass('description')}>
            <span>
              单曲数:<strong>{artistDetail?.musicSize}</strong>
            </span>
            <span>
              专辑数:<strong>{artistDetail?.albumSize}</strong>
            </span>
            <span>
              MV数:<strong>{artistDetail?.mvSize}</strong>
            </span>
          </div>
        </section>
      </header>

      <Tabs destroyInactiveTabPane tabBarExtraContent={extraContent} onChange={setActiveKey}>
        <Tabs.TabPane tab="专辑" key="album">
          <Suspense fallback="加载中...">
            <Album type={activeButton} id={id} data={albums} isAlbum />
          </Suspense>
        </Tabs.TabPane>
        <Tabs.TabPane tab="MV" key="mv">
          <Suspense fallback="加载中...">
            <MV id={id} />
          </Suspense>
        </Tabs.TabPane>
        <Tabs.TabPane tab="歌手详情" key="detail">
          <Suspense fallback="加载中...">{artistDetail && <Detail id={id} />}</Suspense>
        </Tabs.TabPane>
        <Tabs.TabPane tab="相似歌手" key="similar">
          <Suspense fallback="加载中...">
            <Similar id={id} />
          </Suspense>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Singer;
