import React, { useState } from 'react'
import 'antd/dist/antd.css';
import {  Input,Upload, Button, message,Form,Select } from 'antd';
import axios from "axios"
//import Qs from 'qs'

import { PhoneOutlined, VerifiedOutlined, KeyOutlined, UploadOutlined ,CaretLeftFilled} from '@ant-design/icons';

function Register() {

    const { Option } = Select;

    const [userPhone, setuserPhone] = useState("")
    const [VerCode, setVerCode] = useState("")
    const [PassWord, setPassWord] = useState("")
    const [ConfirmPass, setConfirmPass] = useState("")
    //const [isLoading,setIsLoading] = useState(false)

    const checkRegister = () => {

        console.log("手机号：", userPhone,typeof(userPhone))
        console.log("验证码：", VerCode,typeof(VerCode))
        console.log("密码：", PassWord,typeof(PassWord))
        console.log("确认密码：", ConfirmPass)
        axios({	
            method:'post',
            url:"http://120.27.236.223:9000/login/register",
            data:{
                "phone":userPhone,
                "code":VerCode,
                "userName":"A"+userPhone,
                "password":PassWord
            },
            header:{
                'Content-Type':'application/json'  //如果写成contentType会报错
            }
            
        }).then(res => {
            console.log("res:",res.data)
            if(res.data.success===true){
               message.info("注册成功！",2)
            }else if(res.data.success===false){
                message.error('注册失败'+res.data,2);
            }
          })
          .catch(error => {
            message.error('未知错误 '+error,4);
          })

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
        console.log("获取验证码的手机号：",userPhone,typeof(userPhone))
            axios({	
                method:'get',
                url:"http://120.27.236.223:9000/sms/sendCode",
                params:{
                    "phone":userPhone,
                }
            }).then(res => {
                console.log("res:",res.data)
                if(res.data.success===true){
                   message.info("验证码已经发送！",2)
                }else if(res.data.success===false){
                    message.error('获取失败',2);
                }
              })
              .catch(error => {
                message.error('未知错误 '+error,4);
              })
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