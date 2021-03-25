import React, { useEffect, useState, useRef } from 'react'
import { Breadcrumb, Button } from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined

} from '@ant-design/icons';
import axios from "axios"
import * as echarts from 'echarts';
import "./linechart.css"

function Linechart() {
    const [status, setstatus] = useState(1)
    let prestatus = useRef(status)
    console.log("init")
    let buttonstatus=1
    let tmp=1
    var date=new Date();// 获取系统当前时间
    var yyyy=date.getFullYear();
    var mth=date.getMonth();
    var dd=date.getDate();
    var hh=date.getHours();
    var mm=date.getMinutes();
    var ss=date.getSeconds();
    console.log(yyyy,mth,dd,hh,mm,ss)

    
    var option;
    //初始化线性图形态
    option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '专注度曲线图',
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 20
        }, {
            start: 0,
            end: 20
        }],
        series: [
            {
                name: '专注打分',
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: {},
                data: data
            }
        ]
    };
    
    


    function clickbegin(){
        console.log("click 开始")
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);

    
        var base = +new Date(1988, 9, 3);
        console.log(base)
        var oneDay = 24 * 3600 * 1000;
        var data = [[base, Math.random() * 300]];
        for (var i = 1; i < 20000; i++) {
            var now = new Date(base += oneDay);
            data.push([
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])
            ]);
        }
        console.log(data[[0]])
        option && myChart.setOption(option);
       
    }

    function clickpause() {
        console.log("click 暂停")
        buttonstatus=0
    }

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

            {/* 专注度信息 */}
            <div id="main" style={{ height: "400px" }} />

                    <Button type="primary" size="large" style={{ padding: "1px 15px", margin: "10px"}} onClick={clickbegin}>开始</Button>
                    {/* <Button type="primary" size="large" style={{ padding: "1px 15px", margin: "10px"}} onClick={clickpause}>暂停</Button> */}

            </div>
    )


}
export default Linechart