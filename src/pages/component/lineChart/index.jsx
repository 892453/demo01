import React, { useEffect, useState, useRef } from 'react'
import { Breadcrumb, Button } from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined

} from '@ant-design/icons';

import * as echarts from 'echarts';

function Linechart() {
    const [status, setstatus] = useState(1)
    let prestatus = useRef(status)
    console.log("init")

    useEffect(() => {
        console.log("组件挂载更新")

        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;

        // 初始化x轴，y轴坐标
        var xAxisData = [];
        var yAxisData = [];
        for (var i = 60; i > 0; i--) {
            xAxisData.push(i + "秒前");
        }
        for (i = 1; i < 61; i++) {
            yAxisData.push(null);
        }
        console.log("x:", xAxisData)
        console.log("y:", yAxisData)

        //初始化线性图形态
        option = {
            title: {
                text: '专注度情况'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
            },
            xAxis: {
                type: 'category',
                data: xAxisData
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: yAxisData,
                type: 'line',
                //smooth: true
            }]
        };

        //判断当前按钮状态status，status==0时就暂停渲染，status==1时就一直更新渲染
        console.log("当前status:", status)
        console.log("当前prestatus:", prestatus)
        if (status === 1) {
            option && myChart.setOption(option);
            function addnode() {
                yAxisData.push(Math.round(Math.random() * 1000));
                if (yAxisData.length > 60) {
                    yAxisData.shift();
                }
                myChart.setOption(option);
            }
            var int = setInterval(function () {
                addnode()
            }, 1000/5); //1000除的数字代表帧数，即每秒钟添加的点（更新的次数）
        }

        //当有setstatus（）执行时，上一轮的useEfeect生命周期即将结束，执行return函数，clearInterval（int）清除设置的间隔执行
        return () => {
            console.log("组件即将卸载")
            clearInterval(int);
        }

        /** 使用requestAnimationFrame函数绘制折线图
         * 
     *    function addnode() {
            yAxisData.push(Math.round(Math.random() * 1000));
            if (yAxisData.length > 60) {
                yAxisData.shift();
            }
            myChart.setOption(option);
            requestAnimationFrame(addnode);
        }    
            setInterval(() => {
                requestAnimationFrame(addnode);
            }, 1000 / 1)
     */


    })

    function clickpause() {
        console.log("click 暂停")
        setstatus(0)
    }
    function clickreset() {
        console.log("click 重置")
        setstatus(1)
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

            {/* 主体信息 */}
            <div id="main" style={{ height: "400px" }} />
            <Button type="primary" size="large" onClick={clickreset}>重置</Button>
            <Button type="primary" size="large" onClick={clickpause}>暂停</Button>

        </div>
    )


}
export default Linechart