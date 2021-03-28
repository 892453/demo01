import React, { useState } from 'react'
import "./test.css"
import { Row, Col,Card, Input, Button } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import Login from "./login"


function Test() {
    const [userName, setUserName] = useState("")
    const [PassWord, setPassWord] = useState("")


    return (
        <div className="main1">
            <Row style={{height:"100px"}}>

            </Row>
            <Row justify="center" className="row1">
                <Col sm={24} md={10} lg={8} xl={5}  className="col1">
                    <div className="login-box">
                        <Login />
                    </div>
                    
                </Col>
            </Row>
        </div>


    )
}
export default Test