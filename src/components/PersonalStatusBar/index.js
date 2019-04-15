import React, {Component} from 'react';
import { Avatar, Icon, Menu, Dropdown} from 'antd';
import {connect} from 'dva'
import router from 'umi/router';
import Notice from '../../components/Notice/index';
import {getlocalStorage} from "../../utils/helper";
import styles from './index.css'

function logout(dispatch) {
  dispatch({
    type: 'user/logout'
  });
}

function backHome() {
  router.push('/index')
}

function _renderName(name, is_authorization) {
  if (getlocalStorage('name') !== null && is_authorization){
    return 'Hi! ' + getlocalStorage('name');
  } else if (name !== null){
    return 'Hi! ' + name;
  }
  return '未登录'
}

class PersonalStatusBar extends Component{

  selectMenu = ({ key }) => {
    const { dispatch } = this.props;
    console.log(key);
    if (key === '/admin/account/center' || key === '/admin/account/setting') {
      router.push(key);
      dispatch({
        type: 'global/setSelectKey',
        payload: key
      });
    }
  };

  render() {
    const { dispatch, isMobile, currentUser } = this.props;
    const { face, name, isAuthorization } = currentUser;
    const DropdownList = (
      <Menu
        onClick={this.selectMenu}
      >
        <Menu.Item key='user'>
          <Icon type='user'/>
          {_renderName(name, isAuthorization)}
        </Menu.Item>
        <Menu.Item
          key='home'
          onClick={() => backHome(dispatch)}
        >
          <Icon type="home" />首页
        </Menu.Item>
        <Menu.Item
          key='/admin/account/center'
        >
          <Icon type='edit'/>
          个人中心
        </Menu.Item>
        <Menu.Item
          key='/admin/account/setting'
        >
          <Icon type='setting'/>
          个人设置
        </Menu.Item>
        <Menu.Item
          key='logout'
          onClick={() => logout(dispatch)}
        >
          <Icon type='logout'/>
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.content}>
        <div className={styles.news}>
          <Notice/>
        </div>
        <div className={styles.dropDown}>
          <Dropdown
            overlay={DropdownList}
            trigger={[isMobile ? 'click' : 'hover']}
          >
            <div>
              <Avatar
                size='large'
                src={face}
              />
              <Icon
                style={{color:'rgba(0,0,0,.3)'}}
                type="caret-down"
              />
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}


export default connect(({ user }) => ({
  currentUser: user.currentUser,  
}))(PersonalStatusBar);
