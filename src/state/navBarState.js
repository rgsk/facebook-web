import { atom, useRecoilState } from 'recoil';

export const showDropdownState = atom({
  key: 'showDropdownState',
  default: {
    create: false,
    messenger: false,
    notifications: false,
    account: false,
  },
});
export const useShowDropdownState = () => {
  const [showDropdown, setShowDropdown] = useRecoilState(showDropdownState);
  const toggleDropdown = (dropdownType) => {
    setShowDropdown((showDropdown) => {
      const updatedShowDropdown = {};
      for (const type in showDropdown) {
        if (type === dropdownType) {
          updatedShowDropdown[type] = !showDropdown[type];
        } else {
          updatedShowDropdown[type] = false;
        }
      }
      return updatedShowDropdown;
    });
  };
  const closeDropdown = () => {
    setShowDropdown((showDropdown) => {
      const updatedShowDropdown = {};
      for (let key in showDropdown) {
        updatedShowDropdown[key] = false;
      }
      return updatedShowDropdown;
    });
  };
  return {
    showDropdown,
    setShowDropdown,
    toggleDropdown,
    closeDropdown,
  };
};
export const activeTabState = atom({
  key: 'activeTabState',
  default: {
    home: false,
    watch: false,
    marketplace: false,
    groups: false,
    gaming: false,
  },
});

export const useActiveTabState = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const markAsActive = (tab) => {
    setActiveTab((activeTab) => {
      const updatedActiveTab = { ...activeTab };
      for (let tab in updatedActiveTab) {
        updatedActiveTab[tab] = false;
      }
      updatedActiveTab[tab] = true;
      return updatedActiveTab;
    });
  };
  return {
    activeTab,
    setActiveTab,
    markAsActive,
  };
};
export const themeState = atom({
  key: 'themeState',
  default: 'dark',
});
export const useThemeState = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return {
    theme,
    setTheme,
    toggleTheme,
  };
};
