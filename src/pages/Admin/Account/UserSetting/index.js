import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu } from 'antd';
import BasicSetting from "../../../../components/BasicSetting/BasicSetting";
import styles from './index.css';

const { Item } = Menu;

class UserSetting extends Component {

  state={
    selectKey: 'BasicSetting',
    menuMap: [
      {
        key: 'BasicSetting',
        title: '基础设置'
      },{
        key: 'more',
        title: '更多设置'
      }
    ]
  };

  upCurrentInfo = (val) => {
    const { currentUser } = this.props;
    const { id } = currentUser;
    this.props.dispatch({
      type: 'user/updateCurrentUser',
      payload: {id: id, values: val}
    })
  };

  getmenu = () => {
    const { menuMap } = this.state;
    return menuMap.map(item => <Item key={item.key}>{item.title}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    for (let i = 0; i < menuMap.length; i++) {
      if (menuMap[i].key === selectKey) {
        return menuMap[i].title;
      }
    }
  };

  selectKey = ({ key }) => {
    this.setState({
      selectKey: key,
    });
  };


  render() {
    const { isMobile, currentUser, dispatch } = this.props;
    const { selectKey } = this.state;
    return (
      <div
        className={styles.main}
      >
          <div className={styles.leftMenu}>
            <Menu
              style={{ width: 224 }}
              mode={isMobile ? "horizontal" : "inline"}
              selectedKeys={[selectKey]}
              onClick={this.selectKey}>
              {this.getmenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            <BasicSetting data={currentUser} upCurrentInfo={this.upCurrentInfo} dispatch={dispatch}/>
          </div>
        </div>
    );
  }
}
export default connect(({ user, global }) => ({
  isMobile: global.isMobile,
  currentUser: user.currentUser
}))(UserSetting);

