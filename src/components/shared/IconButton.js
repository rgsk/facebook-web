import React, { useState } from 'react';
import styles from './IconButton.module.scss';
import HintText from '../shared/HintText';
function IconButton(props) {
  const [showHint, setShowHint] = useState(false);
  return (
    <div
      className={styles.iconButton}
      onClick={props.onClick}
      style={props.style}
    >
      <div
        className={[
          styles.icon,
          props.large ? styles.large : '',
          props.enhanceSvg ? styles.enhanceSvg : '',
        ].join(' ')}
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

export default IconButton;
