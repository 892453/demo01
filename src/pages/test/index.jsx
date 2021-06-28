//import axios from 'axios';
import React,{useEffect,useRef} from 'react'
import Draggable from 'react-draggable';
import Websocket from 'react-websocket';
import {Row,Col,Alert} from "antd"

function Test() {

    const videoRef=useRef(null);
    const mes=useRef(null)

    const socket = new WebSocket('ws://127.0.0.1:5678');
    function onmessage(e){
        //console.log(e)
        console.log("服务端发来数据：",e);
        socket.send("get it！")
    }
    function onopen(){
        console.log('websocket 连接成功');    
    }
    function onclose(){
        console.log("websocket 连接关闭");
    }
    function onerror(e){
        console.log("发生错误"+e)
    }

    useEffect(()=>{
        // axios.get("http://pv.sohu.com/cityjson?ie=utf-8").then(res=>{
        //     console.log(res)
        // })
        console.log(videoRef.current)

        videoRef.current.addEventListener('pause',()=>{
            //console.log("视频暂停了")
            var video = document.getElementById('myvideo')
            console.log("当前播放进度：",video.currentTime,"/",video.duration)
            //console.log("视频url：",video.currentSrc)
        })
        videoRef.current.addEventListener('play',()=>{
            console.log("视频正在播放...")
        })
        videoRef.current.addEventListener('canplay', function(e) {
            console.log('提示该视频已准备好开始播放')
            console.log(e)
          })
        videoRef.current.addEventListener('seeked', function(e) {
            console.log('进度条已经移动到了新的位置')
            console.log(e)
        })
        videoRef.current.addEventListener('ended', function(e) {
            console.log('视频播放完成')
            console.log(e)
        })
      
       
        

    })
    //获取键盘按键信息
    useEffect(()=>{
        
        document.onkeydown=function(event){
            //console.log(event.key,"被按下")
            mes.current.value=event.key+"被按下"
            //console.log(mes)
            if (event.altKey) {
                mes.current.value='alt is active'
                //console.log('alt is active');

            }
            if (event.shiftKey) {
                mes.current.value='shift is active'
                //console.log('shift is active');
            }
        }
        document.onclick=function(event){
            mes.current.value="鼠标点击坐标：" + "("+event.clientX+","+event.clientY+")"
            //console.log("鼠标点击坐标：",event.clientX,event.clientY)
        }
        
    })



    return (
        <div>
            <Draggable>

                <div>哈哈哈哈哈哈哈哈哈</div>
                
            </Draggable>

            <Websocket
                url='ws://127.0.0.1:5678'
                onMessage={onmessage}
                onOpen={onopen}
                onClose={onclose}
                onError={onerror}
                reconnect={true}
                debug={true}
            />
        <Row justify="center">
                <Col span={5}>
                    <input ref={mes} style={{width:"100%"}} type="text" />
                </Col>
            </Row>

            <Row justify="center">
              <Col span={6}>
                <video 
                    ref={videoRef} 
                    id="myvideo" 
                    poster="/static/pic/poster.jpg"
                    style={{width:"100%",height:"100%"}} 
                    // src="http://www.aifixerpic.icu/music/download_mp3?filename=比赛回顾.mp4" 
                    src="/static/pic/game.mp4" 
                    controls muted preload  controlslist="nodownload"
                >
                </video>
              </Col>
            </Row>

            

            
       </div>

    )
}
export default Test