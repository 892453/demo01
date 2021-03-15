import React, { useState } from 'react'
import { Breadcrumb, Form, Input, Button, Upload, message } from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined,
    LoadingOutlined,
    PlusOutlined

} from '@ant-design/icons';

function getBase64(img, callback) {
    console.log("getBase64的img：",img)
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

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


export default function AddCourse() {

    var myDate = new Date();
    console.log(myDate.toLocaleString())

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 4 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const [loading, setloading] = useState(false)
    const [imageUrl, setimageUrl] = useState()

    function handleChange(info) {
        console.log("info:",info)
        console.log("status:",info.file.status)
        if (info.file.status === 'uploading') {
            setloading(true)
            return;
        }
        if (info.file.status === 'done') {
            console.log("info.file.originFileObj:",info.file.originFileObj)
            console.log("imageUrl:",imageUrl)
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
            setloading(false),
            setimageUrl(imageUrl)
            );
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


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

            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="课程名称"
                    name="coursename"
                    rules={[{ required: true, message: '课程名称为不能为空' }]}
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
                    rules={[{ required: false, message: '请使用默认时间' }]}
                >
                    <Input defaultValue={myDate.toLocaleDateString() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()} />
                </Form.Item>

                <Form.Item
                    label="课程描述"
                    name="describle"
                    rules={[{ required: true, message: '课程描述不能为空' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="上传课程封面"

                    rules={[{ required: false, message: '课程描述不能为空' }]}
                >
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="http://www.aifixerpic.icu/upload/upload_img"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>

                </Form.Item>



                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                </Form.Item>
            </Form>


        </div>
    )


}