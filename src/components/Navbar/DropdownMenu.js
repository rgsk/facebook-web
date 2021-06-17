import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as CogIcon } from '../../assets/icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../../assets/icons/bolt.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg';
import { CSSTransition } from 'react-transition-group';
import styles from './DropdownMenu.module.scss';
import './DropdownMenu.scss';
import IconButton from '../shared/IconButton';
import { useLoggedInUserState } from '../../state/userState';
function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const { logoutUser } = useLoggedInUserState();
  useEffect(() => {
    // console.log(dropdownRef.current.firstChild);
    setMenuHeight(dropdownRef.current.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    const backButton = props.goToMenu === 'main';
    const buttonStyle = !backButton
      ? {
          filter: 'none',
        }
      : {};
    return (
      <div
        className={[
          styles.menuItem,
          backButton ? styles.disableHover : '',
        ].join(' ')}
        onClick={(e) => {
          !backButton && setActiveMenu(props.goToMenu);
          e.stopPropagation();
          if (props.onClick) {
            props.onClick();
          }
        }}
      >
        <IconButton
          onClick={() => backButton && setActiveMenu(props.goToMenu)}
          style={buttonStyle}
        >
          {props.leftIcon}
        </IconButton>

        {props.children}
        {props.rightIcon && (
          <span className={styles.iconRight}>
            <IconButton style={buttonStyle}>{props.rightIcon}</IconButton>
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={styles.dropdown}
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="animals"
          >
            Animals
          </DropdownItem>
          <DropdownItem leftIcon={<LogoutIcon />} onClick={logoutUser}>
            Log out
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>My Profile</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Hello</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>B Bye</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Kaise ho</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Theek hu!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default DropdownMenu;
