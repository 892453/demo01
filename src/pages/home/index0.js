import React,{useEffect, useState} from 'react';
import { Layout, Menu, message} from 'antd';
import InfCourse from "../component/infCourse";
import AddCourse from "../component/addCourse";
import Concertration from "../component/lineChart";
import Video from "../component/video";
import "./home.css";
import {
  DesktopOutlined,
  PieChartOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';  //控制路由跳转
import cookie from 'react-cookies'              //查询界面的cookie信息

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Home() {

    const [collapsed,setCollapsed] = useState(false)

    //点击不同menu右侧展示不同内容,控制type类型
    const[clicktype,setclicktype]=useState("coursesss")
    const onCollapse = collapsed => {
      setCollapsed(collapsed)
    };
    let history = useHistory();
    
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

    function quit(){
      cookie.remove('user');
      history.push('/login');
    }
  
    return (
      <Layout style={{ minHeight: '100vh' }}>

        {/* 侧边栏 */}
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />} >
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={()=>{setclicktype("concentration")}}>
              专注度检测
            </Menu.Item>
            <Menu.Item key="5" icon={<VideoCameraOutlined />} onClick={()=>{setclicktype("video")}}>
              摄像头视频
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="课程管理">
              <Menu.Item key="3" onClick={()=>{setclicktype("infCourse")}}>课程信息</Menu.Item>
              <Menu.Item key="4" onClick={()=>{setclicktype("addCourse")}}>添加课程</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="设备管理">
              <Menu.Item key="6" onClick={()=>{setclicktype("infDevice")}}>设备信息</Menu.Item>
              <Menu.Item key="8" onClick={()=>{setclicktype("addDevice")}}>添加设备</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" onClick={quit} icon={<LogoutOutlined />}>
              退出
            </Menu.Item>
          </Menu>
        </Sider>
        
        <Layout className="site-layout"> 

          {/* 右侧顶部 */}
          <Header className="site-layout-background" style={{ padding: 0 }} />

          {/* 右侧中间部分 */}
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360}}>
              {/* Bill is a cat. */}
            
            {(()=>{
              console.log("type:",clicktype)
                switch(clicktype){
                  case "infCourse":   //课程信息界面
                    return (<InfCourse />)
                  case "addCourse":   //添加课程界面
                    return <AddCourse />;
                  case "concentration":  //专注度检测界面
                    return <Concertration />
                  case "video":  //摄像头界面
                    return <Video />
                  case "Device":      //设备界面                  
                    return (<div>设备界面</div>);
                  default:
                    return <div>null</div>;

                }
            })()}
            </div>

            
          </Content>
          
          {/* 右侧底部 */}
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  
}
export default Home