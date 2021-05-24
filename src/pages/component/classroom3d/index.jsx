import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts';
import 'echarts-gl'
import { Breadcrumb, Statistic, Card, Row, Col, Result } from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons';
import axios from "axios"
import "./classroom3d.css"
import cookie from 'react-cookies'
function Classroom3d() {
    //usestate来同步值
    const [maxstudentdata, setmaxstudentdata] = useState([]);
    const [maxstudent, setmaxstudent] = useState([]);
    const [minstudentdata, setminstudentdata] = useState([]);
    const [minstudent, setminstudent] = useState([]);
    const [maxstudentdata2, setmaxstudentdata2] = useState([]);
    const [maxstudent2, setmaxstudent2] = useState([]);
    const [minstudentdata2, setminstudentdata2] = useState([]);
    const [minstudent2, setminstudent2] = useState([]);
    const [maxstudentdata3, setmaxstudentdata3] = useState([]);
    const [maxstudent3, setmaxstudent3] = useState([]);
    const [minstudentdata3, setminstudentdata3] = useState([]);
    const [minstudent3, setminstudent3] = useState([]);
    useEffect(() => {

        //先进行用户角色的判断，然后决定展示内容
        let role = cookie.load("role")
        //console.log("判断角色："+role)
        if (role !== "true") {
            document.getElementById("mains").style.display = 'none';
            document.getElementsByClassName("site-statistic-demo-card")[0].style.display="none"
            document.getElementById("noaccess").style.display = "display";
        } else {
            document.getElementById("mains").style.display = 'display';
            document.getElementById("noaccess").style.display = "none";
        }
        //用户角色判断完成

        var chartDom = document.getElementById('mains');
        var myChart = echarts.init(chartDom);
        var option;
        var data = [[]]
        var hours = ['第一列', '第二列', '第三列', '第四列'];
        var days = ['第一排', '第二排', '第三排', '第四排', '第五排'];

        axios.get('/classroom3d.json').then(res => {
            console.log(res);
            data = res.data;
            var max = 0;
            var maxname = '';
            var min = 101;
            var minname = '';
            var max2 = 0;
            var max2name = '';
            var min2 = 102;
            var min2name = '';
            var max3 = 0;
            var max3name = '';
            var min3 = 103;
            var min3name = '';
            var you = 0;
            var liang = 0;
            var zhong = 0;
            var cha = 0;
            console.log(data);
            //计算出各个分数段的人数和最高分最低分
            for (var i = 0; i < data.length; i++) {
                if (data[i][2] > max) {
                    max3 = max2;
                    max3name = max2name;
                    max2 = max;
                    max2name = max2name;
                    max = data[i][2];
                    maxname = data[i][3];
                } else if (data[i][2] > max2) {
                    max3 = max2;
                    max3name = max2name;
                    max2 = data[i][2];
                    max2name = data[i][3];
                } else if (data[i][2] > max3) {
                    max3 = data[i][2];
                    max3name = data[i][3];
                }
                if (data[i][2] < min) {
                    min3 = min2;
                    min3name = min2name;
                    min2 = min;
                    min2name = minname;
                    min = data[i][2];
                    minname = data[i][3];
                } else if (data[i][2] < min2) {
                    min3 = min2;
                    min3name = min2name;
                    min2 = data[i][2];
                    min2name = data[i][3];
                } else if (data[i][2] < min3) {
                    min3 = data[i][2];
                    min3name = data[i][3];
                }
                if (data[i][2] >= 90) {
                    you++;
                } else if (data[i][2] >= 80) {
                    liang++;
                } else if (data[i][2] >= 60) {
                    zhong++;
                } else {
                    cha++;
                }
            }
            console.log(max)
            console.log(max2)
            console.log(max3)
            /*  var student = {
                   "maxone" : maxname,
                   "maxpoint" : max,
                   "minone" : minname,
                   "minpoint" : min
              };*/

            setmaxstudentdata(max);
            setmaxstudent(maxname);
            setminstudentdata(min);
            setminstudent(minname);
            setmaxstudentdata2(max2);
            setmaxstudent2(max2name);
            setminstudentdata2(min2);
            setminstudent2(min2name);
            setmaxstudentdata3(max3);
            setmaxstudent3(max3name);
            setminstudentdata3(min3);
            setminstudent3(min3name);
            //将分数分为四类
            var piedata = [[cha, '差'], [zhong, '中'], [liang, '良'], [you, '优']];
            //echarts部分
            option = {
                tooltip: {

                },
                legend: {
                    left: 'center',

                },
                visualMap: {
                    max: 100,
                    min: 60,
                    text: ['优秀', '不及格'],
                    inRange: {
                        color: ['#FD6E76', '#FDDD60', '#58D9F9', '#7CFFB2']
                    },
                    id: 3
                },
                xAxis3D: {
                    type: 'category',
                    data: hours,
                    name: '讲台'
                },
                yAxis3D: {
                    type: 'category',
                    data: days,
                    name: '教室侧面'
                },
                zAxis3D: {
                    type: 'value',
                    name: '课堂打分'
                },
                //3d柱状图区域
                grid3D: {
                    id: 3,
                    top: '15%',
                    boxWidth: 200,
                    boxDepth: 80,

                    light: {
                        main: {
                            intensity: 1.2
                        },
                        ambient: {
                            intensity: 0.3
                        }
                    },

                },
                //扇形图的区域
                grid: {
                    width: '30%',
                    top: 0,
                    left: 0,
                },
                series: [
                    {
                        name: '整体分数',
                        top: 0,
                        type: 'pie',
                        radius: '25%',
                        center: ['50%', '20%'],
                        tooltip: {
                            type: 'item',
                            formatter: function (params) {
                                return "评分： " + params.data.name + "</br>人数： " + params.data.value;
                            },
                        },
                        itemStyle: {
                            color: function (params) {
                                var colorList = ['#FD6E76', '#FDDD60', '#58D9F9', '#7CFFB2'];
                                return colorList[params.dataIndex]
                            }
                        },
                        //防止饼状图的数据颜色是visualMap
                        data: piedata.map(function (item) {
                            return {
                                value: item[0],
                                name: item[1],
                                visualMap: false,
                            }
                        }),

                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        type: 'bar3D',

                        data: data.map(function (item) {
                            return {
                                value: [item[0], item[1], item[2]],
                                name: item[3],

                            }
                        }),
                        shading: 'lambert',
                        tooltip: {
                            type: 'axis',
                            formatter: function (params) {
                                return "姓名: " + params.data.name + "</br>课堂打分: " + params.data.value[2]
                            },
                        },


                        label: {
                            show: false,
                            fontSize: 16,
                            borderWidth: 1,
                        },

                        itemStyle: {
                            opacity: 0.8
                        },

                        emphasis: {
                            label: {
                                fontSize: 20,
                                color: '#900'
                            },
                            itemStyle: {
                                color: '#900'
                            }
                        }
                    }
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
                    <span>教室整体打分情况</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row justify="center">
                <Col span={23}>
                    <div id="mains" style={{ width: "100%", height: "600px", background: "#DCF5FF" }}></div>
                    <div id="noaccess" style={{ width: "100%" }}>
                        <Result
                            status="warning"
                            title="抱歉，整体打分页面只允许老师访问哦！"
                        />
                    </div>
                </Col>
            </Row>

            <div className="site-statistic-demo-card">
                <Row gutter={16}>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="课堂高分"
                                value={maxstudent + "      分数: " + maxstudentdata + "分"}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="课堂低分"
                                value={minstudent + "     分数: " + minstudentdata + "分"}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}

                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                value={maxstudent2 + "      分数: " + maxstudentdata2 + "分"}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}

                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                value={minstudent2 + "     分数: " + minstudentdata2 + "分"}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}

                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                value={maxstudent3 + "      分数: " + maxstudentdata3 + "分"}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}

                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                value={minstudent3 + "     分数: " + minstudentdata3 + "分"}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}

                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>

    )
}
export default Classroom3d