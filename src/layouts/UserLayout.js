import React, { Component } from 'react';
import styles from './UserLayout.css';
import logo from '../assets/logo.png';
import Link from 'umi/link';


export default class UserLayout extends Component{

  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <Link to="/index" className={styles.nav}>
            <div className={styles.header}>
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Trace Back</span>
            </div>
            </Link>
            <div className={styles.desc}>Trace Back 享受美好生活</div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

