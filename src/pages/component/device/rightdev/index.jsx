import React,{ useEffect } from 'react'
import * as echarts from 'echarts';
import axios from "axios"

function Rightdev() {
   
    useEffect(()=>{
        var chartDom = document.getElementById('main2');
        var myChart = echarts.init(chartDom);
        var option;
        myChart.showLoading();

        axios.get('/device2.json').then(
            res=>{
                console.log(res.data)
                myChart.hideLoading();

                res.data.children.forEach(function (datum, index) {
                    index % 2 === 0 && (datum.collapsed = true);
                });
            
                myChart.setOption(option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [
                        {
                            type: 'tree',
                            initialTreeDepth :-1,
                            data: [res.data],
            
                            top: '1%',
                            left: '32%',
                            bottom: '1%',
                            right: '23%',
            
                            symbolSize: 7,
            
                            label: {
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right',
                                fontSize: 20
                            },
            
                            leaves: {
                                label: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            },
            
                            emphasis: {
                                focus: 'descendant'
                            },
            
                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                });
            }
        )
        option && myChart.setOption(option);

    })

  
    return (
                  
            <div id="main2" style={{width:"100%",height:"600px",background:"#DCF5FF",borderRadius: "20px"}}>

            </div>
       
    )


}
export default Rightdev