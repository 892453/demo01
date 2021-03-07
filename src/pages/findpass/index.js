import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Card, Input,Upload, Button, message } from 'antd';
import { PhoneOutlined, VerifiedOutlined, KeyOutlined, UploadOutlined } from '@ant-design/icons';
import './findpass.css';

function FindPass() {

    const [userPhone, setuserPhone] = useState("")
    const [VerCode, setVerCode] = useState("")
    const [PassWord, setPassWord] = useState("")
    const [ConfirmPass, setConfirmPass] = useState("")
    //const [isLoading,setIsLoading] = useState(false)

    const checkRegister = () => {
        //test
        console.log("手机号：", userPhone)
        console.log("验证码：", VerCode)
        console.log("密码：", PassWord)
        console.log("确认密码：", ConfirmPass)

    };

    const props = {
        beforeUpload: file => {
            if (file.type !== 'image/png') {
                message.error(`${file.name} is not a png file`);
            }
            return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
        },
        onChange: info => {
            console.log(info.fileList);
        },
    };
    const clickvercode=()=>{
            console.log("获取验证码的手机号：",userPhone)
    }

    return (
        <div className="findpass-div">

            <Card title="找回密码" bordered={true} style={{ width: 400,textAlign:"center"}}>
                <Input
                    id="userphone"
                    size="large"
                    placeholder="输入注册手机号"
                    prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={(e) => { setuserPhone(e.target.value) }}
                />
                <Button type="link" style={{ margin: "10px 0px" }} onClick={clickvercode}>点击获取验证码</Button>
                <Input
                    id="vercode"
                    size="large"
                    placeholder="输入验证码"
                    prefix={<VerifiedOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={(e) => { setVerCode(e.target.value) }}
                />
                <br /><br />
                <Input.Password
                    id="password"
                    size="large"
                    placeholder="输入修改密码"
                    prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={(e) => { setPassWord(e.target.value) }}
                />
                <br /><br />
                <Input.Password
                    id="confirmpass"
                    size="large"
                    placeholder="再次输入密码"
                    prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={(e) => { setConfirmPass(e.target.value) }}
                />
                <br /> <br />
                
                <Button type="primary" size="large" block onClick={checkRegister}>修改密码</Button>

            </Card>

        </div>
    )
}
export default FindPass