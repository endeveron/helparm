'use client';

import classNames from 'classnames';
import { useRouter, usePathname } from 'next/navigation';

import { navbarIconMap } from 'data/navbar';
import { NavItem } from 'types/nav';
import { getIcon } from 'utils/icon';

import './NavbarItem.scss';

interface NavbarItemProps extends NavItem {
  onClick?: () => void;
  className?: string;
}

const NavbarItem = ({
  className,
  iconName,
  title,
  navLink,
  onClick,
}: NavbarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = navLink === pathname;

  const handleClick = () => {
    if (navLink) router.push(navLink);
    onClick && onClick();
  };

  return (
    <div
      className={classNames('navbar-item anim', className, {
        'navbar-item--active': isActive,
      })}
      onClick={handleClick}
    >
      <div className="navbar-item__tooltip tooltip">{title}</div>
      <div className="navbar-item__icon">
        {getIcon(iconName, navbarIconMap)}
      </div>
      <div className="navbar-item__title">{title}</div>
    </div>
  );
};

export { NavbarItem };
