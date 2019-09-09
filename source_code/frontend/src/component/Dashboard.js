import Typography from '@material-ui/core/Typography';
import React, {useState, Component} from 'react';
import API from "../utils/API";
import Admin from './admin/AdminDashboard'
import Student from './student/StudentDashboard'
import Instructor from './instructor/InstructorDashboard'
import Appbar from './MyAppBar'
import {withRouter} from 'react-router-dom'

 class Dashboard extends Component{
 
    constructor(props){
        super(props);
    this.state = {
        role:'',
        token: sessionStorage.getItem('token')
      }
    }
    
}
