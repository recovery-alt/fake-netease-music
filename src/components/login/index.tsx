import React, { useState, MouseEventHandler } from 'react';
import styles from './login.module.less';
import ReactDOM from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';
import login from '@/assets/img/login.svg';
import { message } from 'antd';
import { local } from '@/utils';
import { useDispatch } from 'react-redux';
import { setUserInfo, setUserPlaylist } from '@/reducer';
import { AppDispatch } from '@/store';

type Props = { setShowLogin: (show: boolean) => void };

const Login: React.FC<Props> = ({ setShowLogin }) => {
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
      const result = await dispatch(setUserPlaylist(userId));
      if (setUserPlaylist.fulfilled.match(result)) {
        local.set('userPlaylist', result.payload);
      }
      setShowLogin(false);
      message.success('登录成功～');
    } else {
      message.error('登录失败～');
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.login__mask}>
      <div className={styles.login}>
        <CloseOutlined onClick={hideLogin} />
        <img className={styles.login__img} src={login} alt="login" />
        <div className={styles.login__form}>
          <div className={styles['login__form-item']}>
            <input
              type="text"
              placeholder="请输入手机号"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className={styles['login__form-item']}>
            <input
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.login__btn} onClick={submitLogin}>
          登录
        </button>
        {/* <div className={styles.login__register}>
          <a>注册</a>
        </div> */}
      </div>
    </div>,
    dom
  );
};

export default Login;
