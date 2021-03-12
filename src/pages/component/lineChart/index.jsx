import React, { useEffect, useState,useRef } from 'react'
import { Breadcrumb } from 'antd';
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
    
    useEffect(()=>{
        echarts.use(
            [GridComponent, LineChart, CanvasRenderer]
        );
        
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;
        
        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        };
        
        option && myChart.setOption(option);
    })


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
            <div id="main" style={{width:"400px",height:"400px"}}/>

        </div>
    )


}
export default Linechart