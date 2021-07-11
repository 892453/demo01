// 个人信息页面的个人资料内容
import React from "react";
import { Card, Button, Input } from 'antd';
import {
    PhoneOutlined, UserOutlined, BookOutlined, MailOutlined, AuditOutlined

} from '@ant-design/icons';
function userinfoContent() {
    const userinfo = { "userName": "wjl", "phoneNumber": "11111", "jobNumber": "17130130261", "identity": "student", "email": "1262872957@qq.com" }
    const gridStyle = {
        width: '80%',
        marginLeft: '130px',
    };
    const iconStyle = {
        fontSize: '25px',
    }
    return (
        <div id="personinfo" style={{ marginTop: '18px' }}>
            <Card style={{ fontSize: '18px'}}>
                <Card.Grid style={{ width: '100%', textAlign: 'left', fontFamily: 'SimHei', fontSize: '20px' }}>个人资料详情</Card.Grid>
                {/* 用户真实姓名 */}
                <Card.Grid style={gridStyle}>
                    <UserOutlined style={iconStyle} />&nbsp;userName : &nbsp;&nbsp;&nbsp;&nbsp;
                    <Input style={{ width: '40%' }} defaultValue={userinfo.userName}></Input>
                </Card.Grid>
                {/* 手机号:利用readonly属性，不可更改手机号*/}
                <Card.Grid style={gridStyle}>
                    <PhoneOutlined style={iconStyle} />&nbsp;phoneNumber :&nbsp;&nbsp;&nbsp;&nbsp;
                    <Input style={{ width: '40%' }} defaultValue={userinfo.phoneNumber} readOnly="readonly"></Input>
                </Card.Grid>
                {/* 工号 */}
                <Card.Grid style={gridStyle}>
                    <BookOutlined style={iconStyle} />&nbsp;jobNumber :&nbsp;&nbsp;&nbsp;&nbsp;
                    <Input style={{ width: '40%' }} defaultValue={userinfo.jobNumber}></Input>
                </Card.Grid>
                {/* 身份 */}
                <Card.Grid style={gridStyle}>
                    <AuditOutlined style={iconStyle} />&nbsp;identity :&nbsp;&nbsp;&nbsp;&nbsp;
                    <Input style={{ width: '40%' }} defaultValue={userinfo.identity}></Input>
                </Card.Grid>
                {/* 电子邮件 */}
                <Card.Grid style={gridStyle}>
                    <MailOutlined style={iconStyle} />&nbsp;email :&nbsp;&nbsp;&nbsp;&nbsp;
                    <Input style={{ width: '40%' }} defaultValue={userinfo.email}></Input>
                </Card.Grid>
                <div style={{ textAlign: 'center' , marginBottom:'40px'}}>
                    <Button type='primary' style={{ fontSize: '18px' }}>commit</Button>
                </div>
            </Card>
        </div>
    )
}
export default userinfoContent;