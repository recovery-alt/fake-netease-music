import type { CSSProperties, FormEventHandler, ReactNode } from 'react';

export type Data<T = unknown> = Record<string, T>;

export type ResponseData<T = Data> = T extends Data
  ? T & {
      code: number;
      message: string;
    }
  : { code: number; message: string; result: T };

export interface AppProps {
  className?: string;
  children?: ReactNode;
  functionChildren?: (name: string) => ReactNode;
  style?: CSSProperties;
  onChange?: FormEventHandler<HTMLInputElement>;
}

export type DataActionType = 'add' | 'reset';

export type DataAction<T> = { type: DataActionType; payload: T[] };

export * from './interface';
