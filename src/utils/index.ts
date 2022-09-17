import dayjs from 'dayjs';
import json from 'json5';

import { Data, Song } from '@/types';
import { Music } from '@/types';

// 封装localStorage，可设置过期事件
export const local = {
  set(key: string, value: unknown, expires = 86400000) {
    const handledValue = typeof value === 'string' ? value : json.stringify(value);
    localStorage.setItem(key, handledValue);
    localStorage.setItem(`${key}__expires__`, Date.now() + expires + '');
    return value;
  },
  get(key: string) {
    const now = Date.now();
    const expired = localStorage.getItem(`${key}__expires__`) || now + 1;
    if (now >= expired) {
      this.remove(key);
      return;
    }
    return localStorage.getItem(key);
  },
  remove(key: string) {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}__expires__`);
  },
};

// 包裹async/await错误处理
export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}

export const wrapNumber = (num?: number) => {
  if (!num) return 0;
  return num < 10000 ? '' + num : Math.floor(num / 10000) + '万';
};

// eslint-disable-next-line
export const noop = () => { };

export const formatMS = (timestamp: number | string) => dayjs(timestamp).format('mm:ss');

export const resolveLyricTime = (time: string) => {
  const timeArr = time.split(':');
  const minute = Number(timeArr[0]);
  const second = Number(timeArr[1]);
  const result = minute * 60 + second;
  return Number.isNaN(result) ? 0 : result * 1000;
};

export const resizeImg = (url: string, x = 200, y?: number) => {
  return `${url}?param=${x}y${y || x}`;
};

export const transformMusic2Track = (music: Music) => {
  const { id, name, duration: dt, album: al, artists: ar } = music;
  return { id, name, dt, al, ar };
};

export const transformSong2Track = (song: Song) => {
  const { id, name, duration: dt, album: al, artists: ar } = song;
  return { id, name, dt, al, ar };
};

export function classGenerator(suffix: string, styles?: Data<string>) {
  return function (name?: string) {
    const value = suffix + (name ? '__' + name : '');
    return styles ? styles[value] : value;
  };
}

export function toHttps(url?: string) {
  return url?.replace(/^http(?!s)/, $0 => `${$0}s`);
}
