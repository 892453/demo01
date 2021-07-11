import React, { createContext , useReducer } from 'react';

export const CourseContext = createContext({})
export const UPDATE_COURSEID="UPDATE_COURSEID"

const store={
    courseid:""
}

const reducer=(state,action)=>{
    switch(action.type){
        case UPDATE_COURSEID:
            return {courseid:action.courseid}
        default:
            return state
    }
}

export const Course = props=>{
    const [state,dispatch]=useReducer(reducer,store)
    return (
        <CourseContext.Provider value={{state,dispatch}}>
            {props.children}
        </CourseContext.Provider>
    )
}