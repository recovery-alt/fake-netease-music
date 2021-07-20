export type ResponseData<T = any> = {
  code: number;
  data: T;
  msg: string;
};

export type Data<T = unknown> = Record<string, T>;

export interface AppProps {
  children?: React.ReactNode;
  functionChildren?: (name: string) => React.ReactNode;
  style?: React.CSSProperties;
  onChange?: React.FormEventHandler<HTMLInputElement>;
}
