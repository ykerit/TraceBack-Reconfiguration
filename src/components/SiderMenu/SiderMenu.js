import React, { Component } from 'react';
import router from 'umi/router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

export default class SiderMenu extends Component{

  menuNav = (key) => {
    const { setSelectKey } = this.props;
    router.push(key.key);
    setSelectKey(key.key);
  }

  render(){
    const { menus, selectedKey } = this.props;

    return (
      <Menu
        theme="light"
        mode="inline"
        inlineCollapsed
        selectedKeys={[selectedKey]}
        onClick={key => this.menuNav(key)}
      >
        {
          menus.map(ele => {
            if(ele.child){
              return (
                <SubMenu key={ele.key} title={<span><Icon type={ele.type} /><span>{ele.name}</span></span>}>
                  {ele.child.map(item =>
                    <Menu.Item key={item.key}>
                      <Icon type={item.type} />
                      <span style={{ textAlign: 'center' }}>{item.name}</span>
                    </Menu.Item>
                  )}
                </SubMenu>
              )
            }else {
              return (
                <Menu.Item key={ele.key}>
                  <Icon type={ele.type} />
                  <span style={{ textAlign: 'center' }}>{ele.name}</span>
                </Menu.Item>
              )
            }
          })
        }
      </Menu>
    );
  }
}
