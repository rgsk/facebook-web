import React, { useState } from 'react';
import styles from './MidNavItem.module.scss';
import HintText from '../shared/HintText';
import { capitalize } from '../../utils';
import { useActiveTabState } from '../../state/navBarState';
function MidNavItem(props) {
  const [showHint, setShowHint] = useState(false);
  const { activeTab, markAsActive } = useActiveTabState();
  return (
    <div
      className={[
        styles.item,
        activeTab[props.tab] ? styles.itemActive : '',
      ].join(' ')}
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={() => setShowHint(false)}
      onClick={() => {
        markAsActive(props.tab);
      }}
    >
      {props.icon}
      {activeTab[props.tab] && <span className={styles.border}></span>}
      <span className={styles.hint}>
        {props.tab && showHint && (
          <HintText position="bc">{capitalize(props.tab)}</HintText>
        )}
      </span>
    </div>
  );
}

export default MidNavItem;
