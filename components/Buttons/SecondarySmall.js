import React from 'react';
import styles from 'styles/btnSecondarySmall.module.scss';

const SecondarySmall = ({ className, text, ...others }) => {
  return <button className={`${styles.btnSecondarySmall} ${className}`} {...others}>{text}</button>;
};

export default SecondarySmall;
