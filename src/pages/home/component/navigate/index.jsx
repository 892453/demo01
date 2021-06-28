import React, { useEffect, useState } from 'react';
import { MailOutlined, DatabaseOutlined, CalendarOutlined ,LaptopOutlined,ExportOutlined,DotChartOutlined } from '@ant-design/icons';
import { Menu , message} from "antd"
import "./navigate.css"
import InfCourse from "../../../component/infCourse";
import AddCourse from "../../../component/addCourse";
import Personinfo from "../../../component/personinfo";   //专注度折线图界面  预留
//import Video from "../../../component/video";
import Device from "../../../component/device";
import Sta1 from "../../../component/classroom3d";
import Sta2 from "../../../component/concer3d";
import Datasta from "../../../component/datasta";
import { useHistory } from 'react-router-dom';  //控制路由跳转
import cookie from 'react-cookies'              //查询界面的cookie信息
import axios from "axios"
import * as echarts from 'echarts';
import { Breadcrumb} from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined

} from '@ant-design/icons';

function Navi() {

  const [current,setcurrent] = useState("")
  const [role,setrole] = useState(cookie.load("role"))
  const { SubMenu } = Menu;
  let history = useHistory();

  //点击退出->清理cookie->跳转至login界面
  function quit(){
    cookie.remove('user');
    history.push('/login');
  }

  useEffect(()=>{
    //console.log("组件初始化...")
    let user=cookie.load("user")
   
    //console.log("cookie信息：",user)
    if(user===undefined){
      //console.log("cookie:",user)
      message.info("您尚未登录，自动跳转至登录界面...")
      history.push('/login');
    }
  })

  //页面初始加载时渲染折线图，并将其放入classname=main的div里
  useEffect(()=>{

    var inte;
    var myChart;
    var chartDom = document.getElementById('main');
    myChart = echarts.init(chartDom);
    var date = [];
    var data = [0];
    
    
    
   
    
    var option; 
    
    var base = +new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(),new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());
    var oneDay = 3 * 1000;
   
    
   
    
    option = {
        tooltip: {
            trigger: 'axis',
             formatter:function (pt) {
           
              if(pt[0].data==0){
                return "离开座位";
              }
              if(pt[0].data==1){
                return "低头"
              }
              if(pt[0].data==2){
                return "摇头晃脑"
              }
              if(pt[0].data==3){
                return "聚精会神"
              }
                
            }
        },

        visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 3,
            inRange: {
              color: ['#c1232b', '#fcce10', '#0098d9', '#22c3aa']
          }
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
            console.log(res.data)
        })
        
        myChart.setOption(option);
    }, 3000);
    return()=>{ 
        console.log("linechart 页面销毁")
        clearInterval(inte)
        myChart.dispose()
    }
       
        
    
},[])

  return (

        <div>
        <Menu selectedKeys={[current]} mode="horizontal" style={{fontSize:"18px",lineHeight: "50px",color:"#fff",backgroundColor:"#222222"}}>
            <Menu.Item key="zhuan" onClick={()=>{setcurrent("personinfo")}} icon={<MailOutlined />}>
              个人状态信息
            </Menu.Item>
            
            <SubMenu key="course" icon={<CalendarOutlined />} title="课程管理">
              <Menu.ItemGroup >
                <Menu.Item key="setting:1"  onClick={()=>{setcurrent("infCourse")}} >课程信息</Menu.Item>
                <Menu.Item key="setting:2" onClick={()=>{setcurrent("addCourse")}} disabled={role==="true"?false:true}>添加课程</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="device" icon={<LaptopOutlined /> } onClick={()=>{setcurrent("infDevice")}}>
              设备管理
            </Menu.Item>
            <SubMenu key="tongji" icon={<DotChartOutlined />} title="统计管理" disabled={role==="true"?false:true}>
              <Menu.ItemGroup >
                <Menu.Item key="tongji:1"  onClick={()=>{setcurrent("sta1")}} >位次柱状打分图</Menu.Item>
                <Menu.Item key="tongji:2" onClick={()=>{setcurrent("sta2")}} >专注时间序列图</Menu.Item>
                
                
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="datasta" icon={<DatabaseOutlined /> } onClick={()=>{setcurrent("dataSta")}}>
              数据统计
            </Menu.Item>

            <Menu.Item key="quit" icon={<ExportOutlined />} onClick={quit}>
              退出
            </Menu.Item>
          </Menu>

          {/* 保持折线图永远在后台运行，切换到其他页面时只是暂时的hide */}
          <div id="notrash">
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
            <div id="main" style={{ height: "400px",background:"#DCF5FF",borderRadius:"20px"}} ></div>
          </div>

          {(()=>{
              console.log("type:",current)
              
                switch(current){
                  case "infCourse":   //课程信息界面
                    document.getElementById("notrash").style.display="none";
                    return (<InfCourse />)
                  case "addCourse":   //添加课程界面
                    document.getElementById("notrash").style.display="none";
                    return <AddCourse />;
                  case "personinfo":  //专注度检测界面
                    document.getElementById("notrash").style.display="block";    //展示专注度页面时要使用block属性
                    return <Personinfo />
                  case "infDevice":       //设备信息界面   
                    document.getElementById("notrash").style.display="none";               
                    return <Device />
                  case "sta1":            //位次柱状打分图
                    document.getElementById("notrash").style.display="none";
                    return <Sta1 />
                  case "sta2":            //散点时间专注度图
                    document.getElementById("notrash").style.display="none";
                    return <Sta2 />
                  case "dataSta":            //数据统计管理界面
                    document.getElementById("notrash").style.display="none";
                    return <Datasta />
                
                  default:
                    return <div>.</div>;

                }
            })()}

          </div>
   
  );
}

export default Navi;
