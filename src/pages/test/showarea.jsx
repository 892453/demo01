import React , { useContext, useEffect } from 'react';
import { ColorContext } from './color';

function ShowArea(){
    const {state} = useContext(ColorContext)
    useEffect(()=>{
        console.log(state)
    })

    return (<div style={{color:state.color}}>
        <div>
            字体颜色为{state.color}
        </div>
        <div>
            username:{state.username}
        </div>
        <h2>
            age:{state.age}
        </h2>
     
        
        </div>)

}

export default ShowArea