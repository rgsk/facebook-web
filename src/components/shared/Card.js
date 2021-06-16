import React from 'react';

import styles from './Card.module.scss';
import IconButton from './IconButton';
import ImageSvg from './ImageSvg';
function Card(props) {
  let front;

  if (props.image) {
    // image provided to render
    front = <ImageSvg image={props.image}></ImageSvg>;
  } else {
    // icon provided
    const propsToPass = { ...props };
    if (props.listenClickOnCard) {
      delete propsToPass.onClick;
    }
    front = (
      <IconButton
        style={{
          transform: 'scale(.7)',
        }}
        {...propsToPass}
      >
        {props.icon}
      </IconButton>
    );
  }
  return (
    <div
      className={styles.card}
      onClick={props.image || props.listenClickOnCard ? props.onClick : null}
    >
      {front}
      {props.children}
    </div>
  );
}

export default Card;
