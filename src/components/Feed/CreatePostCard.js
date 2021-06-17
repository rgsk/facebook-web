import React, { useEffect, useRef, useState } from 'react';
import styles from './CreatPostCard.module.scss';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as GlobeIcon } from '../../assets/icons/globe.svg';
import IconButton from '../shared/IconButton';
import Icon from '../shared/Icon';
import { gql, useMutation } from '@apollo/client';

import ProfileImageContainer from '../shared/ProfileImageContainer';
import { useLoggedInUserState } from '../../state/userState';
import TextareaAutosize from 'react-textarea-autosize';
import CheckInImage from '../../assets/iconsCropped/checkin.png';
import FeelingImage from '../../assets/iconsCropped/feeling.png';
import HostQnAImage from '../../assets/iconsCropped/hostqna.png';
import PhotoImage from '../../assets/iconsCropped/photo.png';
import TagImage from '../../assets/iconsCropped/tag.png';
import { ReactComponent as MoreIcon } from '../../assets/icons/more.svg';
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $userId: ID!) {
    createPost(body: $body, userId: $userId) {
      message
      post {
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
function CreatePostCard({ close, addPost }) {
  const [createPost, { error, loading }] = useMutation(CREATE_POST_MUTATION);
  const { loggedInUser } = useLoggedInUserState();
  const [postInput, setPostInput] = useState();
  const textInputRef = useRef();
  useEffect(() => {
    textInputRef.current.focus();
  }, []);
  const submitPost = async () => {
    console.log(postInput);
    const response = await createPost({
      variables: {
        body: postInput,
        userId: loggedInUser.id,
      },
    });
    // console.log(response);
    const createdPost = response.data.createPost.post;
    addPost(createdPost);
    close();
  };
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <p className={styles.head}>Create Post</p>
        <p onClick={close} className={styles.close}>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </p>
      </div>
      <div className={styles.rest}>
        <div className={styles.profile}>
          <ProfileImageContainer width="40px" height="40px" />
          <div className={styles.nameSelector}>
            <span className={styles.name}>{loggedInUser.username}</span>
            <span className={styles.selector}>
              <GlobeIcon /> <span className={styles.para}>Public</span>
              <i className="fa fa-caret-down"></i>
            </span>
          </div>
        </div>
        <div className={styles.content}>
          <div className={[styles.textInput, 'scrollBar'].join(' ')}>
            <TextareaAutosize
              minRows="5"
              placeholder={`What's on your mind, ${loggedInUser.username}?`}
              ref={textInputRef}
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.box}>
          <p className={styles.text}>Add to your post</p>
          <p className={styles.images}>
            <IconButton small hintText="Photo/Video" hintPosition="tc">
              <img src={PhotoImage} alt="" />
            </IconButton>
            <IconButton small hintText="Tag People" hintPosition="tc">
              <img src={TagImage} alt="" />
            </IconButton>
            <IconButton small hintText="Feeling/Activity" hintPosition="tc">
              <img src={FeelingImage} alt="" />
            </IconButton>
            <IconButton small hintText="Check in" hintPosition="tc">
              <img src={CheckInImage} alt="" />
            </IconButton>
            <IconButton small hintText="Host a Q&A" hintPosition="tc">
              <img src={HostQnAImage} alt="" />
            </IconButton>
            <Icon small hintText="More" hintPosition="tc">
              <MoreIcon />
            </Icon>
          </p>
        </div>
        <div className={styles.button} onClick={submitPost}>
          Post
        </div>
      </div>
    </div>
  );
}

export default CreatePostCard;
