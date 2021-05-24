import React, { useEffect, useState, useRef } from 'react'
//import Draggable from 'react-draggable';

export default function Video() {

    useEffect(() => {
        //访问用户媒体设备的兼容方法
        function getUserMedia(constraints, success, error) {
            if (navigator.mediaDevices.getUserMedia) {
                //最新的标准API
                navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
            } else if (navigator.webkitGetUserMedia) {
                //webkit核心浏览器
                navigator.webkitGetUserMedia(constraints, success, error)
            } else if (navigator.mozGetUserMedia) {
                //firfox浏览器
                navigator.mozGetUserMedia(constraints, success, error);
            } else if (navigator.getUserMedia) {
                //旧版API
                navigator.getUserMedia(constraints, success, error);
            }
        }

        let video = document.getElementById('video');
        // let canvas = document.getElementById('canvas');
        // let context = canvas.getContext('2d');

        function success(stream) {
            //兼容webkit核心浏览器
            let CompatibleURL = window.URL || window.webkitURL;
            //将视频流设置为video元素的源
            console.log(stream);

            //video.src = CompatibleURL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        }

        function error(error) {
            console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
        }

        if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
            //调用用户媒体设备, 访问摄像头
            getUserMedia({ video: { width: 480, height: 320 } }, success, error);
        } else {
            alert('不支持访问用户媒体');
        }

        //拍照按钮部分
        // document.getElementById('capture').addEventListener('click', function () {
        //     context.drawImage(video, 0, 0, 480, 320);
        // })
    })

    return (
        <div>
        {/* <Draggable>  */}
        <div>
            {/* video标签里的【control参数】可以设置暂停按钮 <video id="video" width="480" height="320" controls>  */}
           
            <video id="video" width="100%" height="300px" >  
            </video>
            {/* <div>
                <button id="capture">拍照</button>
            </div>*/}
        </div>

        {/* </Draggable> */}
        {/* <canvas id="canvas" width="480" height="320" style={{background:"red"}}></canvas>  */}
        </div>
    )
}