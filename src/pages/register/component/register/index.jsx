import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Card, Input,Upload, Button, message,Form,Select } from 'antd';

import { PhoneOutlined, VerifiedOutlined, KeyOutlined, UploadOutlined ,CaretLeftFilled} from '@ant-design/icons';

function Register() {

    const { Option } = Select;

    const [userPhone, setuserPhone] = useState("")
    const [VerCode, setVerCode] = useState("")
    const [PassWord, setPassWord] = useState("")
    const [ConfirmPass, setConfirmPass] = useState("")
    //const [isLoading,setIsLoading] = useState(false)

    const checkRegister = () => {

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
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            {/* <Option value="87">+87</Option> */}
          </Select>
        </Form.Item>
      );
    const clickvercode=()=>{
            console.log("获取验证码的手机号：",userPhone)
    }

    return (
        <div className="register-div">
            

            {/* 注册部分 */}
            <div className="main">
                <div className="return">
                    <CaretLeftFilled />
                    <a href="login">返回登陆</a>
                </div>
                
            <Form  
                style={{textAlign:"center", background:"rgba(153, 153, 161, 0.133)",padding:"20px" }}
            >

                <Form.Item style={{fontSize:"20px",textAlign:"center"}}>
                    系统注册
                </Form.Item>
                <Input
                    id="userphone"
                    size="large"
                    placeholder="输入注册手机号"
                    addonBefore={prefixSelector} style={{ width: '100%' }}     //addonBefor设置标签
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
                    placeholder="输入密码"
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
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>上传头像</Button>
                </Upload>
                <br />
                <Button type="primary" size="large" block onClick={checkRegister}>注册</Button>

            </Form>
            </div>

           

        </div>
    )
}
export default Register