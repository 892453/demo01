import React, { useState } from 'react'
import { Breadcrumb } from 'antd';
import {
    HighlightOutlined,
    InfoCircleOutlined

} from '@ant-design/icons';

function addCourse(){

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
                    <span>添加课程</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div>添加课程</div>
        </div>
    )


}

export default addCourse