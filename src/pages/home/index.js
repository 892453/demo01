import React from 'react';
import { Row, Col } from "antd"
import Navigate from "./component/navigate"
function Home() {

  

  return (
    <div>
      <Row className="daohang" justify="center">
        <Col sm={24} md={22} lg={20} xl={14}>
            <Navigate />
          
        </Col>
      </Row>
      <Row justify="center" className="zhuye">
        
      </Row>
    </div>
  );
}

export default Home;
