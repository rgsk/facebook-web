import React, { useState } from 'react';
import FeedCard from './FeedCard';
import styles from './Feed.module.scss';
import { gql, useQuery } from '@apollo/client';

import { useLoggedInUserState } from '../../state/userState';
import Modal from '../shared/Modal';
import CreatePostCard from './CreatePostCard';
import ProfileImageContainer from '../shared/ProfileImageContainer';
const GET_ALL_POSTS = gql`
  query getAllPosts {
    getAllPosts {
      message
      error
      posts {
        id
        body

        user {
          id
          username
        }
        comments {
          body
          user {
            id
            username
          }
        }
        likes {
          user {
            id
            username
          }
        }
      }
    }
  }
`;
function Feed() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  const { loggedInUser } = useLoggedInUserState();
  const [showModal, setShowModal] = useState();
  const [createdPosts, setCreatedPosts] = useState([]);
  if (loading) {
    return <p>Loading</p>;
  } else if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div
      style={{
        width: window.innerWidth - 600 + 'px',
        marginLeft: '300px',
      }}
    >
      {showModal && (
        <Modal>
          <CreatePostCard
            close={() => setShowModal(false)}
            addPost={(createdPost) => {
              setCreatedPosts((prev) => {
                const updated = [...prev];
                updated.unshift(createdPost);
                return updated;
              });
            }}
          />
        </Modal>
      )}
      <div className={styles.feedContainer}>
        <div className={styles.newFeed}>
          <ProfileImageContainer width="40px" height="40px" />
          <div className={styles.box} onClick={() => setShowModal(true)}>
            What's on your mind, {loggedInUser.username}?
          </div>
        </div>
        {createdPosts.map((post) => (
          <FeedCard name={post.user.username} text={post.body} />
        ))}
        {data.getAllPosts.posts.map((post) => (
          <FeedCard name={post.user.username} text={post.body} />
        ))}
        <FeedCard
          name="Ministry of Health and Family Welfare, Government of India"
          text=" Are you a Senior Software Engineer living outside the U.S.? Interested
        in top remote U.S. Software jobs?"
        />
      </div>
    </div>
  );
}

export default Feed;
