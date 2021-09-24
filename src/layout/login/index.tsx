import React, { useState, MouseEventHandler } from 'react';
import styles from './login.module.less';
import { createPortal } from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';
import login from '@/assets/img/login.svg';
import { message } from 'antd';
import { classGenerator, local } from '@/utils';
import { useDispatch } from 'react-redux';
import { setUserInfo, setUserPlaylist, AppDispatch } from '@/store';

type Props = { setShowLogin: (show: boolean) => void };

const Login: React.FC<Props> = ({ setShowLogin }) => {
  const getClass = classGenerator('login', styles);
  const dom = document.getElementById('portal')!;
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const hideLogin: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    setShowLogin(false);
  };

  const submitLogin = async () => {
    if (!phone || !password) return;
    const res = await dispatch(setUserInfo({ phone, password }));
    if (setUserInfo.fulfilled.match(res)) {
      local.set('userInfo', res.payload);
      const { userId } = res.payload.profile;
      dispatch(setUserPlaylist(userId));
      setShowLogin(false);
      message.success('登录成功～');
    }
  };

  return createPortal(
    <div className={getClass('mask')}>
      <div className={getClass()}>
        <CloseOutlined onClick={hideLogin} />
        <img className={getClass('img')} src={login} alt="login" />
        <div className={getClass('form')}>
          <div className={getClass('form-item')}>
            <input
              type="text"
              placeholder="请输入手机号"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className={getClass('form-item')}>
            <input
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className={getClass('btn')} onClick={submitLogin}>
          登录
        </button>
        {/* <div className={getClass('register')}>
          <a>注册</a>
        </div> */}
      </div>
    </div>,
    dom
  );
};

export default Login;
