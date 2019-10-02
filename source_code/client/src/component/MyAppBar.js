import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom"

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar:{
      background: green[600]
  }
  
});


class MyAppBar extends Component{

  constructor(props){
    super(props)
    this.state = {
      isLoggedIn:this.props.isLoggedIn,
      anchorEl:null,
      logout:false
    }

  }

render(){
 const {classes} = this.props
  //const [auth, setAuth] = React.useState(true);
 

  const open = Boolean(this.state.anchorEl); 


  const logout = (event) => {
   sessionStorage.removeItem('token')
  this.setState({
    logout: true
  })
   }

  function handleMenu(event) {
    this.setState({
      anchorEl: (event.currentTarget)
  })
}

  function handleClose() {
    this.setState({
      anchorEl: null
  })
  }

  if(this.state.logout){
    return (<Redirect to='/'></Redirect>)
  }

  return (
    <div className={classes.root}>
    
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CODEWORD
          </Typography>
          { this.state.isLoggedIn? 
            <div>
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
              <Button onClick={logout} color="inherit">Logout</Button>
            </div>
          :null}
        </Toolbar>
      </AppBar>
    </div>
  );
 }
}
export default withStyles(useStyles)(MyAppBar);