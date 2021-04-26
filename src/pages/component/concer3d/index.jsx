import React, { useEffect } from 'react'
import * as echarts from 'echarts';
import 'echarts-gl'
import { Breadcrumb,Result,Row,Col } from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined

} from '@ant-design/icons';
import axios from "axios"
import cookie from 'react-cookies'

function Statistic() {
    useEffect(() => {

        //先进行用户角色的判断，然后决定展示内容
        let role=cookie.load("role")
        //console.log("判断角色："+role)
        if(role!=="true"){
            document.getElementById("mains").style.display = 'none';
            document.getElementById("noaccess").style.display="display";
        }else{
            document.getElementById("mains").style.display = 'display';
            document.getElementById("noaccess").style.display="none";
        }
        //用户角色判断完成

        var chartDom = document.getElementById('mains');
        var myChart = echarts.init(chartDom);
        var option;
        axios.get('/concer3d.json').then(res => {
            //console.log(res);
            var data = [[]];
            var dataY = [];
            data = res.data.goals;
            dataY = res.data.name;
            //console.log(data);
            var dataX = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100', '105', '110', '115', '120', '125', '130', '135', '140', '145', '150', '155', '160', '165', '170', '175', '180', '185', '190', '195', '200', '205', '210', '215', '220', '225', '230', '235', '240', '245', '250', '255', '260', '265', '270', '275', '280', '285', '290', '295', '300', '305', '310', '315', '320', '325', '330', '335', '340', '345', '350', '355', '360', '365', '370', '375', '380', '385', '390', '395', '400', '405', '410', '415', '420', '425', '430', '435', '440', '445', '450', '455', '460', '465', '470', '475', '480', '485', '490', '495', '500', '505', '510', '515', '520', '525', '530', '535', '540', '545', '550', '555', '560', '565', '570', '575', '580', '585', '590', '595', '600'];
            var vdata = [];
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
                        vdata[t].push([x, y, z]);
                    }
                    break;
                }
            }
            option = {
                title: {
                    text: '专注度时间序列图',
                    subtext: 'Default layout',
                    top: 'bottom',
                    left: 'right'
                },

                tooltip: {
                    trigger: 'item',

                    formatter: function (params) {
                        //console.log(params)
                        return "姓名: " + params.data[1] + "</br>时间: " + parseInt(params.data[0] / 60) + "分" + params.data[0] % 60 + "秒"
                    },
                },
                grid3D: {
                    boxDepth: 400,
                    boxWidth: 200,
                    boxHeigth: 15,
                },
                xAxis3D: {
                    type: 'value',
                    name: '时间',
                    data: dataX,
                    interval: 60,
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
                    text: ['专注', '不专注'],
                    inRange: {
                        color: ['#c1232b', '#fcce10', '#0098d9', '#22c3aa']
                    }
                },
                series: [
                    {
                        type: 'line3D',
                        symbolSize: 8,
                        data: vdata[0],
                        animation: true,


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
                    <div id="mains" style={{ width: "100%", height: "600px",background: "#DCF5FF"}}></div>
                    <div id="noaccess" style={{width:"100%"}}>
                        <Result
                            status="403"
                            title="403"
                            subTitle="抱歉，专注度序列页面只允许老师访问哦！"
                            // extra={<Button type="primary" onClick={Backhome}>返回主页</Button>}
                        />  
                    </div>
                </Col>
            </Row>
            
        </div>
    )
}
export default Statistic