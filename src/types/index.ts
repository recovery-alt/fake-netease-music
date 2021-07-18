export type ResponseData<T = any> = {
  code: number;
  data: T;
  msg: string;
};

export type Data<T = unknown> = Record<string, T>;
