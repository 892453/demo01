import React, { useState } from 'react'
import "./test.css"
//import img2 from "./bg3.png"

import { Card, Input, Button, Spin } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';


function Test() {
    const [userName, setUserName] = useState("")
    const [PassWord, setPassWord] = useState("")

    const checkLogin = () => {
       
        console.log("账户：", userName)
        console.log("密码：", PassWord)
        setTimeout(() => {
           
        }, 1000)
    }

    return (
        <div>
           test
           
        </div>


    )
}
export default Test