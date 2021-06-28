import axios from 'axios'
import React,{useState,useEffect,useCallback,useRef} from 'react'
import * as THREE from "three"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import Websocket from 'react-websocket';


export default function Head() {

    const Body=useRef()
    const Scene=useRef(new THREE.Scene()).current   //场景
    const Camera=useRef(new THREE.PerspectiveCamera()).current  //透视相机
    const Render=useRef(new THREE.WebGLRenderer({antialias:true})).current  //渲染器  antialias - 是否执行抗锯齿
    const Meshs=useRef([]).current              //用于一个场景内添加多个物体
    const lights=useRef([]).current             //一个场景添加多个灯光
    const Isdowm=useRef(false)              //判断鼠标是否按下，默认false（未按下）
    const PI=useRef(15)
    const R=useRef(90)
    const id=useRef(null)

   

    //加载模型
    const loadermodel=useCallback(()=>{  
        const loader=new FBXLoader()
        
        loader.setPath('/static/')
        loader.load("HAIR.fbx",(obj)=>{
            //console.log(obj)
            obj.position.set(0, 0,0)
            obj.scale.set(0.02,0.02,0.02)
            
            
            Meshs.push(obj)
            Scene.add(obj)

        })
    },[])


    //创建灯光函数
    const createlioght=useCallback(()=>{
        //太阳光
        const dirLight=new THREE.DirectionalLight("#ffffff",0.5)          //平行光
        dirLight.position.set(100,100,100)          //灯光位置
        //环境光
        const amblight=new THREE.AmbientLight("#ffffff",0.5)

        Scene.add(dirLight,amblight)
        lights.push(dirLight,amblight)
    },[])

    //按下
    const dowm=useCallback(()=>{
        Isdowm.current=true;
    },[])
    //抬起
    const up=useCallback(()=>{
        Isdowm.current=false;
    },[])
    //鼠标移动
    const move=useCallback((event)=>{
        if(Isdowm.current==false)return
        //console.log(event)
        R.current+=event.movementX*0.5
        const x=PI.current*Math.cos(R.current/180*Math.PI)
        const y=Camera.position.y+event.movementY*0.1
        const z=PI.current*Math.sin(R.current/180*Math.PI)

        Camera.position.set(x,y,z)
        Camera.lookAt(0,0,0)
    },[])

    const init=useCallback(()=>{
        Render.setSize(Body.current.offsetWidth,Body.current.offsetHeight)
        //设置相机参数
        Camera.aspect=Body.current.offsetWidth / Body.current.offsetHeight
        Camera.fov=45
        Camera.near=1
        Camera.far=1000
        Camera.position.set(0,0,PI.current)     //相机的位置
        Camera.lookAt(0,0,0)            //相机的注视点
        Camera.updateProjectionMatrix()
    },[Render,Body])

    //创建立方体
    const createRect=useCallback(()=>{
        const rect=new THREE.BoxBufferGeometry(2,2,2)                       //设置【物体】框架 向量
        const meshBasicMater=new THREE.MeshBasicMaterial( {color: 0x00ff00}  )     //选择【材质】:MeshBasicMaterial基础网格材质
        const mesh =new THREE.Mesh(rect,meshBasicMater)                     //mesh代表网格：由【物体】和【材质】组成
        mesh.position.set(0,0,0)
        Scene.add(mesh)             //添加到场景中
        Meshs.push(mesh)
    },[])

    //创建3d文字
    const create3dword=useCallback(()=>{
        var loader = new THREE.FontLoader();
        const lambert=new THREE.MeshLambertMaterial({color:"blue"})
        
        loader.load("fonts/helvetiker_regular.typefacesss.json", function ( font ) {
            var geometry = new THREE.TextGeometry( 'three.js!', {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelSegments: 5
            } );
           const mesh =new THREE.Mesh(lambert,geometry) 
           mesh.position.set(0,0,0)
           Scene.add(mesh)           
           Meshs.push(mesh)
        } );
       
       
    })

    //创建线条
    // const createLine=useCallback(()=>{
    //     const lineMater=new THREE.LineBasicMaterial()
    //     var geomatry = new THREE.GeometryUtils
    //     for(let i=0;i<5000;i++){
    //         const x=Math.random()*2-1
    //         const y=Math.random()*2-1
    //         const z=Math.random()*2-1
    //         geomatry.vertices.push(new THREE.Vector3(x,y,z))
    //     }
    //     const mesh=new THREE.Line(geomatry,lineMater)
    //     mesh.position.set(4,0,0)
    //     Scene.add(mesh)
    //     Meshs.push(mesh)
    // })

    // 创建Lambert网格材质立方块
    const createLambert=useCallback=>{
        const lambert=new THREE.MeshLambertMaterial({color:"red"})      //材质为lambert
        const rect=new THREE.BoxBufferGeometry(2,2,2)                   //物体为立方块
        const mesh=new THREE.Mesh(rect,lambert)                         //材质和物体融合
        mesh.position.set(0,0,0)                                       //物块的位置
        Scene.add(mesh)                                                 //
        Meshs.push(mesh)
    }


    const renderScene=useCallback((a,b,c)=>{
        Render.render(Scene,Camera)
        Meshs.forEach(item=>{
            
            item.rotation.x=a*1/180*Math.PI
            item.rotation.y=b*1/180*Math.PI
            item.rotation.z=c*1/180*Math.PI
            console.log(item.rotation.x,item.rotation.y,item.rotation.z) 
          
        })

        //场景中的物体旋转起来
        // Meshs.forEach(item=>{
            
        //    item.rotation.y+=1/180*Math.PI
           
        //     console.log(item.rotation.x,item.rotation.y,item.rotation.z) 
          
        // })
       
        //id.current=window.requestAnimationFrame(()=>renderScene())       //帧循环函数
        //记录当前的循环速度
    },[Render,Meshs])

    //画布修改时更改画面大小
    const setView=()=>{
        Render.setSize(document.body.clientWidth,document.body.clientHeight)
        Camera.aspect=Body.current.offsetWidth / Body.current.offsetHeight
        Camera.updateProjectionMatrix()
    }


    useEffect(()=>{
        
        Body.current.append(Render.domElement)
        init()
        createlioght()          //创建灯光
        //createLambert()       //3维正方块
        //create3dword()        //3维字
        loadermodel()       //加载模型
       

     

       /** 发送axios请求获取头部姿态数据
        *  现在修改为使用websocket的onmessage()函数来请求数据，然后用renderscene()函数修改头部姿态
            axios.get("/headrotate.json").then((res)=>{
            var num=res.data.length
            var i=0
            var int=setInterval(() => {
                renderScene(res.data[i][0],res.data[i][2],res.data[i][1]);
                i++;
                if(i===num){
                    clearInterval(int)
                }
                
            },1000/10)
        
        
        }) */
       

        document.addEventListener('resize',setView)
        
    
        return ()=>{   
            document.removeEventListener('resize',setView)  //取消窗口大小监听
            cancelAnimationFrame(id.current)        //对帧循环函数进行取消
            Meshs.forEach(item=>{
                Scene.remove(item)
                // item.geometry.dispose()         //销毁【物体】
                // item.material.dispose()         //销毁【材质】
            })
            lights.forEach(item=>{
                Scene.remove(item)
            })
            Render.dispose()                    //销毁【渲染器】
            Scene.dispose()                     //销毁【场景】
            //clearInterval(int)
        }
    },[])

    function onmessage(e){
        //console.log(e)
        const tmp=eval(e)
        renderScene(tmp[0],tmp[2],tmp[1])
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

    return(
        <div ref={Body} style={{width:"100%",height:"230px",paddingTop:"35px"}} onMouseDown={dowm} onMouseMove={move} onMouseUp={up}>

            <Websocket
                url='ws://127.0.0.1:5678'
                onMessage={onmessage}
                onOpen={onopen}
                onClose={onclose}
                onError={onerror}
                reconnect={true}
                debug={true}
            >
            </Websocket>
        </div>
    )
    
}