import React from 'react';
import styles from './HintText.module.scss';
function HintText(props) {
  let style;
  if (props.position === 'cl' || props.position === 'lc') {
    style = {
      top: '50%',
      left: 0,
      transform: 'translate(-100%, -50%)',
    };
  } else if (props.position === 'bl' || props.position === 'lb') {
    style = {
      top: '100%',
      left: 0,
      transform: 'translate(-100%, -50%)',
    };
  } else if (props.position === 'bc' || props.position === 'cb') {
    style = {
      bottom: 0,
      left: '50%',
      transform: 'translate(-50%, 100%)',
    };
  }
  return (
    <div className={styles.hint} style={style}>
      {props.children}
    </div>
  );
}

export default HintText;
