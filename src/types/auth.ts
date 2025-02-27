import { User } from 'next-auth';
import { Result } from 'types/common';

// Auth form

export interface ISignInFormData {
  email: string;
  password: string;
  [key: string]: string;
}

export interface ISignUpFormData extends ISignInFormData {
  name: string;
}

// API

export interface UserReqData {
  email: string;
  password: string;
}
export type UserResData = Result<User>;

export interface SignUpReqData {
  name: string;
  email: string;
  password: string;
}

export type SignUpResData = Result<User>;
