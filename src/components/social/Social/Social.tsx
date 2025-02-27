import { v4 as uid } from 'uuid';

import { SocialButton } from 'components/social/SocialButton/SocialButton';
import { BASE_URL } from 'configs/constants';

import './Social.scss';
import { Heading } from 'components/Heading';

const text = 'HelpArm - Допомога українцям в Польщі.';
const url = encodeURIComponent(BASE_URL as string);

const shareLinks = [
  {
    iconName: 'facebook',
    url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    iconName: 'twitter',
    url: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
  },
  {
    iconName: 'telegram',
    url: `https://telegram.me/share/url?url=${url}&text=${text}`,
  },
  {
    iconName: 'viber',
    url: `viber://forward?text=${text}%20${url}`,
  },
  {
    iconName: 'skype',
    url: `https://web.skype.com/share?url=${url}&source=button&text=${text}`,
  },
  {
    iconName: 'watsapp',
    url: `https://api.whatsapp.com/send?text=${text}+${url}`,
  },
];

const Social = () => {
  return (
    <div className="social shadow--a anim--d125s">
      <Heading as="h2" className="social__title">
        Допоможіть іншим
      </Heading>
      <div className="social__description">
        Можливо цей контент стане в нагоді
        <br /> комусь з ваших друзів чи знайомих
      </div>
      <div className="social__links">
        {shareLinks.map((linkData) => (
          <SocialButton {...linkData} key={uid()} />
        ))}
      </div>
    </div>
  );
};

export { Social };
