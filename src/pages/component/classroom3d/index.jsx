import React, { useEffect } from 'react'
import * as echarts from 'echarts';
import 'echarts-gl'
import { Breadcrumb, Result ,Row,Col} from 'antd';
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
        var data = [[]]
        var hours = ['第一列', '第二列', '第三列', '第四列', '第五列', '第六列', '第七列', '第八列'];
        var days = ['第一排', '第二排', '第三排', '第四排', '第五排', '第六排'];
        axios.get('/my.json').then(res => {

            //console.log(res);

            data = res.data;

            //console.log(data);
            option = {
                title: {
                    text: '位次柱状打分图',
                    subtext: 'Default layout',
                    top: 'bottom',
                    left: 'right'
                },
                tooltip: {
                    type: 'axis',

                    formatter: function (params) {
                        return "姓名: " + params.data.name + "</br>课堂打分: " + params.data.value[2]
                    },
                },
                visualMap: {
                    max: 100,
                    min: 60,
                    text: ['优秀', '不及格'],
                    inRange: {
                        color: ['#FD6E76', '#FDDD60', '#58D9F9', '#7CFFB2']
                    }
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
                grid3D: {
                    boxWidth: 200,
                    boxDepth: 80,
                    light: {
                        main: {
                            intensity: 1.2
                        },
                        ambient: {
                            intensity: 0.3
                        }
                    }
                },
                series: [{
                    type: 'bar3D',
                    name: '详细信息',
                    barSize: 7,
                    data: data.map(function (item) {
                        return {
                            value: [item[0], item[1], item[2]],
                            name: item[3]
                        }
                    }),
                    shading: 'lambert',


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
                }]
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
                    <div id="mains" style={{ width: "100%", height: "600px",background: "#DCF5FF"}}></div>
                    <div id="noaccess" style={{ width: "100%" }}>
                        <Result
                            status="403"
                            title="403"
                            subTitle="抱歉，整体打分页面只允许老师访问哦！"
                        // extra={<Button type="primary" onClick={Backhome}>返回主页</Button>}
                        />
                    </div>
                </Col>
            </Row>
            
        </div>
    )
}
export default Statistic