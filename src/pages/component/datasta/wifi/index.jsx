import React from 'react';
import { useEffect } from "react";
import * as echarts from "echarts";
import Axios from "axios"
import { IPORT } from "../../../static/ipconfig"

export default function Wifi() {
    //页面初始加载时渲染折线图，并将其放入classname=main的div里
    useEffect(() => {

        var inte;
        var myChart;
        var chartDom = document.getElementById('wifi');
        myChart = echarts.init(chartDom);
        var date = [];
        var data = [0];


        var option;

        var base = +new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
        var oneDay = 3 * 1000;


        option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (pt) {

                    if (pt[0].data == 0) {
                        return "unconcentrated";
                    }
                    if (pt[0].data == 1) {
                        return "neutraul"
                    }
                    if (pt[0].data == 2) {
                        return "concentrate"
                    }
                    if (pt[0].data == 3) {
                        return "abnormal"
                    }

                }
            },

            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 2,
                inRange: {
                    color: ['#c1232b', '#fcce10', '#0098d9', '#22c3aa']
                }
            }],   //沿y轴的渐变

            title: {
                left: 'center',
                text: 'Wifi信号曲线',
            },
            grid: {
                right: '5%',
                bottom: '15%',
                left: '5%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '20%']  //最小值最大值上下方扩展的空间比例
            },
            // //内部的填充数据
            // dataZoom: [{
            //     type: 'inside',
            //     start: 0,
            //     end: 100
            // }, {
            //     start: 0,
            //     end: 10
            // }],
            series: [
                {
                    name: 'wifi信号曲线Ⅰ',
                    type: 'line',
                    symbol: 'none',
                    hoverAnimation: false,
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    data: data
                },
            ]
        };

        option && myChart.setOption(option)

        inte = setInterval(() => {
            var now = new Date(base += oneDay);
            if (date.length >= 20) {
                date.shift()
            }
            date.push([now.getHours(), now.getMinutes(), now.getSeconds()].join(':'));
            Axios.defaults.withCredentials = true; //配置为true
            Axios.get(IPORT + "/attentionresult/getAttentionResultByUserID").then((res) => {
                let result = res.data.result
                if (data.length >= 20) {
                    data.shift()
                }
                if (result != undefined) {
                    console.log("muse:" + result.algorithmDataDto.eegLabel)
                    data.push(result.algorithmDataDto.eegLabel)
                } else {
                    data.push(3)
                }
            }).catch(() => {
                data.push(3)
                console.log("error")
            })
            // Axios.get("http://www.aifixerpic.icu/upload/getpointy").then((res) => {
            //     if (data.length >= 20) {
            //         data.shift()
            //     }
            //     data.push(res.data)
            //     //console.log(res.data)
            // })

            myChart.setOption(option);
        }, 3000);
        return () => {
            console.log("linechart 页面销毁")
            clearInterval(inte)
            myChart.dispose()
        }



    }, [])

    return (
        <div>
            <div id="wifi" style={{ height: '250px', width: '100%' }}></div>
        </div>

    )
}