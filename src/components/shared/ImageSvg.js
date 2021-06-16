import React from 'react';
import styles from './ImageSvg.module.scss';
function ImageSvg(props) {
  return (
    <div
      className={[
        styles.imageContainer,
        props.large ? styles.large : '',
        props.medium ? styles.medium : '',
      ].join(' ')}
      style={{
        backgroundImage: `url(${props.image})`,
      }}
    ></div>
  );
}

export default ImageSvg;
