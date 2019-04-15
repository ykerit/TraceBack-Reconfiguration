import React, { Component } from 'react';
import {connect} from 'dva';
import Link from 'umi/link';
import { Icon, Menu, Layout, Dropdown } from 'antd';
import Logo from "../Logo/index";
import styles from "./index.css";
const { Header } = Layout;

const SubMenu = Menu.SubMenu;

class ForegroundHeader extends Component{

  constructor(props) {
    super(props);
    if (window.matchMedia("(max-width: 480px)").matches) {
      props.dispatch({
        type: 'global/isMobile',
        payload: true,
      });
    }
  }

  render() {
  const {isAuthorization, isMobile, selectKey } = this.props;
    // 个人中心菜单
    const AuthMenu = (
      <SubMenu title={<span className="submenu-title-wrapper"><Icon type="idcard" />个人</span>}>
        <Menu.Item>
          <Link to="/user/login"><Icon type="thunderbolt"/>登录</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/user/register"><Icon type="user-add"/>注册</Link>
        </Menu.Item>
      </SubMenu>
    );
    // 登录状态个人菜单
    const AdminMenu = (
      <SubMenu title={<span className="submenu-title-wrapper"><Icon type="idcard" />个人</span>}>
        <Menu.Item>
          <Link to={selectKey}><Icon type="appstore"/>后台</Link>
        </Menu.Item>
      </SubMenu>
    );
    // mobile菜单
    const DropdownMenuBar = (
      <Menu
      >
        <Menu.Item>
          <Link to="/index"><Icon type="home" />首页</Link>
        </Menu.Item>
        {!isAuthorization ? AuthMenu : AdminMenu}
        <Menu.Item>
          <Link to="/classification"><Icon type="book"/>分类</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/filed"><Icon type="paper-clip"/>归档</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/tags"><Icon type="tags" />标签</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/about"><Icon type="user"/>关于</Link>
        </Menu.Item>
      </Menu>
    );
    // 普通菜单
    const MenuBar = (
      <Menu
        mode="horizontal"
        style={{ lineHeight: '64px', fontSize: 18}}
      >
        <Menu.Item>
          <Link to="/Index"><Icon type="home" />首页</Link>
        </Menu.Item>
        {!isAuthorization ? AuthMenu : AdminMenu}
        <Menu.Item>
          <Link to="/Classification"><Icon type="book"/>分类</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/Filed"><Icon type="paper-clip"/>归档</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/Tags"><Icon type="tags" />标签</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/About"><Icon type="user"/>关于</Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className={styles.header}>
        <Logo/>
        {
          isMobile ? (
          <Dropdown
            overlay={DropdownMenuBar}
            trigger={['click']}
          >
            <div className={styles.dropDown}>
              <Icon type="bars" style={{fontSize: 24 }}/>
            </div>
          </Dropdown>) : (
            MenuBar
          )
        }
      </Header>
    );
  }
}

export default connect(({global, user}) => ({
  isMobile: global.isMobile,
  selectKey: global.selectKey,
  isAuthorization: user.currentUser.isAuthorization
}))(ForegroundHeader);
