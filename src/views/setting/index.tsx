import './setting.less';

import {
  AppleOutlined,
  QqCircleFilled,
  WechatOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Checkbox, Radio, Slider, Space } from 'antd';
import { FC } from 'react';

import { classGenerator } from '@/utils';

const getClass = classGenerator('setting');

const Setting: FC = () => {
  const bindAccount = [
    { icon: WeiboCircleOutlined, active: false },
    { icon: QqCircleFilled, active: false },
    { icon: WechatOutlined, active: false },
  ];

  const shortcuts = [
    { introduction: '播放/暂停', shortcut: '', globalShortcut: '' },
    { introduction: '上一首', shortcut: '', globalShortcut: '' },
    { introduction: '下一首', shortcut: '', globalShortcut: '' },
    { introduction: '音量加', shortcut: '', globalShortcut: '' },
    { introduction: '音量减', shortcut: '', globalShortcut: '' },
    { introduction: '喜欢歌曲', shortcut: '', globalShortcut: '' },
    { introduction: '打开/关闭歌词', shortcut: '', globalShortcut: '' },
    { introduction: 'mini/完整模式', shortcut: '', globalShortcut: '' },
  ];

  return (
    <div className={getClass()}>
      <section className={getClass('item')}>
        <header className={getClass('header')}>
          <h3>账号</h3>
          <div className={getClass('icon')}>
            {bindAccount.map((item, i) => (
              <item.icon key={i} />
            ))}
          </div>
        </header>
        <div className={getClass('account')}>
          <button>绑定账号</button>
          <button>修改个人信息</button>
        </div>
      </section>
      <section className={getClass('item')}>
        <header className={getClass('header')}>
          <h3>常规</h3>
        </header>
        <div className={getClass('common')}>
          <div className={getClass('label')}>动画:</div>
          <Checkbox>
            禁用动画效果 <span className={getClass('sub')}>(减少部分资源占用)</span>
          </Checkbox>
          <div className={getClass('label')}>
            播放列表: <span className={getClass('sub')}>单曲、节目</span>
          </div>
          <Radio.Group>
            <Space direction="vertical">
              <Radio>
                双击播放单曲时，用当前单曲所在的歌曲列表替换播放列表
                <span className={getClass('sub')}>节目同理</span>
              </Radio>
              <Radio>
                双击播放单曲时，仅把当前单曲添加到播放列表
                <span className={getClass('sub')}>节目同理</span>
              </Radio>
            </Space>
          </Radio.Group>
          <div className={getClass('label')}>播放歌曲时:</div>
          <Checkbox>启用系统歌曲播放通知栏</Checkbox>
        </div>
      </section>
      <section className={getClass('item')}>
        <header className={getClass('header')}>
          <h3>消息与隐私</h3>
        </header>
        <div className={getClass('label')}>
          私信: <span className={getClass('sub')}>接收私信提醒</span>
        </div>
        <Radio.Group>
          <Space direction="vertical">
            <Radio>所有人</Radio>
            <Radio>我关注的人</Radio>
          </Space>
        </Radio.Group>
        <div className={getClass('label')}>通知:</div>
        <Checkbox>歌单被收藏</Checkbox>
        <Checkbox>收到赞</Checkbox>
        <Checkbox>新粉丝</Checkbox>
        <div className={getClass('label')}>我的听歌排行:</div>
        <Radio.Group>
          <Space direction="vertical">
            <Radio>所有人可见</Radio>
            <Radio>我关注的人可见</Radio>
            <Radio>仅自己可见</Radio>
          </Space>
        </Radio.Group>
        <div className={getClass('label')}>黑名设置:</div>
        <div>
          我的黑名单 <button>查看</button>
        </div>
        <div className={getClass('label')}>个性化服务:</div>
        <Radio.Group>
          <Space direction="vertical">
            <Radio>开启</Radio>
            <Radio>关闭(关闭后，即不会使用你的个性信息提供个性化服务)</Radio>
          </Space>
        </Radio.Group>
      </section>
      <section className={getClass('item')}>
        <header className={getClass('header')}>
          <h3>快捷键</h3>
        </header>
        <div className={getClass('shortcuts-wrapper')}>
          <div className={getClass('shortcuts')}>
            <div>功能说明</div>
            <div>快捷键</div>
            <div>全局快捷键</div>
          </div>
          {shortcuts.map((item, i) => (
            <div key={i} className={getClass('shortcuts')}>
              <div>{item.introduction}</div>
              <div>
                <input type="text" />
              </div>
              <div>
                <input type="text" />
              </div>
            </div>
          ))}
        </div>

        <Checkbox>
          <div className={getClass('checkbox')}>
            启用全局快捷键<span className={getClass('sub')}>云音乐在后台时也能相应</span>
            <button>恢复默认</button>
          </div>
        </Checkbox>
        <div className={getClass('checkbox')}>
          <Checkbox>使用系统媒体快捷键</Checkbox>
        </div>
      </section>
      <section className={getClass('item')}>
        <header className={getClass('header')}>
          <h3>下载设置</h3>
        </header>
        <div>
          <div className={getClass('label')}>音质选择:</div>
          <div>
            试听:
            <Radio.Group>
              <Radio value={1}>普通</Radio>
              <Radio value={2}>较高</Radio>
              <Radio value={3}>极高</Radio>
              <Radio value={4}>无损音质</Radio>
            </Radio.Group>
          </div>
          <div>
            下载:
            <Radio.Group>
              <Radio value={1}>普通</Radio>
              <Radio value={2}>较高</Radio>
              <Radio value={3}>极高</Radio>
              <Radio value={4}>无损音质</Radio>
            </Radio.Group>
          </div>
          <div className={getClass('label')}>缓存设置:</div>
          <div className={getClass('cache')}>
            <span>缓存最大占用</span>
            <Slider />
            <span>1G</span>
            <button>清除缓存</button>
          </div>
        </div>
        <div className={getClass('label')}>音乐命名格式:</div>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={1}>歌曲名</Radio>
            <Radio value={2}>歌手 - 歌曲名</Radio>
            <Radio value={3}>歌曲名 - 歌手</Radio>
          </Space>
        </Radio.Group>
        <div className={getClass('label')}>文件只能分类:</div>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={1}>不分文件夹</Radio>
            <Radio value={2}>按歌手分文件夹</Radio>
            <Radio value={3}>按歌手\专辑分文件夹</Radio>
          </Space>
        </Radio.Group>
      </section>
      <section className={getClass('item')}>
        <header className={getClass('header')}>
          <h3>歌词</h3>
        </header>
        <div className={getClass('lyric')}>
          <div className={getClass('label')}>类型:</div>
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={1}>桌面歌词</Radio>
              <Radio value={2}>菜单栏歌词</Radio>
            </Space>
          </Radio.Group>
          <div className={getClass('label')}>启用:</div>
          <Checkbox>启用歌词</Checkbox>
        </div>
      </section>
      <section className={getClass('item')}>
        <header className={getClass('header')}>
          <h3>关于网易云音乐</h3>
        </header>
        <div className={getClass('footer')}>
          <span>当前版本 2.3.5</span>
          <button>意见反馈</button>
          <button>客服中心</button>
        </div>
        <div className={getClass('footer')}>
          <span>下载移动客户端</span>
          <button className="--red">
            <AppleOutlined /> iPhone版
          </button>
          <button className="--red">
            <AppleOutlined /> iPad版
          </button>
        </div>
        <div className={getClass('footer')}>
          <a href="">《网易云音乐官网》</a>
          <a href="">《网易云音乐社区管理细则》</a>
          <a href="">《服务条款》</a>
          <a href="">《隐私政策》</a>
          <a href="">《儿童隐私政策》</a>
        </div>
      </section>
    </div>
  );
};

export default Setting;
