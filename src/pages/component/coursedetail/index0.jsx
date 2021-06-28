import React from 'react'
import "./coursedetail.css"

export default function coursedetail() {
    return (
        <div >
            {/* 左半部分 */}
            <div className="content_left">
                <video className="learn_video" src="http://www.aifixerpic.icu/music/download_mp3?filename=比赛回顾.mp4" controls></video>
            </div>

            {/* 右半部分 */}

            <div className="content_right">
                {/* 课程信息部分 */}
                <div className="cour_info">
                    <div className="subtitle">
                        课程信息
                    </div>
                    <img src="https://p.ananas.chaoxing.com/star3/origin/6ce77a10dd3268daa7ba6c93e5e76459.jpg" className="cour_pic" alt=""></img>
                    <div className="cour_info_content">
                        <dl className="dl">

                            <dt>课程名称：高等数学</dt>
                            <dt>课程类型：必修课</dt>
                            <dt>发布人：刘某</dt>
                            <dt>发布时间：2020-2-10</dt>
                        </dl>
                    </div>
                </div>

                {/* 课程描述部分  */}
                <div className="cour_des">
                    <div className="subtitle">
                        课程描述
                    </div>
                    <div className="des_content">
                            高等数学是由微积分学，较深入的代数学、几何学以及它们之间的交叉内容所形成的一门基础学科。
                            主要内容包括：数列、极限、微积分、空间解析几何与线性代数、级数、常微分方程。
                        </div>
                </div>

            </div>

        </div>
    )
}