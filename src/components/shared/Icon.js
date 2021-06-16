import React, { useState } from 'react';
import styles from './Icon.module.scss';
import HintText from '../shared/HintText';
function Icon(props) {
  const [showHint, setShowHint] = useState(false);
  return (
    <div className={styles.icon}>
      <div
        className={styles.iconContainer}
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
      >
        {props.children}
      </div>
      {props.hintText && showHint && (
        <HintText position={props.hintPosition}>{props.hintText}</HintText>
      )}
    </div>
  );
}

export default Icon;
