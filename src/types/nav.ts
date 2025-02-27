import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ReactElement } from 'react';

export interface NavItem {
  iconName: string;
  title?: string;
  navLink?: string;
  premium?: boolean;
  hideOffline?: boolean;
  onClick?: () => void;
}
