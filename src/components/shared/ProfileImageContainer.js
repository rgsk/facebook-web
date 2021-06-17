import styles from './ProfileImageContainer.module.scss';
import React from 'react';
import ProfileImage from '../../assets/images/profile.jpg';

function ProfileImageContainer({ width, height }) {
  return (
    <div
      className={styles.image}
      style={{
        width,
        height,
      }}
    >
      <img src={ProfileImage} alt="profile" />
    </div>
  );
}

export default ProfileImageContainer;
