import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Card, Input ,Button ,Spin } from 'antd';
import { KeyOutlined, UserOutlined} from '@ant-design/icons';
import './login.css';

function Login() {
    const [userName,setUserName] = useState("")
    const [PassWord,setPassWord] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const checkLogin = ()=>{
        setIsLoading(true)
        console.log("账户：",userName)
        console.log("密码：",PassWord)
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }

    return (
        <div className="login-div">
            <img class="mainbg" src="../static/images/bg1.png" alt="logo"></img>
            <Spin tip="loading..." spinning={isLoading}>
                <Card title="系统登录" bordered={true} style={{width:400}}>
                    <Input
                        id="username"
                        size="large"
                        placeholder="输入账户"
                        prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}}/>}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="输入密码"
                        prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassWord(e.target.value)}}
                    />
                    <br/>
                    <a href="register" style={{margin:"10px 40px",float:"left"}}>立即注册</a>
                    <a href="findpass" style={{margin:"10px 40px",float:"right"}}>忘记密码</a>
                    <Button type="primary" size="large" block onClick={checkLogin}>登录</Button>

                </Card>
            </Spin>

        </div>
    )
} 
export default Login