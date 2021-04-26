import React, { useEffect, useState } from 'react';
import { Breadcrumb, Form, Input, Button, Upload, message,Result} from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined,
    UploadOutlined,
    InboxOutlined,

} from '@ant-design/icons';
import "./addcourse.css"
import cookie from 'react-cookies'
//import Forbid from "../../forbid"



export default function AddCourse() {

    useEffect(()=>{
        let role=cookie.load("role")
        //console.log("判断角色："+role)
        if(role!=="true"){
            document.getElementsByClassName("add")[0].style.display="none"
            document.getElementsByClassName("noaccess")[0].style.display="display"
        }else{
            document.getElementsByClassName("add")[0].style.display="display"
            document.getElementsByClassName("noaccess")[0].style.display="none"
        }
    })

    var myDate = new Date();
    var datetime = myDate.toLocaleDateString() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds();
    console.log(datetime)

    const layout = {
        labelCol: { span: 7 },      //整个添加框向右偏移的span
        wrapperCol: { span: 10 },   //添加框所占的span
    };
    const tailLayout = {
        wrapperCol: { offset: 10, span: 2 },    //按钮向右偏移的span，所占的span
    };
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(values["coursename"], values["coursefile"].file)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //上传课程视频文件用到的
    const { Dragger } = Upload;
    var coursefilelist = []
    const props = {
        name: 'file',
        multiple: true,     //支持一次性上传多个文件
        action: 'http://www.aifixerpic.icu/upload/upload_img',
        onChange(info) {
            const { status } = info.file;
            // const {resp}=info.file.response

            if (status !== 'uploading') {
                console.log("uploading:", info.file, info.fileList);
            }
            if (status === 'done') {
                message.success("done:" + `${info.file.name} 课程文件上传成功...`);
                console.log("课程文件返回结果：" + info.file.response);
                coursefilelist.push(info.file.response)
                console.log("courselist::", coursefilelist)
                console.log(typeof (coursefilelist))
            } else if (status === 'error') {
                message.error("error" + `${info.file.name} file upload failed.`);
            }
        },
    };

    //上传封面图片
    var fengmianimg=[];
    function uploadfengmian(info) {
        const { status } = info.file;
        fengmianimg.splice(0,fengmianimg.length)    //清空数组元素,使用 fengmianimg=[] 清空数组时不行
        if (status === 'done') {
            message.success("done:" + `${info.file.name} 封面文件上传成功...`);
            console.log("封面文件返回结果：" + info.file.response);
            
            fengmianimg.push(info.file.response)
            console.log("fengmianimg::", fengmianimg)
        } else if (status === 'error') {
            message.error("error" + `${info.file.name} file upload failed.`);
        }
    }

    //验证头像文件大小（<2MB）和格式(jpg,png)
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    // function Backhome(){
    //     let history = useHistory();
    //     history.push('/');
    // }

    return (
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
                    <span>添加课程</span>
                </Breadcrumb.Item>
            </Breadcrumb>

        {/* 当进入角色为【学生】时classname===noaccess界面展示，添加课程classname===add界面隐藏；同理可得 */}
        <div className="noaccess">
            <Result
                status="403"
                title="403"
                subTitle="抱歉，添加课程页面只允许老师访问哦！"
                // extra={<Button type="primary" onClick={Backhome}>返回主页</Button>}
            />    
        </div>
        
        <div className="add">
                    <Form
                        {...layout}
                        name="basic"
                        // initialValues={
                        //                {"coursefile":{coursefilelist}},
                        //                {"fengmian":{fengmianimg}}
                                      
                        //                 }
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="课程名称"
                            name="coursename"
                            rules={[{ required: true, message: '课程名称为不能为空' }]}
                        //initialValue="kechengming"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="发布人"
                            name="uploadname"
                            rules={[{ required: true, message: '发布人不能为空' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="发布时间"
                            name="uploadtime"
                            initialValue={datetime}
                        >
                            {/* <DatePicker showTime onChange={onChange} onOk={onOk} /> */}
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="课程描述"
                            name="describle"
                            rules={[{ required: true, message: '课程描述不能为空' }]}
                        >
                            <Input />
                        </Form.Item>

                        {/* 上传课程封面 */}
                        <Form.Item
                            label="上传课程封面"
                        // name="fengmian"
                        // initialValue={fengmianimg}
                        >
                            <Upload
                                action="http://www.aifixerpic.icu/upload/upload_img"
                                name="file"
                                listType="picture"
                                maxCount={1}
                                beforeUpload={beforeUpload}
                                onChange={uploadfengmian}
                            >
                                {/* <Upload
                        {...propsfengmian}
                    > */}
                                <Button icon={<UploadOutlined />}>上传 (最多1张)</Button>
                            </Upload>
                        </Form.Item>

                        {/* 上传课程视频文件 */}
                        <Form.Item
                            label="上传课程资料"
                        >
                            <Dragger {...props}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">点击或拖动文件到此区域上传文件</p>
                                <p className="ant-upload-hint">
                                    支持单次或批量上传
                        </p>
                            </Dragger>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                发布课程
                        </Button>
                        </Form.Item>


                        {/* 上传课程封面和课程文件的value值，只能这样写了0.0 */}
                        <Form.Item
                            name="fengmian"
                            initialValue={{fengmianimg}}
                        ></Form.Item>
                        <Form.Item
                            name="coursefile"
                            initialValue={coursefilelist}
                        ></Form.Item>
                        {/* ************************************ */}
                    </Form>

               


        </div>
        </div>
    )

}