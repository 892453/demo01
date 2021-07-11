import React from 'react';
import {Row,Col} from "antd"
import "./index.css"
import Concern from "./concern"     //专注度信息
import Muse from "./muse"           //muse头戴设备信息
import Wifi from "./wifi"

export default function DataSta(){
    return (
        <div>
            <Row gutter={[0,16]} justify="center" style={{marginTop:"20px"}}>
                <Col span={24}>
                    <div id="datasta"><Concern /></div>
                </Col>
            </Row>
            <Row gutter={[0,16]} style={{marginTop:"20px"}}>
                <Col span={24}>
                    <div id="datasta"><Muse /></div>
                </Col>
            </Row>
            <Row gutter={[0,16]} style={{marginTop:"20px"}}>
                <Col span={24}>
                    <div id="datasta"><Wifi /></div>
                </Col>
            </Row>
        </div>
    )
}