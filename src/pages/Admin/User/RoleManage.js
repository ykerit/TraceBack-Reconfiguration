import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import FormModal from "../../../components/BasicComponents/FormModal";
import BasicTable from "../../../components/BasicTable/index";

class RoleManage extends Component{

  state = {
    visible: false,
  };

  componentDidMount(){
    this.props.dispatch({
      type: 'usermanage/queryRoles',
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
      // 添加角色
      dispatch({
        type: 'usermanage/createRole',
        payload:values,
      });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  handleDelete = key => {
    console.log(key);
    const { dispatch } = this.props;
    dispatch({
      type: 'usermanage/delRole',
      payload: key,
    })
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render(){

    const { roleData } = this.props;

    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '身份名',
      dataIndex: 'role_name',
      key: 'role_name'
    }, {
      title: '所属权限',
      dataIndex: 'auths',
      key: 'auths'
    }, {
      title: '操作',
      key:'action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
        <Button type="primary">更改</Button>
        <span> | </span>
        <Popconfirm title="确定删除吗" okText="是" cancelText="否" onConfirm={() => this.handleDelete(record.id)}>
          <Button type="danger">删除</Button>
        </Popconfirm>
      </span>
      ),
    }];

    const title = [{title: '身份名', en: 'name'}, {title: '所属权限', en: 'auth'}];
    return (
      <BasicTable text="添加角色" showModal={this.showModal} isButton={true}>
        <FormModal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={() => {this.handleCreate()}}
          wrappedComponentRef={this.saveFormRef}
          title="创建角色"
          data={title}
        />
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={roleData}/>
      </BasicTable>
    );
  }
}

export default connect(({ usermanage }) => ({
  roleData: usermanage.roleData,
}))(RoleManage)
