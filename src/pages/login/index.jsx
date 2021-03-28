import React from 'react'
import "./login.css"
import { Row, Col } from 'antd';
import Login from "./component/login"


function TLogin() {

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
export default TLogin