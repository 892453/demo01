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

    var data=[];

  

    


    function clickpause(){
        console.log("click 暂停")
        
        
      
    }

    function clickbegin() {
        console.log("click 开始")
        buttonstatus=1
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;
        
        var base = +new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(),new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
        var oneDay = 1 * 1000;
        var date = [];
        
        var data = [0];
        
       
        
        option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '专注度-时间曲线',
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
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 10
            }],
            series: [
                {
                    name: '专注度评分',
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    },
                    data: data
                }
            ]
        };

        setInterval(() => {
            var now = new Date(base += oneDay);
            date.push([now.getHours(), now.getMinutes(), now.getSeconds()].join(':'));
            axios.get("http://www.aifixerpic.icu/upload/getpointy").then((res)=>{
                data.push(res.data)
            })
            myChart.setOption(option);
        }, 1000);
        
       
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
                    <Button type="primary" size="large" style={{ padding: "1px 15px", margin: "10px"}} onClick={clickpause}>暂停</Button>

            </div>
    )


}
export default Linechart