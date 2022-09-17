import { message } from 'antd';
import axios, { AxiosResponse, Canceler } from 'axios';
import json from 'json5';

import type { Data, ResponseData } from '@/types';
import { UserInfo } from '@/types';
import { local } from '@/utils';
import { noop } from '@/utils';

// 统一处理接口异常
const apiErrorHandler = (msg = '接口异常，请稍后重试～') => {
  message.error(msg);
  // 错误抛到业务代码
  return Promise.reject();
};

const baseURL = 'http://localhost:4000/';
const penddingRequests: Canceler[] = [];

export const clearRequests = () => {
  penddingRequests.forEach(cancel => {
    cancel();
  });
  penddingRequests.length = 0;
};

// 策略模式生产状态码
const statusStrategy = (status: number) => {
  const statusEnum: Record<number, string> = {
    400: '请求错误(400)',
    401: '未授权，请重新登录(401)',
    403: '拒绝访问(403)',
    404: '请求出错(404)',
    408: '请求超时(408)',
    500: '服务器错误(500)',
    501: '服务未实现(501)',
    502: '网络错误(502)',
    503: '服务不可用(503)',
    504: '网络超时(504)',
    505: 'HTTP版本不受支持(505)',
    0: `连接出错(${status})!`,
  };
  const message = statusEnum[status] || statusEnum[0];
  return `${message}，请检查网络或联系管理员！`;
};

const service = axios.create({
  // 联调
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [
    (data: unknown) => {
      if (typeof data === 'string' && data.startsWith('{')) {
        data = json.parse(data);
      }
      return data;
    },
  ],
});

// 请求拦截器
service.interceptors.request.use(config => {
  config.cancelToken = new axios.CancelToken(c => {
    penddingRequests.push(c);
  });

  const userInfoStr = local.get('userInfo');
  if (userInfoStr) {
    const userInfo = json.parse<UserInfo>(userInfoStr);
    config.url = config.url + '?cookie=' + userInfo.cookie;
  }

  return config;
}, apiErrorHandler);

// 响应拦截器
service.interceptors.response.use(
  async (response: AxiosResponse<ResponseData>) => {
    const status = response.status;
    if (status < 200 || status >= 300) {
      // 处理http错误
      return apiErrorHandler(statusStrategy(status));
    }

    if (response.data.code === 200) return response.data;
    return apiErrorHandler(response.data.message);
  },
  err => {
    if (axios.isCancel(err)) return new Promise(noop);
    return apiErrorHandler();
  }
);

// get请求
const get = <T>(url: string, params?: Data, config?: Data) =>
  service.get<T, ResponseData<T>>(url, { ...config, params });

// post请求
const post = <T, P = Data>(url: string, params?: P, config?: Data) =>
  service.post<P, ResponseData<T>>(url, params, config);

// put请求
const put = <T, P = Data>(url: string, params?: P, config?: Data) =>
  service.put<P, ResponseData<T>>(url, params, config);

// delete请求
const del = <T>(url: string, params?: Data, config?: Data) =>
  service.delete<T, ResponseData<T>>(url, { ...config, params });

export { del, get, post, put };
