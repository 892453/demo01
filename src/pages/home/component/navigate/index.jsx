import React, { useEffect, useState } from 'react';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu , message} from "antd"
import "./navigate.css"
import InfCourse from "../../../component/infCourse";
import AddCourse from "../../../component/addCourse";
import Concertration from "../../../component/lineChart";
import Video from "../../../component/video";
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
            
            <SubMenu key="course" icon={<SettingOutlined />} title="课程管理">
              <Menu.ItemGroup >
                <Menu.Item key="setting:1"  onClick={()=>{setcurrent("infCourse")}} >课程信息</Menu.Item>
                <Menu.Item key="setting:2" onClick={()=>{setcurrent("addCourse")}} >添加课程</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <SubMenu key="device" icon={<SettingOutlined />} title="设备管理">
              <Menu.ItemGroup >
                <Menu.Item key="setting:1" onClick={()=>{setcurrent("infDevice")}}>设备信息</Menu.Item>
                <Menu.Item key="setting:2" onClick={()=>{setcurrent("addDevice")}}>添加设备</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>

            <Menu.Item key="quit" onClick={quit}>
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
                  case "infDevice":      //设备界面                  
                    return (<div>设备信息界面</div>);
                  case "addDevice":      //设备界面                  
                    return (<div>添加设备界面</div>);
                  default:
                    return <div>null</div>;

                }
            })()}

          </div>
   
  );
}

export default Navi;
