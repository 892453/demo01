import React, { createContext , useReducer } from 'react';

export const ColorContext = createContext({})
export const UPDATE_COLOR="UPDATE_COLOR"
export const UPDATE_USERNAME="UPDATE_USERNAME"
export const ADD_AGE="ADD_AGE"
export const SUB_AGE="SUB_AGE"

const store={
    color:"blue",
    username:"zq",
    age:22
}

const reducer=(state,action)=>{
    switch(action.type){
        case UPDATE_COLOR:
            return {state,color:action.color}
        case ADD_AGE:
            return {state,age:state.age+1}
        case SUB_AGE:
            return {state,age:state.age-1}
        default:
            return state
    }
}

export const Color = props=>{
    const [state,dispatch]=useReducer(reducer,store)
    return (
        <ColorContext.Provider value={{state,dispatch}}>
            {props.children}
        </ColorContext.Provider>
    )
}