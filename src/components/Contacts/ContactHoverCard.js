import React from 'react';
import styles from './ContactHoverCard.module.scss';
import { ReactComponent as FriendsIcon } from '../../assets/icons/friends.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import ImageSvg from '../shared/ImageSvg';
const ContactHoverCard = ({ image, name }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.image}>
        <ImageSvg image={image} large />
      </div>
      <div className={styles.userDetails}>
        <div className={styles.name}>{name}</div>
        <div className={styles.detail}>
          <div className={styles.icon}>
            <FriendsIcon />
          </div>
          <div>12 mutual friends, including Tushar Bhalla and Gautam Behl</div>
        </div>
        <div className={styles.detail}>
          <div className={styles.icon}>
            <HomeIcon />
          </div>
          <div>Lives in Chandigarh, India</div>
        </div>
      </div>
    </div>
  );
};

export default ContactHoverCard;
