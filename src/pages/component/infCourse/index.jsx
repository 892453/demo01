import React, { useEffect, useState } from 'react'
import { Breadcrumb, Popover, Row, Col } from 'antd';
import { Card, Image } from 'antd';

import {
    HighlightOutlined,
    InfoCircleOutlined,
    CloseSquareOutlined

} from '@ant-design/icons';
import "./infCourse.css"
import Axios from 'axios';
import Qs from 'qs'

/*
用于展示课程管理的【课程信息】界面
*/

function Courseinf() {

    const [coursedata, setcoursedata] = useState([])   //***注意这里的[]
    const [courseinform, setcourseinform] = useState({})
    const [videoaddr, setvideoaddr] = useState(""); //获取视频的地址
    const [fileurl, setfileurl] = useState([]);

    useEffect(() => {
        //get请求【课程信息内容】
        Axios.get("http://www.aifixerpic.icu/upload/name")
            .then((res) => {
                let course = res.data.data
                console.log("返回的courese:", course)
                setcoursedata(course)
                console.log({ coursedata })
            })
    }, []);   //第二参数[]内是要监听的参数，没有要监听的参数时，setcoursedata()函数执行时不会触发useEffect()函数
    function test2() {

        console.log({videoaddr})
    }
    function clickimg(id) {
        console.log("查看课程id" + id)
        //post请求【课程详细信息内容】
        Axios({	
            method:'post',
            url:"http://www.aifixerpic.icu/upload/getcourinfobyid",
            data:Qs.stringify({
                "id": id
            })
        }).then((res) => {
            console.log("res::",res)
                let coursedetail = res.data
                if(coursedetail.coursefile[0].slice(-3)==="mp4")
                {
                    setvideoaddr(coursedetail.coursefile[0])
                    setfileurl(coursedetail.coursefile.slice(1))
                }
                else{
                    setvideoaddr("")
                    setfileurl(coursedetail.coursefile)
                }
                coursedetail.courseid = id
                console.log("返回的课程详情", coursedetail)
                setcourseinform(coursedetail)
                document.getElementById("courseinfodetail").style.display = 'block';
                if(document.getElementById("courseinfodetail").style.display = 'block')
                console.log("页面展示")
                document.getElementsByClassName("courseinfo")[0].style.display = "none";
            })
    }
    function closeinfodetail() {
        console.log("关闭查看课程详细信息")
        document.getElementById("courseinfodetail").style.display = 'none';
        document.getElementsByClassName("courseinfo")[0].style.display = "block";
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
                        <CloseSquareOutlined onClick={closeinfodetail} style={{ fontSize: "30px" }} />
                    </Col>
                </Row>
                <Row>
                    <Col md={24} lg={24} xl={16}>
                        {
                            (videoaddr.slice(-3)!=="mp4")?
                            <Image
                            style={{}}
                            width={400}
                            src={courseinform.fengmian}
                            />
                            :
                            <video id="onlinevideo" onClick={test2} style={{ width: "100%" }} src={videoaddr} controls></video>
                        }
                    </Col>
                    <Col md={24} lg={24} xl={8}>
                        <div style={{ border: "1px solid black" }}>
                            <div style={{ padding: '10px', paddingLeft: '20px' }}>课程名称：{courseinform.coursename}</div>

                            <div style={{ padding: '10px', paddingLeft: '20px' }}>课程编号：{courseinform.courseid}</div>

                            <div style={{ padding: '10px', paddingLeft: '20px' }}>发布时间：{courseinform.uploadtime}</div>

                            <div style={{ padding: '10px', paddingLeft: '20px' }}>主讲人：{courseinform.uploadname}</div>

                            <div style={{ padding: '10px', paddingLeft: '20px' }}>
                                课程描述：
                                    <Card bordered={false}>
                                    <p>{courseinform.describe}</p>
                                </Card>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{paddingTop:'5px'}}>
                    {
                        fileurl.map((item,index)=>{
                            return(
                                <Col key={index+item} style={{paddingTop:'5px'}} md={24} lg={24} xl={3}>
                                    <a id="courselink" href={item} target="_blank">课件{index+1}下载</a>
                                </Col>
                            )
                        })
                    }
                </Row>

                {/* <Button type="primary" shape="round" icon={<DownloadOutlined />} size={'large'}> */}


                {/* </Button> */}

            </div>
            {/* 课程主体信息 */}
            <div className="courseinfo">
                {/* 【水平间隔，垂直间隔】 */}
                <Row gutter={[24, 32]}>
                    {
                        coursedata.map((cour, index) => {
                            return (

                                <Col md={12} lg={8} xl={6} key={cour.courseid} >
                                    <a className="aaa" onClick={clickimg.bind(this, cour.courseid)} id={cour.courseid}>
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