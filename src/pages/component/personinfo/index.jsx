import React  from 'react'
import { Row, Col } from 'antd';
//import Draggable from 'react-draggable';
import "./linechart.css"
import Video from "../video"
import Head from "../head"

function Linechart() {

    return (
        <div>

            <Row justify="center" gutter={[48, 16]}>
                <Col span={10}>
                   <Video />
                </Col>
                <Col span={10}>
                    <Head />
                </Col>
            </Row>

        </div>
    )

}
export default Linechart