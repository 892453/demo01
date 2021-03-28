import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import {  UserOutlined, LockOutlined } from '@ant-design/icons';

function Login() {

  
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    }
  
  return (

    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{padding:"20px" , background:"rgba(153, 153, 161, 0.133)" }}
     
    >
      <Form.Item style={{fontSize:"20px",textAlign:"center"}}>
        系统登录
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '用户名不能为空!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '密码不能为空!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <a className="login-form-forgot" href="" style={{ marginLeft: "30px", float: "left" }}> 忘记密码</a>
        <a href="" style={{ marginRight: "30px", float: "right" }}>立即注册</a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block>
          登录
      </Button>
      </Form.Item>
    </Form>

  );
}

export default Login;
