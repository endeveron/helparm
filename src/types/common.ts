import { ReactElement } from 'react';

export type ChangeFields<T, R> = Omit<T, keyof R> & R;

export interface LocationState {
  path?: {
    pathname: string;
  };
}

export type WithChildren<T = {}> = T & { children?: React.ReactNode };

export type IconMap = Map<string, ReactElement>;

// API result data
export type Result<T> = {
  data: T | null;
  error?: string;
};

// DB Controller result data
export type IControllerResult<T> = Promise<Result<T>>;
