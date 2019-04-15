import React from 'react';
import styles from './index.css';
import logo from '../../assets/logo.png';

export default function Logo({isCollapse}) {
  if (isCollapse) {
    return (
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
    );
  } else {
    return (
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <h1>Trace Back</h1>
      </div>
    );
  }
}
