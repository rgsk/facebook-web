import React from 'react';
import FeedCard from './FeedCard';
import styles from './Feed.module.scss';
function Feed() {
  return (
    <div
      style={{
        width: window.innerWidth - 600 + 'px',
        marginLeft: '300px',
      }}
    >
      <div className={styles.feedContainer}>
        <FeedCard />
      </div>
    </div>
  );
}

export default Feed;
