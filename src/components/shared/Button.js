import React from 'react';
import styles from './Button.module.scss';
// interface ButtonProps {
//   // type?: 'button' | 'submit' | 'reset';
//   btnType?: string;
//   style?: React.CSSProperties;
// }

const Button = ({ children, btnType, type, style, onClick }) => {
  return (
    <button
      type={type}
      style={style}
      onClick={onClick}
      className={[
        styles.button,
        btnType === 'blue'
          ? styles.blue
          : btnType === 'green'
          ? styles.green
          : btnType === 'info'
          ? styles.yellow
          : '',
      ].join(' ')}
    >
      {children}
    </button>
  );
};
export default Button;
