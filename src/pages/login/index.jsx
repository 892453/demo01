import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Card, Input, Button, message } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import './login.css';
import axios from "axios"
import Qs from 'qs'
import { useHistory } from 'react-router-dom';  //实现登录成功后的页面跳转
import cookie from 'react-cookies'              //存储登录信息到cookie

function Login() {
    const [userName, setUserName] = useState("")
    const [PassWord, setPassWord] = useState("")
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

    const checkLogin = () => {
       
        if(userName==="" || PassWord===""){
            message.warning('用户名或密码均不能为空！');
            return;
        }
        console.log("账户："+userName+"   密码："+PassWord+"请求登录")
        axios({	
            method:'post',
            url:"http://www.aifixerpic.icu/upload/login",
            data:Qs.stringify({
                "username": userName,
                "password":PassWord,
            })
        }).then(res => {
            console.log("res:",res.data)
            if(res.data==="success"){
                console.log("cookie到期时间"+inFifteenMinutes)
                cookie.save('user',userName, { path: '/',expires:inFifteenMinutes})
                //cookie.save('pass',PassWord, { path: '/' })
                message.success('登录成功,跳转主页...',4);
                history.push('/');
            }else if(res.data==="fail"){
                message.error('登录失败，请检查用户名或密码',4);
            }
            
        })
    
    }

    return (
        <div>
            {/* 顶部 */}
            <div id="header">
                <div className="head">

                </div>
            </div>

            {/* 中间部分 */}
            <div className="main">
                <Card title="系统登录" bordered={true} style={{ width: 400, textAlign: "center" }}>
                    <Input
                        id="username"
                        size="large"
                        placeholder="输入账户"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="输入密码"
                        prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setPassWord(e.target.value) }}
                    />
                    <br />
                    <a href="register" style={{ margin: "10px 40px", float: "left" }}>立即注册</a>
                    <a href="findpass" style={{ margin: "10px 40px", float: "right" }}>忘记密码</a>
                    <Button type="primary" size="large" block onClick={checkLogin}>登录</Button>
                </Card>
            </div>
            {/* 底部 */}
            <div className="footer">

            </div>


        </div>

    )
}
export default Login