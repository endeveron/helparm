import { NavItem } from 'types/nav';
import { NavbarItem } from 'components';

const renderNavbarItems = (items: NavItem[]) => {
  if (!items?.length) return null;

  return items.map((data) => {
    // if (data?.premium && !isAuthenticated) return null;
    return <NavbarItem {...data} key={data.title} />;
  });
};

export { renderNavbarItems };
