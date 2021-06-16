import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './Home.module.scss';
import Contacts from '../components/Contacts/Contacts';
import SideBar from '../components/SideBar/SideBar';
import Feed from '../components/Feed/Feed';
import IconButton from '../components/shared/IconButton';
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg';
import MessagingWindow from '../components/MessagingWindow/MessagingWindow';
import { useThemeState, useShowDropdownState } from '../state/navBarState';
import { useCurrentRoomInfoState } from '../state/messageState';

function Home() {
  const { setCurrentRoomInfo, currentRoomInfo } = useCurrentRoomInfoState();
  const { closeDropdown } = useShowDropdownState();
  const { theme } = useThemeState();
  return (
    <div
      className={
        styles.container +
        ' ' +
        (theme === 'dark' ? styles.darkTheme : styles.lightTheme)
      }
      onClick={() => {
        closeDropdown();
        console.log('home setting');
        setCurrentRoomInfo(null);
      }}
    >
      <div className={styles.navBar}>
        <Navbar></Navbar>
      </div>
      <div className={styles.restPage}>
        <div className={styles.sideBar}>
          <SideBar />
        </div>
        <div className={styles.feed}>
          <Feed />
        </div>
        <div className={styles.contacts}>
          <Contacts />
        </div>
        <div className={styles.floatingIcon}>
          <IconButton
            style={{
              padding: '10px',
            }}
            hintText="New Message"
            hintPosition="cl"
            large
          >
            <EditIcon />
          </IconButton>
        </div>
        {currentRoomInfo && <MessagingWindow />}
      </div>
    </div>
  );
}

export default Home;
