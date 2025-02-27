import { Result } from 'types/common';

export type VisitorsResData = Result<number>;

export interface ICounter {
  name: string;
  value: number;
  created: Date;
  updated: Date;
}
