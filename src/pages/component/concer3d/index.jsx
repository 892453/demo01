import React, { useEffect } from 'react'
import * as echarts from 'echarts';
import 'echarts-gl'
import { Breadcrumb, Result, Row, Col } from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined

} from '@ant-design/icons';
import axios from "axios"
import cookie from 'react-cookies'

function Statistic() {
    useEffect(() => {

        //先进行用户角色的判断，然后决定展示内容
        let role = cookie.load("role")
        //console.log("判断角色："+role)
        if (role !== "true") {
            document.getElementById("mains").style.display = 'none';
            document.getElementById("noaccess").style.display = "display";
        } else {
            document.getElementById("mains").style.display = 'display';
            document.getElementById("noaccess").style.display = "none";
        }
        //用户角色判断完成

        var chartDom = document.getElementById('mains');
        var myChart = echarts.init(chartDom);
        var option;
        axios.get('/concern3d1.json').then(res => {
            console.log(res);
            var data = [[]];
            var dataY = [];
            data = res.data.goals;
            dataY = res.data.name;
            var five = 0;
            var five1 = 0;
            var five2 = 0;
            var five3 = 0;
            var five4 = 0;
            var five5 = 0;
            var five6 = 0;
            var five7 = 0;
            console.log(data);
            var dataX = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320, 325, 330, 335, 340, 345, 350, 355, 360, 365, 370, 375, 380, 385, 390, 395, 400, 405, 410, 415, 420, 425, 430, 435, 440, 445, 450, 455, 460, 465, 470, 475, 480, 485, 490, 495, 500, 505, 510, 515, 520, 525, 530, 535, 540, 545, 550, 555, 560, 565, 570, 575, 580, 585, 590, 595, 600, 605, 610, 615, 620, 625, 630, 635, 640, 645, 650, 655, 660, 665, 670, 675, 680, 685, 690, 695, 700, 705, 710, 715, 720, 725, 730, 735, 740, 745, 750, 755, 760, 765, 770, 775, 780, 785, 790, 795, 800, 805, 810, 815, 820, 825, 830, 835, 840, 845, 850, 855, 860, 865, 870, 875, 880, 885, 890, 895, 900, 905, 910, 915, 920, 925, 930, 935, 940, 945, 950, 955, 960, 965, 970, 975, 980, 985, 990, 995, 1000, 1005, 1010, 1015, 1020, 1025, 1030, 1035, 1040, 1045, 1050, 1055, 1060, 1065, 1070, 1075, 1080, 1085, 1090, 1095, 1100, 1105, 1110, 1115, 1120, 1125, 1130, 1135, 1140, 1145, 1150, 1155, 1160, 1165, 1170, 1175, 1180, 1185, 1190, 1195, 1200, 1205, 1210, 1215, 1220, 1225, 1230, 1235, 1240, 1245, 1250, 1255, 1260, 1265, 1270, 1275, 1280, 1285, 1290, 1295, 1300, 1305, 1310, 1315, 1320, 1325, 1330, 1335, 1340, 1345, 1350, 1355, 1360, 1365, 1370, 1375, 1380, 1385, 1390, 1395, 1400, 1405, 1410, 1415, 1420, 1425, 1430, 1435, 1440, 1445, 1450, 1455, 1460, 1465, 1470, 1475, 1480, 1485, 1490, 1495, 1500, 1505, 1510, 1515, 1520, 1525, 1530, 1535, 1540, 1545, 1550, 1555, 1560, 1565, 1570, 1575, 1580, 1585, 1590, 1595, 1600, 1605, 1610, 1615, 1620, 1625, 1630, 1635, 1640, 1645, 1650, 1655, 1660, 1665, 1670, 1675, 1680, 1685, 1690, 1695, 1700, 1705, 1710, 1715, 1720, 1725, 1730, 1735, 1740, 1745, 1750, 1755, 1760, 1765, 1770, 1775, 1780, 1785, 1790, 1795, 1800, 1805, 1810, 1815, 1820, 1825, 1830, 1835, 1840, 1845, 1850, 1855, 1860, 1865, 1870, 1875, 1880, 1885, 1890, 1895, 1900, 1905, 1910, 1915, 1920, 1925, 1930, 1935, 1940, 1945, 1950, 1955, 1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060, 2065, 2070, 2075, 2080, 2085, 2090, 2095, 2100, 2105, 2110, 2115, 2120, 2125, 2130, 2135, 2140, 2145, 2150, 2155, 2160, 2165, 2170, 2175, 2180, 2185, 2190, 2195, 2200, 2205, 2210, 2215, 2220, 2225, 2230, 2235, 2240, 2245, 2250, 2255, 2260, 2265, 2270, 2275, 2280, 2285, 2290, 2295, 2300, 2305, 2310, 2315, 2320, 2325, 2330, 2335, 2340, 2345, 2350, 2355, 2360, 2365, 2370, 2375, 2380, 2385, 2390, 2395, 2400];
            var vdata = [];
            var sum = dataX.length * dataY.length / 8;
            for (var i = 0; i < dataY.length; i++) {
                vdata[i] = [];   //vdata里面存放的是二维数组
            }
            //将处理完之后的数据存放到 vdata 里面
            for (var t = 0; t < dataY.length; t++) {
                var y = dataY[t];
                for (var k = 0; k < data[0].length; k++) {
                    for (var p = 0; p < dataX.length; p++) {
                        var x = dataX[p];
                        var z = data[t][p];
                        if (dataX[p] < 300) {
                            five += data[t][p];
                        } else if (dataX[p] < 600) {
                            five1 += data[t][p];
                        } else if (dataX[p] < 900) {
                            five2 += data[t][p];
                        } else if (dataX[p] < 1200) {
                            five3 += data[t][p];
                        } else if (dataX[p] < 1500) {
                            five4 += data[t][p];
                        } else if (dataX[p] < 1800) {
                            five5 += data[t][p];
                        } else if (dataX[p] < 2100) {
                            five6 += data[t][p];
                        } else if (dataX[p] <= 2400) {
                            five7 += data[t][p];
                        }
                        vdata[t].push([x, y, z]);
                    }
                    break;
                }
            }
            //雷达图数据
            var arg = [five / sum, five1 / sum, five2 / sum, five3 / sum, five4 / sum, five5 / sum, five6 / sum, five7 / sum];
            console.log(five);
            console.log(five2);
            console.log(five3);
            console.log(five5);
            console.log(sum);
            option = {
                title: {
                    text: '上课各时段学生专注度情况',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',

                    formatter: function (params) {
                        return "姓名: " + params.data[1] + "</br>时间: " + parseInt(params.data[0] / 60) + "分" + params.data[0] % 60 + "秒"
                    },
                },
                grid: {
                    width: '30%',
                    top: 0,
                    left: 0,
                },
                //雷达图样式设定
                radar: {
                    radius: '25%',
                    center: ['80%', '25%'],
                    indicator: [
                        { name: '0:00-5:00', max: 3 },
                        { name: '5:00-10:00', max: 3 },
                        { name: '10:00-15:00', max: 3 },
                        { name: '15:00-20:00', max: 3 },
                        { name: '20:00-25:00', max: 3 },
                        { name: '25:00-30:00', max: 3 },
                        { name: '30:00-35:00', max: 3 },
                        { name: '35:00-40:00', max: 3 },
                    ],
                    name: {
                        fontSize: 12,
                        color: '#191919',
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowBlur: 10
                    },
                    splitNumber: 3,
                    splitArea: {
                        areaStyle: {
                            color: ['#FDDD60', '#58D9F9', '#7CFFB2'],
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            shadowBlur: 10
                        }
                    },
                },
                //3d图区域
                grid3D: {
                    top: '10%',
                    boxDepth: 350,
                    boxWidth: 450,
                    boxHeigth: 15,
                },
                xAxis3D: {
                    type: 'value',
                    name: '时间',
                    data: dataX,
                    interval: 300,
                    max: 2400
                },
                yAxis3D: {
                    name: '姓名',

                    data: dataY,
                    axisLabel: {
                        margin: 10,
                        interval: 0
                    }
                },
                zAxis3D: {
                    name: '专注度情况',
                    min: -15,
                    max: 15,
                    axisLabel: {
                        show: false,
                    }
                },

                visualMap: {
                    max: 3,
                    min: 0,
                    text: ['优秀', '不及格'],
                    inRange: {
                        color: ['#c1232b', '#fcce10', '#0098d9', '#22c3aa']
                    }
                },
                series: [
                    //雷达图
                    {
                        type: 'radar',
                        symbolSize: 0,
                        data: [
                            {
                                value: arg,
                            }
                        ],
                        tooltip: {
                            trigger: 'item',
                            formatter: function (params) { return ""; }
                        },

                        lineStyle: {
                            color: '#c1232b',
                            width: 1.5
                        }
                    },
                    //3d折线图区域
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[0],
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[1]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[2]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[3]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[4]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[5]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[6]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[7]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[8]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[9]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[10]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[11]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[12]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[13]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[14]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[15]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[16]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[17]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[18]
                    },
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[19]
                    },

                ]
            };
            myChart.setOption(option);
        })




        option && myChart.setOption(option);

    })









    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0', fontSize: "20px" }}>
                <Breadcrumb.Item>
                    <HighlightOutlined />
                    <span>
                        统计管理
                            </span>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                    <InfoCircleOutlined />
                    <span>全体学生专注度时间序列</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row justify="center">
                <Col span={23}>
                    <div id="mains" style={{ width: "100%", height: "600px", background: "#DCF5FF" }}></div>
                    <div id="noaccess" style={{ width: "100%", paddingTop: "100px" }}>

                        <Result
                            status="warning"
                            title="抱歉，专注度序列页面只允许老师访问哦！"
                        />
                    </div>
                </Col>
            </Row>

        </div>
    )
}
export default Statistic