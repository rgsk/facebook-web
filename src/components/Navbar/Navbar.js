import React, { useState, useRef, useEffect } from 'react';
import styles from './Navbar.module.scss';
import { ReactComponent as BellIcon } from '../../assets/icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../../assets/icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../../assets/icons/caret.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { ReactComponent as FacebookIcon } from '../../assets/icons/facebook.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as WatchIcon } from '../../assets/icons/watch.svg';
import { ReactComponent as MarketplaceIcon } from '../../assets/icons/marketplace.svg';
import { ReactComponent as GroupsIcon } from '../../assets/icons/groups.svg';
import { ReactComponent as GamingIcon } from '../../assets/icons/gaming.svg';
import { ReactComponent as LeftArrowIcon } from '../../assets/icons/left-arrow.svg';

import ProfileImage from '../../assets/images/profile.jpg';
import EndNavItem from './EndNavItem';
import DropdownMenu from './DropdownMenu';
import { useRecoilValue } from 'recoil';
import {
  showDropdownState,
  activeTabState,
  useThemeState,
} from '../../state/navBarState';
import { useLoggedInUserState } from '../../state/userState';
import MidNavItem from './MidNavItem';
import Card from '../shared/Card';
function Navbar() {
  const { toggleTheme } = useThemeState();
  const [editing, setEditing] = useState(false);
  const dropdownTypes = Object.keys(useRecoilValue(showDropdownState));
  const tabTypes = Object.keys(useRecoilValue(activeTabState));
  const [searchContainerHeight, setSearchContainerHeight] = useState();
  const [searchInputWidth, setSearchInputWidth] = useState();
  const [flexInput, setFlexInput] = useState(0);
  const searchChildRef = useRef();
  const searchInputRef = useRef();
  const { loggedInUser } = useLoggedInUserState();
  useEffect(() => {
    setSearchInputWidth(searchInputRef.current.clientWidth);
  }, []);
  useEffect(() => {
    setSearchContainerHeight(searchChildRef.current.clientHeight);
    if (editing) {
      setFlexInput(1);
    } else {
      setFlexInput(0);
    }
  }, [editing]);
  return (
    <nav className={styles.navbar}>
      <div className={styles.start}>
        <div
          className={styles.searchContainer}
          style={{
            height: searchContainerHeight + 'px',
          }}
        >
          {editing ? (
            <div className={styles.searchEditing} ref={searchChildRef}>
              <div className={styles.searchBar}>
                <div
                  className={styles.leftArrowIcon}
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  <LeftArrowIcon />
                </div>

                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="Search Facebook"
                  autoFocus
                  onBlur={() => {
                    setEditing(false);
                  }}
                  style={{
                    minWidth: searchInputWidth - 16 + 'px',
                    // because of padding-left: 1rem
                    // box-sizing is not border-box
                    flex: flexInput,
                  }}
                ></input>
              </div>
              <div className={styles.searchResults}>No recent searches</div>
            </div>
          ) : (
            <div className={styles.searchNotEditing} ref={searchChildRef}>
              <div className={styles.fbIcon} onClick={toggleTheme}>
                <FacebookIcon />
              </div>
              <div
                onClick={() => setEditing(true)}
                className={styles.search}
                ref={searchInputRef}
              >
                <SearchIcon />
                Search Facebook
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.mid}>
        <div className={styles.icons}>
          <MidNavItem icon={<HomeIcon />} tab={tabTypes[0]} />
          <MidNavItem icon={<WatchIcon />} tab={tabTypes[1]} />
          <MidNavItem icon={<MarketplaceIcon />} tab={tabTypes[2]} />
          <MidNavItem icon={<GroupsIcon />} tab={tabTypes[3]} />
          <MidNavItem icon={<GamingIcon />} tab={tabTypes[4]} />
        </div>
      </div>
      <div className={styles.end}>
        <div className={styles.profile}>
          <Card image={ProfileImage}>{loggedInUser.username}</Card>
        </div>
        <EndNavItem type={dropdownTypes[0]} icon={<PlusIcon />} />
        <EndNavItem type={dropdownTypes[1]} icon={<MessengerIcon />} />
        <EndNavItem type={dropdownTypes[2]} icon={<BellIcon />} />
        <EndNavItem type={dropdownTypes[3]} icon={<CaretIcon />}>
          <DropdownMenu></DropdownMenu>
        </EndNavItem>
      </div>
    </nav>
  );
}

export default Navbar;
