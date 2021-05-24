import React, { useEffect, useState } from 'react'
import { Breadcrumb, Popover, Row, Col, Button, Drawer, Form, Input, Select, DatePicker } from 'antd';
import { Card, Image } from 'antd';

import {
    HighlightOutlined,
    InfoCircleOutlined,
    CloseSquareOutlined

} from '@ant-design/icons';
import "./infCourse.css"
import Axios from 'axios';
import Qs from 'qs'

const { Option } = Select;

/*
用于展示课程管理的【课程信息】界面
*/

function Courseinf() {

    const [coursedata, setcoursedata] = useState([])   //***注意这里的[]
    const [courseinform, setcourseinform] = useState({})
    const [videoaddr, setvideoaddr] = useState(""); //获取视频的地址
    const [fileurl, setfileurl] = useState([]);
    const [visible, setvisible] = useState(false)

    useEffect(() => {
        //get请求【课程信息内容】
        Axios.get("http://www.aifixerpic.icu/upload/name")
            .then((res) => {
                let course = res.data.data
                console.log("返回的courese:", course)
                setcoursedata(course)
            })
    }, []);   //第二参数[]内是要监听的参数，没有要监听的参数时，setcoursedata()函数执行时不会触发useEffect()函数


    function showDrawer() {
        setvisible(true)
    };

    function onClose() {
        setvisible(false)
    };

    function clickimg(id) {
        //console.log("查看课程id" + id)
        //post请求【课程详细信息内容】
        Axios({
            method: 'post',
            url: "http://www.aifixerpic.icu/upload/ids",
            data: Qs.stringify({
                "id": id
            })
        }).then((res) => {
             console.log("res::",res)
            let coursedetail = res.data
            if (coursedetail.coursefile[0].slice(-3) === "mp4") {
                setvideoaddr(coursedetail.coursefile[0])
                setfileurl(coursedetail.coursefile.slice(1))
            }
            else {
                setvideoaddr("")
                setfileurl(coursedetail.coursefile)
            }
            coursedetail.courseid = id
            //console.log("返回的课程详情", coursedetail)
            setcourseinform(coursedetail)
            document.getElementById("courseinfodetail").style.display = 'block';
            if (document.getElementById("courseinfodetail").style.display = 'block')
                //console.log("页面展示")
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
                    <Col md={13} lg={13} xl={13}>
                        {
                            (videoaddr.slice(-3) !== "mp4") ?
                                <Image
                                    style={{}}
                                    width={400}
                                    src={courseinform.fengmian}
                                />
                                :
                                <video id="onlinevideo" style={{ width: "100%" }} src={videoaddr} controls></video>
                        }
                    </Col>
                    <Col md={3} lg={3} xl={3}></Col>
                    <Col md={8} lg={8} xl={8}>
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
                <Row style={{ paddingTop: '5px' }}>
                    {
                        fileurl.map((item, index) => {
                            return (
                                <Col key={index + item} style={{ paddingTop: '5px' }} md={24} lg={24} xl={3}>
                                    <a id="courselink" href={item} target="_blank">课件{index + 1}下载</a>
                                </Col>
                            )
                        })
                    }
                    <Col>
                        <Button onClick={showDrawer}>
                            完成学习
                        </Button>
                    </Col>
                </Row>

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


            {/* 答题抽屉信息 */}
            <Drawer
                title="课堂测试题目"
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            关闭
                        </Button>
                        <Button onClick={onClose} type="primary">
                           提交
                        </Button>
                    </div>
                }
            >
                <Form layout="vertical" hideRequiredMark>

                            <Form.Item
                                name="q1"
                                label="1.C语言源程序的基本单位是什么？" //函数
                                rules={[{ required: true, message: 'Please enter your answer' }]}
                            >
                                <Input placeholder="Please enter your answer" />
                            </Form.Item>
                            <Form.Item
                                name="q2"
                                label="2.假设变量a,b均为整型，表达式(a=5;b=2;a>b?a++:b++;a+b)的值是？"  //8
                                rules={[{ required: true, message: 'Please enter your answer' }]}
                            >
                                <Input placeholder="Please enter your answer" />
                            </Form.Item>
                            <Form.Item
                                name="q3"
                                label="3.在c语言程序中，以下说法正确的是？" //B
                                rules={[{ required: true, message: 'Please enter your answer' }]}
                            >
                                <Select placeholder="Please select an answer">  
                                    <Option value="a">A 函数的定义可以嵌套，但函数的调用不可以嵌套</Option>
                                    <Option value="b">B 函数的定义不可以嵌套，但函数的调用可以嵌套</Option>  
                                    <Option value="c">C 函数的定义和函数的调用都不可以嵌套</Option>
                                    <Option value="d">D 函数的定义和函数的调用都可以嵌套</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="q4"
                                label="4.以下对二维数组a的声明正确的是？" //B
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Select placeholder="Please select an answer">  
                                    <Option value="a">A int a[3][]</Option>
                                    <Option value="b">B int a(3,4)</Option>  
                                    <Option value="c">C int a[1][4]</Option>
                                    <Option value="d">D int a(3)(4)</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="q5"
                                label="5.算法的计算量的大小称为计算的？" //B
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Select placeholder="Please select an answer">  
                                    <Option value="a">A 效率</Option>
                                    <Option value="b">B 复杂性</Option>  
                                    <Option value="c">C 现实性</Option>
                                    <Option value="d">D 难度</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="q6"
                                label="6.以下哪个数据结构不是多型数据类型？" //B
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Select placeholder="Please select an answer">  
                                    <Option value="a">A 栈</Option>
                                    <Option value="b">B 广义表</Option>  
                                    <Option value="c">C 有向图</Option>
                                    <Option value="d">D 字符串</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="q7"
                                label="7.以下属于逻辑结构的是？" //B
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Select placeholder="Please select an answer">  
                                    <Option value="a">A 顺序表</Option>
                                    <Option value="b">B 哈希表</Option>  
                                    <Option value="c">C 有序表</Option>
                                    <Option value="d">D 单链表</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="q8"
                                label="8.衡量一个算法好坏的标准是？" //B
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Select placeholder="Please select an answer">  
                                    <Option value="a">A 运行速度快</Option>
                                    <Option value="b">B 占用空间少</Option>  
                                    <Option value="c">C 时间复杂度低</Option>
                                    <Option value="d">D 代码短</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="q9"
                                label="9.什么叫做二叉树？"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter answer description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="please enter answer description" />
                            </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
}
export default Courseinf