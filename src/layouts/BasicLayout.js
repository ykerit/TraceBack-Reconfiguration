import React, {Component} from 'react';
import { Layout } from 'antd';
import {connect} from 'dva';
import SiderMenu from "../components/SiderMenu/index";
import MiddleHeader from "../components/MiddleHeader/index";
import styles from './BasicLayout.css';
import { getlocalStorage } from '@/utils/helper';
const { Content, Footer } = Layout;

class BasicLayout extends Component{
  componentWillMount() {
    if (getlocalStorage('id') !== null) {
      this.props.dispatch({
        type: 'user/queryUserInfo',
        payload: getlocalStorage('id')
      })
    }
  }
  render() {
    const { children  } = this.props;
    return (
      <Layout className={styles.layout}>
        <SiderMenu/>
        <Layout>
          <MiddleHeader/>
          <Content className={ styles.content}>
            { children }
          </Content>
          <Footer className={styles.footer}>
            yker ©2019 Created by school
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


export default connect()(BasicLayout)
