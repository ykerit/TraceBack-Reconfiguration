import React, {Component} from 'react';
import { connect } from 'dva';
import { Layout, Icon } from 'antd';
import PersonalStatusBar from '../PersonalStatusBar/index'
import styles from './index.css'
const { Header } = Layout;

// 页眉
class MiddleHeader extends Component{

  toggle = () => {
    this.props.dispatch({
      type: 'global/toggle',
      payload: !this.props.isCollapse
    })
  };
    render() {
      const { isCollapse, isMobile } = this.props;
      return (
        <Header className={styles.header}>
          <Icon
            className={styles.trigger}
            type={isCollapse? 'menu-unfold' : 'menu-fold'}
            onClick={() => this.toggle()}
          />
          <PersonalStatusBar
            isMobile={isMobile}
          />
        </Header>
      );
  }
}

export default connect(({ global }) => ({
  isCollapse: global.isCollapse,
  isMobile: global.isMobile,
}))(MiddleHeader);
