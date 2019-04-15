import React, { Component } from 'react';
import { connect } from "dva";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Link from 'umi/link';
import styles from "./Login.css";

const FormItem = Form.Item;

@connect()
class LoginPage extends Component {

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'user/login',
          payload: values
        })
      }
    });
  };


  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <span/>
          </FormItem>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入姓名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="姓名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
              登录
            </Button>
          </FormItem>
          没有账号？<Link to="/user/register" >现在注册!</Link>
        </Form>
      </div>
    );
  }
}

export default Form.create()(LoginPage);
