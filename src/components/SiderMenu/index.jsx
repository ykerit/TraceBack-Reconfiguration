import React, { Component } from "react";
import { connect } from 'dva';
import { Layout } from 'antd';
import Logo from "../Logo/index";
import SiderMenu from "./SiderMenu";
import { selectMenu } from "./MenuSource";
const { Sider } = Layout;


/**
 *侧边选择栏
 *
 * @class SiderMenuWrapper
 * @extends {Component}
 */
class SiderMenuWrapper extends Component {

  state={
    breaks: false,
  };

  setSelectKey = path => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/setSelectKey',
      payload: path
    })
  };

  onBreakpoint = (breaks) => {
    this.setState({breaks: breaks});
    this.props.dispatch({
      type: 'global/toggle',
      payload: breaks
    })
  };

  render() {
    const { isCollapse, selectKey, role } = this.props;

    const menuProps = {
      selectedKey: selectKey, 
      menus: selectMenu(role),
      setSelectKey: this.setSelectKey
    };

    return (
      <Sider
        collapsible
        collapsed={isCollapse}
        theme="light"
        breakpoint="md"
        trigger={null}
        onBreakpoint={(bool) => this.onBreakpoint(bool)}
        collapsedWidth={this.state.breaks ? 0 : 80}
      >
        <Logo isCollapse={isCollapse}/>
        <SiderMenu {...menuProps}/>
      </Sider>
    );
  }
}

export default connect(({ global, user })=>({
  isCollapse: global.isCollapse,
  selectKey: global.selectKey,
  role: user.currentUser.role,
}))(SiderMenuWrapper);
