import React from 'react';
import {Row,Col} from "antd"
import "./index.css"
import Head from "./head"           //头部姿态
import Concern from "./concern"     //专注度信息
import SkePoint from "./skepoint"   //骨骼点信息
import Muse from "./muse"           //muse头戴设备信息
import Picture from "./picture"     //图像信息
import KeyMouse from "./keymouse"   //键盘鼠标信息
export default function DataSta(){
    return (
        <div>
            <Row gutter={[48,16]} style={{marginTop:"20px"}}>
                <Col span={6}>
                    <div id="datasta"><Head /></div>
                    
                </Col>
                <Col span={12}>
                    <div id="datasta"><Concern /></div>
                    
                </Col>
                <Col span={6}>
                    <div id="datasta"><SkePoint/></div>
                    
                </Col>
            </Row>
            <Row gutter={[48,16]} style={{marginTop:"20px"}}>
                <Col span={6}>
                    <div id="datasta"><Muse/></div>
                    
                </Col>
                <Col span={12}>
                    <div id="datasta"><Picture/></div>
                    
                </Col>
                <Col span={6}>
                    <div id="datasta"><KeyMouse/></div>
                    
                </Col>
            </Row>
        </div>
    )
}