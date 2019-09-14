import Typography from '@material-ui/core/Typography';
import React, { useState, Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { green, lightGreen, red } from '@material-ui/core/colors';
import { Paper, Grid } from '@material-ui/core';
import CourseCard from './CourseCard'
import CodewordsetCard from '../codewordset/CodewordsetCard'
import AddCodewordSet from '../codewordset/AddCodewordSet'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button'
import AddCourse from './AddCourse'
import {CircularProgress} from '@material-ui/core'
import API from '../../utils/API'

const useStyles = makeStyles(theme => ({
    root: {
        margin: 30,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        background: green[600]
    },
    paper: {
        paddingBottom: 20
    },
    paper2: {
        padding: 20,
        margin: 20,
        background: lightGreen[200]
    },
    title: {
        padding: 10
    },
    banner1: {
        background: lightGreen[200],
        paddingLeft: 20
    },
    banner2: {
        background: red[200],
        padding: 10

    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
    button: {
        marginBottom: theme.spacing(2)
    }
}));

export default function InstructorDashboard() {


    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const classes = useStyles();
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                <Box bgcolor={lightGreen[100]} height={500} p={3}>{children}</Box>
            </Typography>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const [render, setRender] = useState(false);
    const [renderCodewordSet, setRenderCodewordSet] = useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = value => {
        setOpen(false)
    };

    const [courseData, setCourseData] = useState([{}])
    const [codewordsetData, setCodewordsetData] = useState([{}])
    const [openCodeword, setOpenCodeword] = useState()

    const handleCodewordClickOpen = () =>{
        setOpenCodeword(true)
    }

    const handleCodewordClose = () => {
        setOpenCodeword(false)
    }

    
    const listCodewordSet = codewordsetData.map((item) => {
        return true
    })
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Tabs variant='fullWidth' centered={true} value={value} onChange={handleChange} aria-label="simple tabs example" >
                    <Tab label="Course" {...a11yProps(0)} />
                    <Tab label="Codeword" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            {loading && <CircularProgress size={68} className={classes.fabProgress} />}
            <TabPanel value={value} index={0}>

                <Button variant="contained" color="primary" className={classes.button} onClick={handleClickOpen}>
                    Add Course
                </Button>
               

            </TabPanel>
            <TabPanel value={value} index={1}>
           
        </TabPanel>

        </div>

    );

}
