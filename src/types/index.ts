export type Data<T = unknown> = Record<string, T>;

export type ResponseData<T extends Data> = T & {
  code: number;
};

export interface AppProps {
  children?: React.ReactNode;
  functionChildren?: (name: string) => React.ReactNode;
  style?: React.CSSProperties;
  onChange?: React.FormEventHandler<HTMLInputElement>;
}

interface b {
  a: string;
}

type a<T> = b;
