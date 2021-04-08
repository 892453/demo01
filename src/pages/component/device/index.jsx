import React,{ useEffect } from 'react'
import * as echarts from 'echarts';
import axios from "axios"







function Device() {
   

    useEffect(()=>{
        var chartDom = document.getElementById('mains');
        var myChart = echarts.init(chartDom);
        var option;
        
        myChart.showLoading();
        axios.get('http://aifixerpic.icu/upload/getjson/').then(
            graph =>{

                console.log(graph)

                myChart.hideLoading();
               
                graph.data.nodes.forEach(function (node) {
                    node.label = {
                        show: node.symbolSize > 30
                    };
                });
                option = {
                    title: {
                        text: '设备信息图谱',
                        subtext: 'Default layout',
                        top: 'bottom',
                        left: 'right'
                    },

                    // 工具提示
                    tooltip: {
                        trigger: 'item',
                   
                       
                        //formatter:'{a}</br>b:{b}</br>b0:{b0}</br>b1:{b1}</br>c:{c}</br>{c0}</br>{c1}</br>'
                        formatter:function(params){ 
                           return "设备状态："+params.data.value+"</br>设备ID："+params.data.id+"</br>MAC:"+params.data.mac+"</br>连接时间:"+params.data.linktime
                        },
                
                    },

                    // 图例信息
                    legend: [{
                        //selectedMode: 'single',
                        data: graph.data.categories.map(function (a) {
                            return a.name;
                        })
                    }],
                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [
                        {
                            name: '【设备信息】',
                            type: 'graph',
                            layout: 'none',
                            data: graph.data.nodes,
                            links: graph.data.links,
                            categories: graph.data.categories,
                            roam: true,
                            label: {
                                position: 'right',
                                formatter: '{b}'
                            },
                            lineStyle: {
                                color: 'source',
                                curveness: 0.3
                            },
                            emphasis: {
                                focus: 'adjacency',
                                lineStyle: {
                                    width: 10
                                }
                            }
                        }
                        
                    
                    ]
                };
            
                myChart.setOption(option);
            }
        )
        option && myChart.setOption(option);
    })

    return (
        <div>           
            <div id="mains" style={{width:"1100px",height:"600px"}}>

            </div>
        </div>
    )


}
export default Device