import React from 'react'
import 'antd/dist/antd.css';
import { Row, Col} from 'antd';

import './register.css';
import Register from "./component/register"


function TRegister() {

    return (
        <div className="register-div">
            <Row style={{height:"100px"}}>

            </Row>
            <Row justify="center" className="row1">
                <Col sm={24} md={10} lg={8} xl={5}  className="col1">
                    <div className="rigister-box">
                        <Register />
                    </div>
                    
                </Col>
            </Row>
        </div>
    )
}
export default TRegister