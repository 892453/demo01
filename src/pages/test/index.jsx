import { useReducer } from "react";
import React  from 'react';
import ShowArea from "./showarea";
import Buttons from "./buttons";
import { Color } from './color'; 



/**
 * 
 * @returns 实现了usecontext
 */

export default function Test2(){

    const [count,dispatch] = useReducer((state,action)=>{   //dispatch:派发器
        switch(action){
            case "add":
                return state+1
            case "sub":
                return state-1
            default:
                return state
            }

    },0)    //此处定义count的默认值为:0

  
    return (
            <div>
                {/* <h2>当前分数{count}</h2>
                <button onClick={()=>{dispatch("add")}}>加分</button>
                <button onClick={()=>{dispatch("sub")}}>减分</button> */}
                
                <Color>
                    <ShowArea />
                    <Buttons />
                </Color>
               

            </div>
            
    )

}