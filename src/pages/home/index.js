import React,{Component, useState} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import InfCourse from "../component/infCourse";
import AddCourse from "../component/addCourse";
import "./home.css"
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Home() {

    const [collapsed,setCollapsed] = useState(false)

    //点击不同menu右侧展示不同内容,控制type类型
    const[clicktype,setclicktype]=useState("coursesss")

    const onCollapse = collapsed => {
      setCollapsed(collapsed)
    };
  
    return (
      <Layout style={{ minHeight: '100vh' }}>

        {/* 侧边栏 */}
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="课程管理">
              <Menu.Item key="3" onClick={()=>{setclicktype("infCourse")}}>课程信息</Menu.Item>
              <Menu.Item key="4" onClick={()=>{setclicktype("addCourse")}}>添加课程</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="设备管理">
              <Menu.Item key="6" onClick={()=>{setclicktype("infDevice")}}>设备信息</Menu.Item>
              <Menu.Item key="8" onClick={()=>{setclicktype("addDevice")}}>添加设备</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
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
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {/* Bill is a cat. */}
            
            {(()=>{
              console.log("type:",clicktype)
                switch(clicktype){
                  case "infCourse":
                    return (<InfCourse />)
                  case "addCourse":
                    return <AddCourse />;
                  case "Device":
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