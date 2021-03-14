import React, { useEffect, useState,useRef } from 'react'
import { Breadcrumb,Button } from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined

} from '@ant-design/icons';

import * as echarts from 'echarts/core';
import {
    GridComponent
} from 'echarts/components';
import {
    LineChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

function  Linechart() {
    
    
   
    


    return (
        <div>
            {/* 头部面包屑 */}
            <Breadcrumb style={{ margin: '16px 0', fontSize: "20px" }}>
                <Breadcrumb.Item>
                    <HighlightOutlined />
                    <span>
                        数据分析
                            </span>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                    <InfoCircleOutlined />
                    <span>专注度检测</span>
                </Breadcrumb.Item>
            </Breadcrumb>

            {/* 主体信息 */}
            <div id="main" style={{height:"400px"}}/>
            <Button >开始</Button>
            <Button type="primary" size="large" onClick={sstop}>暂停</Button>

        </div>
    )


}
export default Linechart