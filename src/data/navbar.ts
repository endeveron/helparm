import Account24 from '/public/icons/navbar/account.svg';
import AlternateEmail24 from '/public/icons/navbar/contacts.svg';
import DarkMode from '/public/icons/navbar/dark-mode.svg';
import Home24 from '/public/icons/navbar/home.svg';
import LightMode24 from '/public/icons/navbar/light-mode.svg';
import MoreHoriz24 from '/public/icons/navbar/more.svg';
import QrCodeScanner24 from '/public/icons/navbar/qr-code.svg';
import Search24 from '/public/icons/navbar/search.svg';
import WiFiOff24 from '/public/icons/navbar/offline.svg';

import { articleIconMap } from 'data/article';
import { IconMap } from 'types/common';
import { NavItem } from 'types/nav';

interface NavbarItems {
  topItems: NavItem[];
  bottomMainItems: NavItem[];
  bttomAddItems: NavItem[];
}

const navbar: NavbarItems = {
  topItems: [
    {
      title: 'Пошук',
      navLink: '/search',
      iconName: 'search',
      hideOffline: true,
    },
  ],
  bottomMainItems: [
    {
      title: 'Акаунт',
      navLink: '/account',
      iconName: 'account',
      hideOffline: true,
    },
  ],
  bttomAddItems: [
    {
      title: 'QR Код',
      navLink: '/share',
      iconName: 'qr-code',
    },
    {
      title: 'Контакти',
      navLink: '/contacts',
      iconName: 'contacts',
      hideOffline: true,
    },
  ],
};

const navbarBaseIconMap: IconMap = new Map([
  ['account', Account24()],
  ['contacts', AlternateEmail24()],
  ['dark-mode', DarkMode()],
  ['home', Home24()],
  ['light-mode', LightMode24()],
  ['more', MoreHoriz24()],
  ['qr-code', QrCodeScanner24()],
  ['search', Search24()],
  ['offline', WiFiOff24()],
]);

const navbarIconMap: IconMap = new Map([
  ...articleIconMap,
  ...navbarBaseIconMap,
]);

export { navbar, navbarIconMap };
