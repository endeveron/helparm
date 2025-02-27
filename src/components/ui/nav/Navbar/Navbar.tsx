'use client';

import { Spacer } from 'components';
import { NavbarBottomItems } from 'components/ui/nav/NavbarBottomItems/NavbarBottomItems';
import { NavbarItem } from 'components/ui/nav/NavbarItem/NavbarItem';
import { articleItems } from 'data/article';
import { navbar } from 'data/navbar';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { renderNavbarItems } from 'utils/navbar';

import './Navbar.scss';

const Navbar = () => {
  const isMobile = useMediaQuery('(max-width: 479px)');

  const topItemsEl = renderNavbarItems(navbar.topItems);

  const mainItemEl = (
    <NavbarItem
      className="navbar__main-item"
      title="Головна"
      iconName="home"
      navLink="/"
      key="main"
    />
  );

  const articleItemsEl = renderNavbarItems(articleItems);

  const bottomItems = (
    <NavbarBottomItems
      mainItemEl={mainItemEl}
      topItemsEl={topItemsEl}
      isMobile={isMobile}
    />
  );

  const mobileContent = (
    <div className="navbar__items mobile anim anim-children">{bottomItems}</div>
  );

  const desktopContent = (
    <div className="navbar__items desktop anim">
      <div className="navbar__item-group navbar__item-group--top">
        {topItemsEl}
      </div>
      <div className="navbar__item-group navbar__item-group--main">
        {mainItemEl}
        <div className="navbar__main-items anim-children">{articleItemsEl}</div>
      </div>
      <Spacer />
      <div className="navbar__item-group navbar__item-group--bottom">
        {bottomItems}
      </div>
    </div>
  );

  return (
    <div className="navbar anim">
      {isMobile ? mobileContent : desktopContent}
    </div>
  );
};

export { Navbar };
