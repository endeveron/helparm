import { ReactElement } from 'react';

import { IconMap } from 'types/common';

export const getIcon = (
  iconName: string,
  iconMap: IconMap
): ReactElement | null => {
  return iconMap.get(iconName) || null;
};
