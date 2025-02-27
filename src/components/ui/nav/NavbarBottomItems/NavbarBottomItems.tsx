import { useMemo, useState } from 'react';

import { NavbarItem } from 'components';
import { navbar } from 'data/navbar';
import { NavItem } from 'types/nav';
import { renderNavbarItems } from 'utils/navbar';
import { useTheme } from 'hooks/useTheme';

interface NavbarBottomItemsProps {
  isMobile: boolean;
  mainItemEl: JSX.Element | null;
  topItemsEl: JSX.Element[] | null;
}

const NavbarBottomItems = ({
  isMobile,
  mainItemEl,
  topItemsEl,
}: NavbarBottomItemsProps) => {
  const { theme, toggleTheme } = useTheme();
  const [showAddItems, setShowAddItems] = useState(false);

  const modeIconName = theme === 'light' ? 'dark-mode' : 'light-mode';

  const toggleAddItems = () => {
    setShowAddItems((prev) => !prev);
  };

  const bottomMainItemsEl = renderNavbarItems(navbar.bottomMainItems);

  const bottomAddItemsEl = useMemo(() => {
    const bttomAddItems: NavItem[] = [
      ...navbar.bttomAddItems,
      {
        title: 'Режим',
        iconName: modeIconName,
        onClick: toggleTheme,
      },
    ];
    return renderNavbarItems(bttomAddItems);
  }, [modeIconName, toggleTheme]);

  const bottomToggleItemEl = useMemo(
    () => (
      <NavbarItem
        title="Інше"
        iconName="more"
        onClick={toggleAddItems}
        key="other"
      />
    ),
    []
  );

  const mobileContent = isMobile && (
    <>
      {!showAddItems && mainItemEl}
      {!showAddItems && topItemsEl}
    </>
  );

  return (
    <>
      {mobileContent}
      {showAddItems ? bottomAddItemsEl : bottomMainItemsEl}
      {bottomToggleItemEl}
    </>
  );
};

export { NavbarBottomItems };
