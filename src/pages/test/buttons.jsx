import React ,{useContext} from 'react';
import {ColorContext,UPDATE_COLOR,ADD_AGE,SUB_AGE} from './color'


function Buttons(){
    const { dispatch } = useContext(ColorContext)

   

    return (
        <div>
            <button onClick={()=>{dispatch({type:UPDATE_COLOR,color:"red"})}}>红色</button>
            <button onClick={()=>{dispatch({type:UPDATE_COLOR,color:"yellow"})}}>黄色</button>
            <button onClick={()=>{dispatch({type:ADD_AGE})}}>ADD</button>
            <button onClick={()=>{dispatch({type:SUB_AGE})}}>SUB</button>
        </div>
    )
}

export default Buttons