import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Popconfirm, Button } from 'antd';
import FormModal from "../../../components/BasicComponents/FormModal";
import BasicTable from "../../../components/BasicTable/index";


class KindManage extends Component{

  state = {
    visible: false,
    current: null
  };
  componentDidMount(){
    this.props.dispatch({
      type: 'admin/queryKind',
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
      // 添加权限
      dispatch({
        type: 'admin/createKind',
        payload:values,
      });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  handleDelete = key => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/delKind',
      payload: key,
    })
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  render(){

    const { kind, kind_total, dispatch } = this.props;

    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },{
      title: '分类名',
      dataIndex: 'name',
      key: 'name'
    },{
      title: '文章数',
      dataIndex: 'number',
      key: 'number'
    },{
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time'
    }, {
      title: '操作',
      key:'action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
        <Button type="primary">更改</Button>
        <span> | </span>
        <Popconfirm title="确认删除吗?" okText="是" cancelText="否" onConfirm={() => this.handleDelete(record.id)}>
          <Button type="danger">删除</Button>
        </Popconfirm>
      </span>
      ),
    }];

    const title = [{title: '分类名', en: 'name'}];

    return (
      <BasicTable text="添加分类" showModal={this.showModal} isButton={true}>
        <FormModal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={() => {this.handleCreate()}}
          wrappedComponentRef={this.saveFormRef}
          title="创建分类"
          data={title}
        />
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={kind}
          pagination={{
            onChange: (page) => {
              this.setState({current: page});
              dispatch({
                type: 'admin/queryKind',
                payload: page,
              })
            },
            current: this.state.current,
            total: kind_total,
            pageSize: 10,
          }}
        />
      </BasicTable>
    );
  }
}


export default connect(({ admin }) => ({
  kind: admin.kind,
  kind_total: admin.kind_total
}))(KindManage)
