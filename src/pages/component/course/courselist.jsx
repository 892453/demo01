import React, { useContext, useEffect ,useState} from 'react';
import {Row,Col,Popover,Breadcrumb} from "antd"
import { CourseContext,UPDATE_COURSEID } from './courseid';
import Axios from 'axios';
import {
    HighlightOutlined,
    InfoCircleOutlined

} from '@ant-design/icons';
import "./infCourse.css"
import { useHistory } from 'react-router-dom';  //页面跳转
import CourseDetail from './coursedetail';

export default function CourseList(){
    let history = useHistory();
    const { dispatch } = useContext(CourseContext)

    const [coursedata, setcoursedata] = useState([])   //***注意这里的[]
    // const [courseinform, setcourseinform] = useState({})
    // const [videoaddr, setvideoaddr] = useState(""); //获取视频的地址
    // const [fileurl, setfileurl] = useState([]);
    // const [avator, setavator] = useState("");
    // const [visible, setvisible] = useState(false)

    useEffect(() => {
        //get请求【课程信息内容】
        Axios.defaults.withCredentials = true; //配置为true
        Axios.get("http://www.aifixerpic.icu/upload/name")
            .then((res) => {
                let course = res.data.result
                console.log("返回的courese:", course)
                if (course != undefined) {
                    setcoursedata(course)
                }

            })
    }, []);   //第二参数[]内是要监听的参数，没有要监听的参数时，setcoursedata()函数执行时不会触发useEffect()函数
    function clickimg(id) {
        console.log("查看课程id" + id)
        dispatch({ type: UPDATE_COURSEID, courseid: id })
        history.push("/course",{id:id})

    }
    
    return(
        <div>
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
            {/* 课程主体信息 */}
            <div className="courseinfo">
                {/* 【水平间隔，垂直间隔】 */}
                <Row gutter={[24, 32]}>
                    {
                        coursedata.map((cour, index) => {
                            return (

                                <Col md={12} lg={8} xl={6} key={cour.courseId} >
                                    <a className="aaa" onClick={clickimg.bind(this, cour.courseId)} id={cour.courseId}>
                                        <img
                                            className="imgstyle"
                                            src={cour.courseAvatarPath}
                                            alt="Tup2"
                                        />
                                    </a>
                                    <dl className="dlstyle">
                                        <Popover content={cour.courseIntroduction} title="【课程简介】" trigger="hover">
                                            <dt>{cour.courseName}</dt>
                                            <dt>发布人：{cour.courseTeacher}</dt>
                                            <dt>发布时间：{cour.courseReleaseTime}</dt>
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