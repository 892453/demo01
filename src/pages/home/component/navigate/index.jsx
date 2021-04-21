import React, { useEffect, useState } from 'react';
import { MailOutlined, VideoCameraOutlined, CalendarOutlined ,LaptopOutlined,ExportOutlined,DotChartOutlined } from '@ant-design/icons';
import { Menu , message} from "antd"
import "./navigate.css"
import InfCourse from "../../../component/infCourse";
import AddCourse from "../../../component/addCourse";
import Concertration from "../../../component/lineChart";
import Video from "../../../component/video";
import Device from "../../../component/device";
import Sta1 from "../../../component/classroom3d";
import Sta2 from "../../../component/concer3d";
import Head from "../../../component/head";
import { useHistory } from 'react-router-dom';  //控制路由跳转
import cookie from 'react-cookies'              //查询界面的cookie信息

function Navi() {

  const [current,setcurrent] = useState("")
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

  return (

        <div>
        <Menu selectedKeys={[current]} mode="horizontal" style={{fontSize:"18px",lineHeight: "50px",color:"#fff",backgroundColor:"#222222"}}>
            <Menu.Item key="zhuan" onClick={()=>{setcurrent("concentration")}} icon={<MailOutlined />}>
              专注度检测
            </Menu.Item>
            
            <SubMenu key="course" icon={<CalendarOutlined />} title="课程管理">
              <Menu.ItemGroup >
                <Menu.Item key="setting:1"  onClick={()=>{setcurrent("infCourse")}} >课程信息</Menu.Item>
                <Menu.Item key="setting:2" onClick={()=>{setcurrent("addCourse")}} >添加课程</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key="device" icon={<LaptopOutlined /> } onClick={()=>{setcurrent("infDevice")}}>
              设备管理
            </Menu.Item>
            <SubMenu key="tongji" icon={<DotChartOutlined />} title="统计管理">
              <Menu.ItemGroup >
                <Menu.Item key="tongji:1"  onClick={()=>{setcurrent("sta1")}} >位次柱状打分图</Menu.Item>
                <Menu.Item key="tongji:2" onClick={()=>{setcurrent("sta2")}} >散点时间专注度图</Menu.Item>
                <Menu.Item key="tongji:3" onClick={()=>{setcurrent("head")}} >头部姿态识别图</Menu.Item>
                
              </Menu.ItemGroup>
            </SubMenu>

            

            <Menu.Item key="pai" onClick={()=>{setcurrent("video")}} icon={<VideoCameraOutlined />}>
              拍照
            </Menu.Item>

            <Menu.Item key="quit" icon={<ExportOutlined />} onClick={quit}>
              退出
            </Menu.Item>
          </Menu>

          {(()=>{
              console.log("type:",current)
                switch(current){
                  case "infCourse":   //课程信息界面
                    return (<InfCourse />)
                  case "addCourse":   //添加课程界面
                    return <AddCourse />;
                  case "concentration":  //专注度检测界面
                    return <Concertration />
                  case "video":  //摄像头界面
                    return <Video />
                  case "infDevice":       //设备信息界面                  
                    return <Device />
                  case "sta1":            //位次柱状打分图
                    return <Sta1 />
                  case "sta2":            //散点时间专注度图
                    return <Sta2 />
                  case "head":            //头部姿态识别图
                    return <Head />
                
                  default:
                    return <div>null</div>;

                }
            })()}

          </div>
   
  );
}

export default Navi;
