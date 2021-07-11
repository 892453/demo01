import React, { Component } from 'react';
import { Course } from './courseid';
import Coursedetail from "./coursedetail"
import Courselist from './courselist';

export default function Courses(){
    return(
        <Course>
            <Courselist />
            {/* <Coursedetail/> */}
        </Course>
    )
}