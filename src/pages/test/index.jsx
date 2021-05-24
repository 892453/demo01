import axios from 'axios';
import React,{useEffect} from 'react'
import Draggable from 'react-draggable';
import Websocket from 'react-websocket';

function Test() {

    function onmessage(e){
        console.log("服务端发来数据：",e.data);
    }
    function onopen(){
        console.log('websocket 打开成功');    
    }
    function onclose(){
        console.log("websocket 连接关闭");
    }

    useEffect(()=>{
        axios.get("http://pv.sohu.com/cityjson?ie=utf-8").then(res=>{
            console.log(res)
        })
    })


    return (
        <div>
            <Draggable>

                <div>哈哈哈哈哈哈哈哈哈</div>
                
            </Draggable>

            <Websocket
                url='ws://192.168.0.115:7001/hello'
                onMessage={onmessage}
                onOpen={onopen}
                onClose={onclose}
                reconnect={true}
                debug={true}
            >

            </Websocket>
       </div>

    )
}
export default Test