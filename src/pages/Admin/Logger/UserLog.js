import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import BasicTable from "../../../components/BasicTable/index";

class UserLog extends Component{

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
      payload: {type: 'userLog', pageSize: 1}
    });
  }

  render(){

    const { userLog, userLog_total, dispatch } = this.props;

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
          dataSource={userLog}
          pagination={{
            onChange: (page) => {
              this.setState({current: page});
              dispatch({
                type: 'logger/queryLog',
                payload: {type: 'userLog', pageSize: page},
              })
            },
            current: this.state.current,
            total: userLog_total,
            pageSize: 10,
          }}
        />
      </BasicTable>
    );
  }
}


export default connect(({ logger }) => ({
  userLog: logger.userLog,
  userLog_total: logger.userLog_total,
}))(UserLog)
