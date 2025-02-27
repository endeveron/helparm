import { Id } from 'types/db';

export type UserRoleName = 'guest' | 'user' | 'manager' | 'admin';

export type UserRole = {
  index: number;
  name: UserRole;
};

export interface IUser {
  account: {
    name: string;
    email: string;
    password: string;
  };
  role: UserRole;
  _id?: Id;
}
