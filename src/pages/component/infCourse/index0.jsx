import React, { useEffect, useState } from 'react'
import { Breadcrumb, Popover } from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined,
    CloseOutlined

} from '@ant-design/icons';
import "./infCourse.css"
import Axios from 'axios';
import CourseDetail from　".././coursedetail"

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

    function clickimg() {
        console.log("查看课程详细信息")
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
                <div style={{textAlign:"right"}} className="move">
                    <span onClick={closeinfodetail}>关闭</span>
                </div>
              <CourseDetail />
            </div>

            {/* 课程主体信息 */}
            <div className="courseinfo">
                <ul>
                    {
                        coursedata.map((cour) => {
                            return (
                                <li className="lili" key={cour.courseid}>
                                    <a className="aaa" onClick={clickimg}>
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

                                </li>
                            )

                        })
                    }

                </ul>
            </div>
        </div>
    )
}
export default Courseinf