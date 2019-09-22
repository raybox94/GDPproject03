import Typography from '@material-ui/core/Typography';
import React, { useState, Component, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Appbar from '../MyAppBar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { green, lightGreen, red, grey, orange } from '@material-ui/core/colors';
import {
    Paper, Grid, Box, Slide, Button, Container, CssBaseline, Snackbar, CircularProgress,
    IconButton, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Tooltip
} from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import API from '../../utils/API'
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Redirect } from "react-router-dom";
import MaterialTable from 'material-table';  
import { forwardRef } from 'react';
import EditCourse from '../instructor/EditCourse'
import CloseIcon from '@material-ui/icons/Close';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Report from './Report'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LockIcon from '@material-ui/icons/Lock';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EditCodewordSet from './EditCodewordSet';
import MyAppBar from '../MyAppBar';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 20,
        flexGrow: 1,
        //  background: theme.palette.background.paper,
        background: lightGreen[200],
        minHeight: 500

    },
    header: {
        background: green[300],
        border: 1,
        borderRadius: 5,
        minHeight: 40

    },
    course: {
        margin: theme.spacing(4),
        background: grey[100],
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: grey[400],
        borderRadius: 10,
        minHeight: 100,
        maxWidth: 800,
        padding: theme.spacing(2)
    },
    table: {

        padding: theme.spacing(4),
        maxWidth: 600

    },
    assign: {
        margin: theme.spacing(1),
        background: lightGreen[500],
        "&:hover": {
            backgroundColor: "green"
        }
    },
        edit: {
        background: green[400],
        margin: theme.spacing(1),
        color: grey[900]
    },
    delete: {
        margin: theme.spacing(1),
        background: red[700],
        "&:hover": {
            backgroundColor: red[600]
        }
    },
    report: {
        margin: theme.spacing(5),
        background: lightGreen[100],

    },
    iconButton:{
        background: grey[300],
        margin: theme.spacing(1),
        color: grey[900]
    },
    iconButtonDelete:{
        background: grey[300],
        margin: theme.spacing(1),
        color: red[900]
    },
    appBar: {
        borderRadius: 5,
        background: green[600]
    },
    paper: {
        borderRadius: 5,
        paddingBottom: 20
    },
    paper2: {
        padding: 10,
        margin: 10,
        background: lightGreen[200]
    },
    title: {
        padding: 10
    },
    banner1: {
        background: lightGreen[200],
        padding: 5,
        marginTop: 5
    },
    banner2: {
        background: red[200],
        padding: 5,
        marginTop: 5

    }
 }));                           
                           

export default function CodewordSet(props) {
    const classes = useStyles();
	
    const [state, setState] = useState({
        id: props.match.params.id,
        codewordSetName: '',
    })

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const [snack, setSnack] = useState({
        message: '',
        open: false
    })
    const [table, setTable] = useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' }
        ],
        data: [],
    })
    const [open, setOpen] = useState(false)
    const [render, setRender] = useState(false)
    const [disableEdit, setDisableEdit] = useState(false)
    const [openReport, setOpenReport] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const [loading, setLoading] = useState(false)
                           
    useEffect(() => {
        setLoading(true)
        const headers = {
            'token': sessionStorage.getItem('token')
        };
        API.get('dashboard/getacodewordset/' + props.match.params.id, { headers: headers }).then(response => {
            console.log('👉 Returned data in :', response);

            if (response.status == 200) {
                console.log(response.data)
                var codewordSet = response.data.data
                var codewords = codewordSet.codewords.map((item) => {
                    return { codeword: item }
                })

                setTable({
                    columns: [
                        { title: 'Codeword', field: 'codeword' },
                    ],
                    data: codewords
                })

                setState({
                    id: codewordSet._id,
                    codewordSetName: codewordSet.codewordSetName,
                    count: codewordSet.count,
                    isPublished: codewordSet.isPublished
                })
                console.log(codewordSet)
                if (codewordSet.isPublished) {
                    setDisableEdit(true)
                }
            }
            setLoading(false)
        })
            .catch(error => {
                console.log(error)
            })
    }, [render])
    
    }                           
                           
                           
                           
                           
                           
