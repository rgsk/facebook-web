import React, { useState } from 'react';
import { useShowDropdownState } from '../../state/navBarState';
import { capitalize } from '../../utils';
import IconButton from '../shared/IconButton';
import styles from './EndNavItem.module.scss';
import HintText from '../shared/HintText';
function EndNavItem(props) {
  const { showDropdown, toggleDropdown } = useShowDropdownState();
  const [showHint, setShowHint] = useState(false);
  return (
    <>
      <div className={styles.item}>
        <div
          onMouseEnter={() => setShowHint(true)}
          onMouseLeave={() => setShowHint(false)}
        >
          <IconButton
            onClick={(e) => {
              toggleDropdown(props.type);
              // console.log(e);
              e.stopPropagation();
            }}
          >
            {props.icon}
          </IconButton>
        </div>
        <span className={styles.hint}>
          {props.type && showHint && (
            <HintText position="bc">{capitalize(props.type)}</HintText>
          )}
        </span>
      </div>
      {showDropdown[props.type] && props.children}
    </>
  );
}

export default EndNavItem;
