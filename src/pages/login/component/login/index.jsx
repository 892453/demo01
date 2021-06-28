import React, { useEffect }  from 'react'
import { Form, Input, Button ,message,Checkbox } from 'antd';
import {  UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "axios"
import Qs from 'qs'
import { useHistory } from 'react-router-dom';  //实现登录成功后的页面跳转
import cookie from 'react-cookies'              //存储登录信息到cookie

function Loginn() {

    let history = useHistory();
    let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000);//设置cookie有效期：一天

    useEffect(()=>{
        //通过读取cookie信息，判断用户是否已经登录。
        //有登录信息-->跳转主页
        //无登录信息-->先登录
        let user=cookie.load("user")
        console.log("查看cookile信息user:",user)
        if (user!=null){
            console.log("有cookie，自动跳转至主页")
            history.push('/');
            message.info("您已登录，自动跳转至主页")
        }
    })

  
    const onFinish = (values) => {
      console.log('登录信息：', values);
      axios({	
        method:'post',
        //url:"http://www.aifixerpic.icu/upload/login",
        url:"http://120.27.236.223:9000//login/login",
        data:{
            "loginAccount": values.username,
            "password":values.password,
        },
        header:{
          'Content-Type':'application/json'  //如果写成contentType会报错
        }
    }).then(res => {
        console.log("res:",res.data)
        if(res.data.success===true){
            //console.log("cookie到期时间"+inFifteenMinutes)
            cookie.save('user',values.username, { path: '/',expires:inFifteenMinutes})
            cookie.save('role',values.role, { path: '/',expires:inFifteenMinutes})
            //cookie.save('pass',PassWord, { path: '/' })
            message.success('登录成功,跳转主页...',4);
            history.push('/');
        }else if(res.data.success===false){
            message.error('登录失败，请检查用户名或密码',4);
        }
      })
      .catch(error => {
        message.error('登陆失败 '+error,4);
      })
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

      <Form.Item name="role" valuePropName="checked" style={{textAlign:"center"}}>
          <Checkbox>教师登录</Checkbox>
      </Form.Item>

      <Form.Item>
        <a className="login-form-forgot" href="findpass" style={{ marginLeft: "30px", float: "left" }}> 忘记密码</a>
        <a href="/register" style={{ marginRight: "30px", float: "right" }}>立即注册</a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block>
          登录
      </Button>
      </Form.Item>
    </Form>

  );
}

export default Loginn;