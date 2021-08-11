export type Data<T = unknown> = Record<string, T>;

export type ResponseData<T> = T extends Data
  ? T & {
      code: number;
    }
  : { code: number; result: T };

export interface AppProps {
  className?: string;
  children?: React.ReactNode;
  functionChildren?: (name: string) => React.ReactNode;
  style?: React.CSSProperties;
  onChange?: React.FormEventHandler<HTMLInputElement>;
}

export type AlbumType = 'hot' | 'new';

export type AlbumArea = 'ALL' | 'ZH' | 'EA' | 'KR' | 'JP';
