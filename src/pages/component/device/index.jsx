import React,{ useEffect } from 'react'
import * as echarts from 'echarts';
import axios from "axios"
import { Breadcrumb,Result,Row,Col } from 'antd';
import Devicel from "./leftdev"
import Devicer from "./rightdev"
import {
    HighlightOutlined,
    InfoCircleOutlined

} from '@ant-design/icons';







function Device() {

    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0', fontSize: "20px" }}>
                <Breadcrumb.Item>
                    <HighlightOutlined />
                    <span>
                        设备管理
                            </span>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                    <InfoCircleOutlined />
                    <span>设备信息与组队信息</span>
                </Breadcrumb.Item>
            </Breadcrumb>         

           <Row gutter={[24,12]}>
               <Col span={12}>
                    <Devicel />
               </Col>
               <Col span={12}>
                    <Devicer />
               </Col>
              

           </Row>
        </div>
    )


}
export default Device