import React, { useEffect, useState } from 'react'
import "./coursedetail.css"
import {Row,Col} from "antd"

export default function coursedetail() {
    return (
        <div >
            {/* 左半部分 */}
            <Row >
              <Col span={24}>
                  <video style={{width:"100%"}} src="http://www.aifixerpic.icu/music/download_mp3?filename=比赛回顾.mp4" controls></video>
              </Col>
                
            </Row>


        </div>
    )
}