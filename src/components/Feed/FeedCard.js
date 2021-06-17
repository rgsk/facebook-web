import React, { useState, useRef } from 'react';
import ImageSvg from '../shared/ImageSvg';
import styles from './FeedCard.module.scss';
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

function FeedCard({ name, text }) {
  const [likeHovered, setLikeHovered] = useState(false);
  const [barHovered, setBarHovered] = useState(false);
  const BAR_TIMEOUT = 1000;
  const likeTimeout = useRef();
  const barTimeout = useRef();
  return (
    <div className={styles.feedContainer}>
      <div className={styles.additionalInfo}></div>
      <div className={styles.topBar}>
        <div className={styles.image}>
          <ImageSvg image={ProfileImage} medium />
        </div>
        <div className={styles.details}>
          <div className={styles.name}>{name}</div>
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
      <div className={styles.text}>{text}</div>
      <div className={styles.asset}>
        <img src={ProfileImage} alt="" />
      </div>
      <div className={styles.postResponse}>
        <div className={styles.like}>
          <LikeColoredIcon />
          &nbsp; 25K
        </div>
        <div className={styles.spacer}></div>
        <div>44 comments &nbsp; 12 shares</div>
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
            <div className={styles.emoji}>
              <img src={LikeEmoji} alt="like emoji" />
              <div className={styles.emojiText}>Like</div>
            </div>
            <div className={styles.emoji}>
              <img src={LoveEmoji} alt="love emoji" />
              <div className={styles.emojiText}>Love</div>
            </div>
            <div className={styles.emoji}>
              <img src={CareEmoji} alt="care emoji" />
              <div className={styles.emojiText}>Care</div>
            </div>
            <div className={styles.emoji}>
              <img src={HahaEmoji} alt="haha emoji" />
              <div className={styles.emojiText}>Haha</div>
            </div>
            <div className={styles.emoji}>
              <img src={WowEmoji} alt="wow emoji" />
              <div className={styles.emojiText}>Wow</div>
            </div>
            <div className={styles.emoji}>
              <img src={SadEmoji} alt="sad emoji" />
              <div className={styles.emojiText}>Sad</div>
            </div>
            <div className={styles.emoji}>
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
          >
            <LikeIcon />
            Like
          </div>
          <div className={styles.button}>
            <CommentIcon /> Comment
          </div>
          <div className={styles.button}>
            <ShareIcon /> Share
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
