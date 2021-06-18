import React, { useState, useRef, useEffect } from 'react';
import ImageSvg from '../shared/ImageSvg';
import styles from './FeedCard.module.scss';
import TextareaAutosize from 'react-textarea-autosize';

import ProfileImage from '../../assets/images/profile.jpg';
import { ReactComponent as MoreIcon } from '../../assets/icons/more.svg';
import { ReactComponent as LikeIcon } from '../../assets/icons/like.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comment.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import { ReactComponent as GlobeIcon } from '../../assets/icons/globe.svg';
import { ReactComponent as LikeColoredIcon } from '../../assets/iconsColored/like.svg';
import LikeEmoji from '../../assets/emojis/like.png';
import LoveEmoji from '../../assets/emojis/love.png';
import CareEmoji from '../../assets/emojis/care.png';
import HahaEmoji from '../../assets/emojis/haha.png';
import WowEmoji from '../../assets/emojis/wow.png';
import SadEmoji from '../../assets/emojis/sad.png';
import AngryEmoji from '../../assets/emojis/angry.png';

import Icon from '../shared/Icon';
import { gql, useMutation } from '@apollo/client';
import ProfileImageContainer from '../shared/ProfileImageContainer';
import { useLoggedInUserState } from '../../state/userState';
const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($body: String!, $userId: ID!, $postId: ID!) {
    createComment(body: $body, userId: $userId, postId: $postId) {
      message
      comment {
        id
        body
        user {
          id
          username
        }
      }
    }
  }
`;
const CREATE_LIKE_MUTAION = gql`
  mutation createLike($userId: ID!, $postId: ID!, $reactionType: String!) {
    createLike(userId: $userId, postId: $postId, reactionType: $reactionType) {
      message
      like {
        id
        reactionType
        user {
          id
          username
        }
      }
    }
  }
`;
const DELETE_LIKE_MUTATION = gql`
  mutation deleteLike($id: ID!) {
    deleteLike(id: $id) {
      message
    }
  }
`;
function FeedCard({ post }) {
  const { loggedInUser } = useLoggedInUserState();
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);
  const [createLike] = useMutation(CREATE_LIKE_MUTAION);
  const [deleteLike] = useMutation(DELETE_LIKE_MUTATION);
  const [likeHovered, setLikeHovered] = useState(false);
  const [barHovered, setBarHovered] = useState(false);
  const [commentInput, setCommentInput] = useState();
  const commentInputRef = useRef();
  const [showComments, setShowComments] = useState(false);
  const [reversedComments, setReversedComments] = useState(() => {
    const reversed = [...post.comments];
    reversed.reverse();
    return reversed;
  });
  const [localLikes, setLocalLikes] = useState(() => {
    return [...post.likes];
  });
  const [commentsShown, setCommentsShown] = useState(2);
  const BAR_TIMEOUT = 1000;
  const likeTimeout = useRef();
  const barTimeout = useRef();
  // console.log(imageUrl);
  useEffect(() => {
    // console.log(post.likes);
  }, []);
  const commentEnterPressed = async () => {
    if (commentInput === '') return;
    // console.log(commentInput);
    // console.log(loggedInUser.id);
    // console.log(postId);
    commentInputRef.current.blur();
    setCommentInput('');
    setTimeout(() => {
      commentInputRef.current.focus();
    }, 0);
    const response = await createComment({
      variables: {
        body: commentInput,
        userId: loggedInUser.id,
        postId: post.id,
      },
    });
    // console.log(response);
    setReversedComments((prev) => {
      return [response.data.createComment.comment, ...prev];
    });
  };
  const likeClicked = async (reactionType) => {
    setBarHovered(false);
    setLikeHovered(false);
    const response = await createLike({
      variables: {
        userId: loggedInUser.id,
        postId: post.id,
        reactionType,
      },
    });
    // console.log(response);
    // console.log(response.data.createLike.message);
    // console.log(response.data.createLike.like.reactionType);
    const newLike = response.data.createLike.like;

    const cloneLike = localLikes.find((like) => like.id === newLike.id);
    // console.log(newLike);
    // console.log(cloneLike);
    if (cloneLike) {
      if (cloneLike.reactionType !== newLike.reactionType) {
        setLocalLikes((prev) => {
          return prev.map((like) => {
            if (like.id === newLike.id) {
              return {
                ...like,
                reactionType: newLike.reactionType,
              };
            }
            return like;
          });
        });
      } else {
        setLocalLikes((prev) => prev.filter((like) => like.id !== newLike.id));
        const response = await deleteLike({
          variables: {
            id: newLike.id,
          },
        });
        // console.log(response);
      }
    } else {
      setLocalLikes((prev) => [...prev, newLike]);
    }
  };

  return (
    <div className={styles.feedContainer}>
      <div className={styles.additionalInfo}></div>
      <div className={styles.topBar}>
        <div className={styles.image}>
          <ImageSvg image={ProfileImage} medium />
        </div>
        <div className={styles.details}>
          <div className={styles.name}>{post.user.username}</div>
          <div className={styles.dateTime}>
            12 May at 19:34 &middot; <GlobeIcon />
          </div>
        </div>
        <div className={styles.icon}>
          <Icon>
            <MoreIcon />
          </Icon>
        </div>
      </div>
      <div className={styles.text}>{post.body}</div>
      <div className={styles.asset}>
        {post.imageUrl && (
          <img
            src={process.env.REACT_APP_SERVER_URL + '/' + post.imageUrl}
            alt="failed to load"
          />
        )}
      </div>
      <div className={styles.postResponse}>
        <div className={styles.like}>
          <LikeColoredIcon />
          &nbsp; {localLikes.length}
        </div>
        <div className={styles.spacer}></div>
        <div>{reversedComments.length} comments &nbsp; 12 shares</div>
      </div>
      <div className={styles.buttonsSection}>
        {(likeHovered || barHovered) && (
          <div
            className={styles.emojiBar}
            onMouseEnter={() => {
              setBarHovered(true);
              clearTimeout(barTimeout.current);
            }}
            onMouseLeave={() => {
              barTimeout.current = setTimeout(() => {
                setBarHovered(false);
              }, BAR_TIMEOUT);
            }}
          >
            <div className={styles.emoji} onClick={() => likeClicked('like')}>
              <img src={LikeEmoji} alt="like emoji" />
              <div className={styles.emojiText}>Like</div>
            </div>
            <div className={styles.emoji} onClick={() => likeClicked('love')}>
              <img src={LoveEmoji} alt="love emoji" />
              <div className={styles.emojiText}>Love</div>
            </div>
            <div className={styles.emoji} onClick={() => likeClicked('care')}>
              <img src={CareEmoji} alt="care emoji" />
              <div className={styles.emojiText}>Care</div>
            </div>
            <div className={styles.emoji} onClick={() => likeClicked('haha')}>
              <img src={HahaEmoji} alt="haha emoji" />
              <div className={styles.emojiText}>Haha</div>
            </div>
            <div className={styles.emoji} onClick={() => likeClicked('wow')}>
              <img src={WowEmoji} alt="wow emoji" />
              <div className={styles.emojiText}>Wow</div>
            </div>
            <div className={styles.emoji} onClick={() => likeClicked('sad')}>
              <img src={SadEmoji} alt="sad emoji" />
              <div className={styles.emojiText}>Sad</div>
            </div>
            <div className={styles.emoji} onClick={() => likeClicked('angry')}>
              <img src={AngryEmoji} alt="angry emoji" />
              <div className={styles.emojiText}>Angry</div>
            </div>
          </div>
        )}
        <div className={styles.buttons}>
          <div
            className={styles.button}
            onMouseEnter={() => {
              setLikeHovered(true);
              clearTimeout(likeTimeout.current);
            }}
            onMouseLeave={() => {
              likeTimeout.current = setTimeout(() => {
                setLikeHovered(false);
              }, BAR_TIMEOUT);
            }}
            onClick={() => likeClicked('like')}
          >
            <LikeIcon />
            Like
          </div>
          <div
            className={styles.button}
            onClick={() => {
              setShowComments(!showComments);
              setCommentsShown(2);
            }}
          >
            <CommentIcon /> Comment
          </div>
          <div className={styles.button}>
            <ShareIcon /> Share
          </div>
        </div>
      </div>
      {showComments && (
        <div className={styles.commentsSection}>
          <div className={styles.commentUser}>
            <ProfileImageContainer width="40px" height="40px" />
            <TextareaAutosize
              className={styles.commentInput}
              placeholder="Write a comment..."
              value={commentInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  commentEnterPressed();
                }
              }}
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
              ref={commentInputRef}
            />
          </div>
          <div className={styles.comments}>
            {reversedComments.map((comment, i) => {
              if (i < commentsShown) {
                return (
                  <div key={i} className={styles.comment}>
                    <div className={styles.top}>
                      <ProfileImageContainer width="40px" height="40px" />
                      <div>
                        <div className={styles.content}>
                          <span>{comment.user.username}</span>
                          <span>{comment.body}</span>
                        </div>
                        <div className={styles.bar}>
                          <span>Like</span> &middot; <span>Reply</span> &middot;
                          <span> 13m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          {commentsShown !== reversedComments.length && (
            <div className={styles.commentsDetails}>
              <span
                className={styles.textButton}
                onClick={() => {
                  setCommentsShown(
                    Math.min(commentsShown + 10, reversedComments.length)
                  );
                }}
              >
                View more comments
              </span>
              <span className={styles.detail}>
                {commentsShown} of {reversedComments.length}
              </span>
            </div>
          )}

          <span
            className={styles.textButton}
            onClick={() => {
              // console.log(window.scrollY);
              window.scrollTo({
                top: commentInputRef.current.offsetTop - 300,
                behavior: 'smooth',
              });
              // console.log(commentInputRef.current.offsetTop);
            }}
          >
            Write a comment...
          </span>
        </div>
      )}
    </div>
  );
}

export default FeedCard;
