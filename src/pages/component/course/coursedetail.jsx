import React, { useContext,useState ,useEffect } from 'react';
import { Row, Col ,Card } from 'antd';
import {CourseContext} from'./courseid'
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { IPORT } from "../../static/ipconfig"
export default function CourseDetail() {

    //const {state} = useContext(CourseContext)
   
    let history = useHistory();
    useEffect(() => {
        console.log(history.location.state.id)
        let id=history.location.state.id
        Axios({
            method: 'get',
            url: IPORT + "/course/info/" + id,
        }).then((res) => {
            console.log(id + "课程信息：", res.data.result)
            
            
            
        })


    })

    const courseinfo = {
        "courseId": "1394637129839763458",
        "courseName": "高等数学",
        "courseType": 1,
        "courseTeacher": "夏若恒",
        "courseReleaseTime": "2021-03-06T00:00:05.000+0000",
        "courseAvatarPath": "http://120.27.236.223:9000/course/fileDownload?fileId=1394628575946825729",
        "courseFilePath": [
            "http://120.27.236.223:9000/course/fileDownload?fileId=1394628238242439170",
            "http://120.27.236.223:9000/course/fileDownload?fileId=1394628238112415746",
            "http://120.27.236.223:9000/course/fileDownload?fileId=1394628232768872450"
        ],
        "courseLikedTimes": 0,
        "courseIntroduction": "这是一段介绍"
    }

    return (
        <div className="coursedetail">
            <Row justify="center">
                <Col sm={24} md={22} lg={20} xl={14}>
                    {/* 课程头部信息 */}
                    <div className="head" style={{ fontSize: "18px", color: "#333", textAlign: "center", marginTop: "10px" }}>
                        <h1>
                            本段课程————《{courseinfo.courseName}》 
                        </h1>
                        
                    </div>
                    {/* 课程详细信息 */}
                    <div>
                        <Row>
                            <Col md={13} lg={13} xl={13}>
                                <video style={{ width: "100%" }} src="http://www.aifixerpic.icu/music/download_mp3?filename=比赛回顾.mp4" controls></video>
                            </Col>
                            <Col md={3} lg={3} xl={3}></Col>
                            <Col md={8} lg={8} xl={8}>
                                <div style={{ border: "1px solid black" }}>
                                    <div style={{ padding: '10px', paddingLeft: '20px' }}>课程名称：{courseinfo.courseName}</div>

                                    <div style={{ padding: '10px', paddingLeft: '20px' }}>课程编号：{courseinfo.courseId}</div>

                                    <div style={{ padding: '10px', paddingLeft: '20px' }}>发布时间：{courseinfo.courseReleaseTime}</div>

                                    <div style={{ padding: '10px', paddingLeft: '20px' }}>主讲人：{courseinfo.courseTeacher}</div>

                                    <div style={{ padding: '10px', paddingLeft: '20px' }}>
                                        课程描述：
                                        <Card bordered={false}>
                                            <p>{courseinfo.courseIntroduction}</p>
                                        </Card>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </div>

                </Col>
            </Row>
        </div>
    )
}