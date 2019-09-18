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
    
  
  async getData(){
        console.log('getdata')
        const headers = {
            'Content-Type': 'application/json',
            'token':  this.state.token
          };
  
   console.log(headers)
         try {
            const response = await API.get('dashboard/details', {headers});
            console.log('👉 Returned data in :', response);
            console.log(response.data)
            if(response.status == 200){
            this.setState( {
              id: response.data.email_id,   
              role: response.data.role,
              name: response.data.first_name + ' ' + response.data.last_name
            })
            console.log('dashbaord : '+ this.state.role)
            
        }else {
        
        }
          } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
          }    
    }
   componentDidMount(){
        this.getData()
    }
    render(){
        const { match, location, history } = this.props;
    return(
        <div>
              <Appbar isLoggedIn = {true}></Appbar> 
            {this.state.role == 'admin'?
            <Admin></Admin>:
            this.state.role == 'instructor'?
            <Instructor></Instructor>:
            <Student></Student>}
        </div>
    );
    }
   
}
export default withRouter(Dashboard);
