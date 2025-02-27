'use client';

import { useState } from 'react';

import VisibilityIcon from '/public/icons/ui/visibility.svg';
import VisibilityOffIcon from '/public/icons/ui/visibility-off.svg';

export const usePasswordVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const visibilityOffIcon = <VisibilityOffIcon />;
  const visibilityOnIcon = <VisibilityIcon />;
  const visibilityIcon = isVisible ? visibilityOffIcon : visibilityOnIcon;

  return { isVisible, visibilityIcon, toggleVisibility };
};
