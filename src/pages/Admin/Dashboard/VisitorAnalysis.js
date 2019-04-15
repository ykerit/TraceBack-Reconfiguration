import React, { Component } from 'react';
import { CardPanel } from "../../../components/CardPanel/index";
import { PanelGroup } from "../../../components/PanelGroup/index";

/**
 * Routes:
 *   - ./routes/Authorized.js
 */
class VisitorAnalysis extends Component{

  render(){
    const data = [
      {
        title: '不爱静香的哆啦A梦',
      },
      {
        title: '半夜钓鱼的小明',
      },
      {
        title: '锡纸烫的村口大爷',
      },
      {
        title: '走中路的打野',
      }
    ];
    return (
      <div>
        <PanelGroup/>
        <CardPanel data={data}/>
      </div>
    );
  }
}

export default VisitorAnalysis;
