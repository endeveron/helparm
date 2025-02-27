'use client';

import { socialIconMap } from 'data/social';
import { getIcon } from 'utils/icon';

import './SocialButton.scss';

export interface ISocialButton {
  iconName: string;
  url: string;
}

interface SocialButtonProps extends ISocialButton {}

const SocialButton = ({ iconName, url }: SocialButtonProps) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="social-button">
      <div onClick={handleClick} className="social-button__icon">
        {getIcon(iconName, socialIconMap)}
      </div>
    </div>
  );
};

export { SocialButton };
