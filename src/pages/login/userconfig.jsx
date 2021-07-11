import React, { createContext } from 'react';

export const userContext = createContext({})

export const User = props=>{
    return (
        <userContext.Provider value={{username:"zq"}}>
            {props.children}
        </userContext.Provider>
    )
}
