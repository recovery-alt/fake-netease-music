import React, { useState, MouseEventHandler } from 'react';
import styles from './login.module.less';
import ReactDOM from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';
import login from '@/assets/img/login.svg';
import { postLogin } from '@/api';
import { message } from 'antd';
import { local } from '@/utils';

type Props = { setShowLogin: (show: boolean) => void };

const Login: React.FC<Props> = ({ setShowLogin }) => {
  const dom = document.getElementById('portal')!;

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const hideLogin: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    setShowLogin(false);
  };

  const submitLogin = async () => {
    if (!phone || !password) return;
    const res = await postLogin({ phone, password });
    if (res.code === 200) {
      local.set('cookie', res.cookie);
      message.success('登录成功~');
      setShowLogin(false);
    } else {
      message.error('未登录');
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
