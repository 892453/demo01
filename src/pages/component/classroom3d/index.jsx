import React,{ useEffect } from 'react'
import * as echarts from 'echarts';
import 'echarts-gl'
import { Breadcrumb} from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined

} from '@ant-design/icons';
import axios from "axios"

function Statistic(){
    useEffect(()=>{
        var chartDom = document.getElementById('mains');
        var myChart = echarts.init(chartDom);
        var option;
        var data =[[]]
        var hours = ['第一列','第二列','第三列','第四列','第五列','第六列','第七列','第八列'];
        var days = ['第一排','第二排','第三排','第四排','第五排','第六排'];
        axios.get('/my.json').then(res=>{
            
            console.log(res);
            
           data = res.data;
           
           console.log(data);
           option ={
            tooltip: {
                type: 'axis',

                formatter:function(params){ 
                  return "姓名: "+params.data.name+"</br>课堂打分: "+params.data.value[2]
                 },
            },
            visualMap: {
                max: 100,
                min: 60,
                text:['优秀','不及格'] , 
                inRange: {
                    color: [ '#FD6E76' ,'#FDDD60','#58D9F9','#7CFFB2']
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
                name:'教室侧面'
            },
            zAxis3D: {
                type: 'value',
                name:'课堂打分'
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
                name:'详细信息',
                barSize:7,
                data: data.map(function (item) {
                    return {
                        value: [item[0], item[1], item[2]],
                        name:item[3]
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
            <div id="mains" style={{width:"1100px",height:"600px"}}>

            </div>
        </div>
    )
}
export default Statistic