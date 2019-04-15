import React, { Component } from "react";
import { Dropdown, Badge, Icon, List, Tabs } from "antd";
import styles from './index.css';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}


class Notice extends Component {

  state = {
    visible: false,
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    const { visible } = this.state;
    const tab = (
      <div className={styles.tabContent}>
        <Tabs 
          defaultActiveKey="1"
          onChange={callback}
          tabBarStyle={{ textAlign: "center", marginBottom: 0 }}
        >
        <TabPane tab="通知" key="1">
          <List/>
        </TabPane>
        <TabPane tab="消息" key="2">
          <List/>
        </TabPane>
        </Tabs>
      </div>
    );

    return (
      <Dropdown 
        overlay={tab} 
        trigger={['click']}
        visible={visible}
        overlayClassName={styles.popover}
        onVisibleChange={this.handleVisibleChange}
        >
        <Badge count={6}>
            <Icon
              style={{fontSize:'20px'}}
              type="bell"
            />
        </Badge>
      </Dropdown>
    );
  }
}

export default Notice;