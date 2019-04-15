import React, {Component} from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import FormModal from "../../../components/BasicComponents/FormModal";
import BasicTable from "../../../components/BasicTable/index";

class UserManage extends  Component{
  state = {
    visible: false,
    current: null,
  };

  componentDidMount(){
    this.props.dispatch({
      type: 'usermanage/queryUsers',
      payload: 1
    })
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    const { dispatch } = this.props;
    // 数据验证
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'usermanage/createUser',
        payload: values
      });
      form.resetFields();
      this.setState({ visible: false });
    });
  };
  handleDelete = key => {
    const { dispatch } = this.props;
    dispatch({
      type: 'usermanage/delUser',
      payload: key,
    })
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render(){
    const { userData, dispatch, user_total} = this.props;
    const columns = [{
      title: 'id',
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
      title: '角色',
      dataIndex: 'role',
      key: 'role'
    }, {
      title: '操作',
      key:'action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
        <Button type="primary">更改</Button>
        <span> | </span>
        <Popconfirm title="确定删除?" okText="是" cancelText="否" onConfirm={() => {this.handleDelete(record.id)}}>
          <Button type="danger">删除</Button>
        </Popconfirm>
      </span>
      ),
    }];

    const title = [{title: '姓名', en: 'name'}, {title: '密码', en: 'password'}];

    return (
      <BasicTable text="添加用户" showModal={this.showModal} isButton={true}>
        <FormModal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={() => {this.handleCreate()}}
          wrappedComponentRef={this.saveFormRef}
          title="创建用户"
          data={title}
        />
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={userData}
          pagination={{
            onChange: (page) => {
              this.setState({current: page});
              dispatch({
                type: 'usermanage/queryUsers',
                payload: page,
              })
            },
            current: this.state.current,
            total: user_total,
            pageSize: 10,
          }}
        />
      </BasicTable>
    );
}

}

export default connect(({ usermanage }) => ({
  userData: usermanage.userData,
  user_total: usermanage.user_total,
}))(UserManage)

