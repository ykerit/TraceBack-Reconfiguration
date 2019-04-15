import React, {Component} from 'react';
import { Layout } from 'antd';
import {connect} from 'dva';
import ForegroundHeader from "../components/ForegroundHeader/index";
import Footer from "./Footer";
import styles from "./GeneralLayout.css";

const { Content } = Layout;


/**
 *前台通用布局
 *
 * @class GeneralLayout
 * @extends {Component}
 */
class GeneralLayout extends Component{
  
  render() {
    const { children  } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <ForegroundHeader/>
        <Content className={styles.container}>
        <div className={styles.content}>
          { children }
        </div>
        </Content>
        <Footer/>
      </Layout>
    );
  }
}


export default connect()(GeneralLayout)
