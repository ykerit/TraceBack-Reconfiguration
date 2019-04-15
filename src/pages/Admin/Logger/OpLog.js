import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import BasicTable from "../../../components/BasicTable/index";

class OpLog extends Component{
  state = {
    current: null
  };

  // handleDelete = (key, dispatch) => {
  //   dispatch({
  //     type: 'logger/delLog',
  //     payload: key,
  //   })
  // };
  componentDidMount(){
    this.props.dispatch({
      type: 'logger/queryLog',
      payload: {type: 'opLog', pageSize: 1}
    });
  }

  render(){

    const { opLog, op_total, dispatch } = this.props;

    const columns = [{
      title: '用户id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time'
    }, {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip'
    }, {
      title: '原因',
      dataIndex: 'reason',
      key: 'reason'
    }];

    return (
        <BasicTable>
          <Table
            rowKey={record => record.id}
            columns={columns}
            dataSource={opLog}
            pagination={{
              onChange: (page) => {
                this.setState({current: page});
                dispatch({
                  type: 'logger/queryLog',
                  payload: {type: 'opLog', pageSize: page},
                })
              },
              current: this.state.current,
              total: op_total,
              pageSize: 10,
            }}
          />
        </BasicTable>
    );
  }
}

export default connect(({ logger }) => ({
  opLog: logger.opLog,
  opLog_total: logger.opLog_total,
}))(OpLog)

