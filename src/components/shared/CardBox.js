import React from 'react';
import styles from './CardBox.module.scss';

const CardBox = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
export default CardBox;
