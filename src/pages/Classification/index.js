import React, { Component } from 'react';
import { connect } from 'dva';
import Collapse from "../../components/BasicComponents/Collapse/collapse";
import style from './index.css';


class ClassificationPage extends Component{

  render() {
    const { classification } = this.props;
    return (
      <div className={style.content}>
        <Collapse data={classification}/>
      </div>
    );
  }
}

export default connect(({ kind }) => ({
  classification: kind.classification
}))(ClassificationPage)
