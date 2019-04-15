import React, { Component } from 'react';
import { connect } from 'dva';

class About extends Component{
  render() {
    return (
      <div>
        for me
      </div>
    );
  }
}

export default connect()(About)
