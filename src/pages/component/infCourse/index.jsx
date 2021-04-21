import React, { useEffect, useState } from 'react'
import { Breadcrumb, Popover ,Row,Col } from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined,
    CloseSquareOutlined

} from '@ant-design/icons';
import "./infCourse.css"
import Axios from 'axios';
//import CourseDetail from　"../coursedetail" 

/*
用于展示课程管理的【课程信息】界面
*/

function Courseinf() {

    const [coursedata, setcoursedata] = useState([])   //这里的【】改bug用了5个小时***
    //使用useEfefect请求数据
    useEffect(() => {
        Axios.get("http://www.aifixerpic.icu/music/name")
            .then((res) => {
                let course = res.data.data
                console.log("返回的courese:", course)
                setcoursedata(course)
            })

    }, []);   //第二参数[]内是要监听的参数，没有要监听的参数时，setcoursedata()函数执行时不会触发useEffect()函数

    function clickimg(param) {
        console.log("查看课程详细信息"+param)
        document.getElementById("courseinfodetail").style.display = 'block';
        document.getElementsByClassName("courseinfo")[0].style.display="none";
        
    }
    function closeinfodetail(){
        console.log("关闭查看课程详细信息")
        document.getElementById("courseinfodetail").style.display = 'none';
        document.getElementsByClassName("courseinfo")[0].style.display="block";
    }



    return (

        <div className="allcourseinfo">
            {/* 头部面包屑 */}
            <Breadcrumb style={{ margin: '16px 0', fontSize: "20px" }}>
                <Breadcrumb.Item>
                    <HighlightOutlined />
                    <span>
                        课程管理
                            </span>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                    <InfoCircleOutlined />
                    <span>课程信息</span>
                </Breadcrumb.Item>
            </Breadcrumb>

            {/* 课程详细信息 */}
            <div id="courseinfodetail">

                {/* 关闭查看【课程详情】按钮 */}
                <Row justify="end">
                    <Col span={1}>
                        <CloseSquareOutlined onClick={closeinfodetail} style={{fontSize:"30px"}} />
                    </Col>
                </Row>
                
                {/* 课程详情界面 */}
                <Row>
                    <Col md={24} lg={24} xl={18}>
                        <video style={{width:"100%"}} src="http://www.aifixerpic.icu/music/download_mp3?filename=比赛回顾.mp4" controls></video>
                    </Col>
                </Row>
                    
               
              
            </div>

            {/* 课程主体信息 */}
            <div className="courseinfo">
                {/* 【水平间隔，垂直间隔】 */}
                <Row  gutter={[24, 32]}>    
                    {
                        coursedata.map((cour) => {
                            return (
                                
                                <Col md={12} lg={8} xl={6}  key={cour.courseid}>
                                    <a className="aaa" onClick={clickimg.bind(this,cour.courseid)}>
                                        <img
                                            className="imgstyle"
                                            src={cour.courseurl}
                                            alt="Tup2"
                                        />
                                    </a>
                                    <dl className="dlstyle">
                                        <Popover content={cour.describle} title="【课程简介】" trigger="hover">
                                            <dt>{cour.coursename}</dt>
                                            <dt>发布人：{cour.uploadname}</dt>
                                            <dt>发布时间：{cour.uploadtime}</dt>
                                        </Popover>
                                    </dl>

                                </Col>
                               

                            

                                
                                
                            )

                        })
                    }
                </Row>
            </div>
        </div>
    )
}
export default Courseinf