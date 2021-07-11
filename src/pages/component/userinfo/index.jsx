import {React,useState} from "react";
import './userinfo.css'
import { Avatar, List, Typography, Divider, Row, Col, Card, Button,Breadcrumb} from "antd";
import {
    HighlightOutlined,
    InfoCircleOutlined,

} from '@ant-design/icons';
import UserinfoContent from'./userinfoContent'
import ManageCourseContent from "./manageCourseContent";
function Userinfo() {
    // card中内容的样式
    const gridStyle = {
        width: '100%',
        textAlign: 'center',
    };
    // list中内容的样式
    const listItemStyle = {
        justifyContent: "center",
        fontSize: "18px",
    }

    function onClickEdit() {

    }

    function onClickCommit() {

    }
    const userinfo={"userName":"wjl","phoneNumber":"11111","jobNumber":"17130130261","identity":"student","email":"1262872957@qq.com"}
    const [current,setcurrent] = useState("")
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
        <div id='userinfo'>
            
            <Row>
                {/* 左边列表的内容及布置 */}
                <Col span={6} style={{ border: "1px solid #AAAAAA" }}style={{ border: "1px solid #AAAAAA" }}>
                    {/* 头像的放置，使用网址路径 */}
                    <div style={{ textAlign: "center" }}>
                        {/* PC起作用的是xxl */}
                        <Avatar
                            shape="circle"
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 140 }}
                            style={{ backgroundColor: "lightblue", marginTop: "20px" }}
                        />
                    </div>
                    {/* 资料属性列表，使用list,鼠标悬浮用内联样式换颜色未解决*/}
                    <List style={{ marginTop: "20px", justifyContent: "center", fontSize: "18px" }}>
                        <List.Item id='listItem' style={listItemStyle}>
                            <a style={{ color: '#000000d9' }} onClick={()=>setcurrent("userinfoContent")}>个人资料</a>
                        </List.Item>
                        <List.Item style={listItemStyle}>
                            <a  style={{ color: '#000000d9' }}>修改密码</a>
                        </List.Item>
                        <List.Item style={listItemStyle}>
                            <a  style={{ color: '#000000d9' }} onClick={()=>setcurrent("manageCourseContent")}>管理已发布的课程</a>
                        </List.Item>
                        <List.Item style={listItemStyle}>
                            <a  style={{ color: '#000000d9' }}>内容1</a>
                        </List.Item>
                        <List.Item style={listItemStyle}>
                            <a  style={{ color: '#000000d9' }}>内容2</a>
                        </List.Item>
                        <List.Item style={listItemStyle}>
                            <a  style={{ color: '#000000d9' }}>内容3</a>
                        </List.Item>
                    </List>
                </Col>
                <Col span={1}></Col>
                {/* 右边放置内容，应该需要切换内容 */}
                <Col span={17}>
                    {/* 个人资料页面 */}
                    <div style={{ border: "1px solid #AAAAAA",backgroundColor: 'white'}}>
                        {
                            (()=>{
                                console.log("type:",current)
                                switch(current){
                                    case "userinfoContent":
                                        return (<UserinfoContent/>)
                                    case "manageCourseContent":
                                        return (<ManageCourseContent/>)
                                    default:
                                        return <UserinfoContent/>
                                }
                            })()
                        }
                    </div>
                </Col>
            </Row>
        </div></div>
    );
}
export default Userinfo;
