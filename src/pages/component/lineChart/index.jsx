import React, { useEffect, useState, useRef } from 'react'
import { Breadcrumb, Button, Row,Col} from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined

} from '@ant-design/icons';
import axios from "axios"
import * as echarts from 'echarts';
import Draggable from 'react-draggable';
import "./linechart.css"
import Video from "../video"

function Linechart() {

    console.log("init")
    let buttonstatus=1      //按钮状态
    var datay=[];

    var date=new Date();// 获取系统当前时间
    var yyyy=date.getFullYear();
    var mth=date.getMonth();
    var dd=date.getDate();
    var hh=date.getHours();
    var mm=date.getMinutes();
    var ss=date.getSeconds(); 
    console.log(yyyy,mth,dd,hh,mm,ss)

    var inte;
    var myChart;

  

    


    function clickpause(){
        console.log("click 暂停")
        console.log("datay:",datay)
        clearInterval(inte)
      
    }

    function clickbegin() {
        console.log("click 开始")
        buttonstatus=1
        var chartDom = document.getElementById('main');
        if(myChart!=undefined){
            //myChart.clear()
            var date = [];
            data=datay
        }else{
            myChart = echarts.init(chartDom);
            var date = [];
            var data = [0];
            console.log("init data:",data)
        }
        
        
        
       
        
        var option;
        
        var base = +new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(),new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
        var oneDay = 1 * 1000;
       
        
       
        
        option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },

            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: -20,
                max: 30
            }],   //沿y轴的渐变

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
            grid:{
                right: '20%'
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
                    //此处为数据面积图的颜色配置
                    // areaStyle: {
                    //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //         offset: 0,
                    //         color: 'rgb(255, 158, 68)'
                    //     }, {
                    //         offset: 1,
                    //         color: 'rgb(255, 70, 131)'
                    //     }])
                    // },
                    data: data
                }
            ]
        };
            
            option && myChart.setOption(option)

            inte = setInterval(() => {
            var now = new Date(base += oneDay);
            date.push([now.getHours(), now.getMinutes(), now.getSeconds()].join(':'));
            axios.get("http://www.aifixerpic.icu/upload/getpointy").then((res)=>{
                data.push(res.data)
                datay.push(res.data)
            })
           // console.log("画图的data",data)
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

                
                    <Row> 
                        <Col span={3}>
                            <Button type="primary" size="large" style={{ padding: "1px 15px", margin: "10px"}} onClick={clickbegin}>开始</Button>
                        </Col>
                        <Col span={3}>
                            <Button type="primary" size="large" style={{ padding: "1px 15px", margin: "10px"}} onClick={clickpause}>暂停</Button>
                        </Col>

                        <Col span={8}> 
                            <Draggable><Video /></Draggable>
                        </Col>
                       
                    </Row>
                

                    
                    

            </div>
    )


}
export default Linechart