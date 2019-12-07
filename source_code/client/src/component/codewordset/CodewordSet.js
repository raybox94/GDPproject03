import { Box, Button, CircularProgress, Container, CssBaseline, Dialog, 
    DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, 
    IconButton, Slide, Snackbar, Tooltip, Fab, TextField } from '@material-ui/core';
import { green, grey, lightGreen, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddBox from '@material-ui/icons/AddBox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { default as Edit, default as EditIcon } from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockIcon from '@material-ui/icons/Lock';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import history from '../../history';
import API from '../../utils/API';
import MyAppBar from '../MyAppBar';
import EditCodewordSet from './EditCodewordSet';
import Report from './Report';
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
        paddingBottom: theme.spacing(4),
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
        margin: theme.spacing(2, 0, 0, 0),
    },
    iconButton: {
        background: grey[300],
        margin: theme.spacing(2, 0, 0, 2),
        color: grey[800],
        "&:hover": {
            backgroundColor: grey[400]
        }
        },
    iconButtonDelete: {
        background: grey[300],
        margin: theme.spacing(2, 2, 2, 2),
        "&:hover": {
            backgroundColor: grey[400]
        },
        color: red[800]
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
         newCodeword: ''

    })

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const [snack, setSnack] = useState({
        message: '',
        open: false
    })
   
    const [addCodewordDialog, setAddCodewordDialog] = useState({
        open: false,
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
    const [redirect, setRedirect] = useState(false)
    const [pageSize, setPageSize] = useState(5)
    
    useEffect(() => {
        var pageSize = parseInt(sessionStorage.getItem('pageSizeCodewordset', 5))
        setPageSize(pageSize)
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

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        // var pageSize = parseInt(sessionStorage.getItem('pageSizeCodewordset', 5))
        sessionStorage.setItem('pageSizeCodewordset', 5)

        return function cleanup(){
            sessionStorage.setItem('pageSizeCodewordset', 5)
        }
    }, [])

    const handleCardClick = () => {
        console.log('click working')
        setRedirect(true)

    }


    const handleMessageClose = () => {

        setSnack({
            message: '',
            open: false
        })
    }

    const checkCodeword = (codeword) => {
        console.log('check')
        let codewords = table.data.map((item) => {
            return item.codeword
        })
        console.log(codewords)
        codewords.push(codeword)
        console.log(codeword.length)
        var letters = /[/\s/\t/!@#$%^&*(),.?":;'{}|<>0-9\\\\]/
        let duplicateWords = codewords.filter((item, index) =>
            codewords.indexOf(item) !== index
        )
        console.log(duplicateWords)
        if (codeword.length < 3) {
            return 'Codeword less than 3 letters'
        }

        else if (codeword.search(letters) != -1) {
            return 'Codeword contains invalid character'
        }
        else if (duplicateWords.length > 0) {
            return 'Codeword already present'
        } else {
            return 'true'
        }



    }

    const addCodewordRow = (resolve, newData) => {
        var data = {
            id: props.match.params.id,
            codeword: newData.codeword.trim().toLowerCase(),
        }
        const headers = {
            'token': sessionStorage.getItem('token')
        };
        console.log(newData)
        var check = checkCodeword(data.codeword)
        if (check === 'true') {
            API.post('dashboard/addcodeword', data, { headers: headers }).then(response => {
                console.log(response.data)
                if (response.data.code == 200) {
                    setSnack({
                        message: response.data.message,
                        open: true
                    })
                    const data = [...table.data];
                    data.push(newData);
                    setTable({ ...table, data });
                    console.log('render' + render)
                  //  setRender(!render)
                    resolve()
                } else {
                    setSnack({
                        message: response.data.message,
                        open: true
                    })
                    resolve()
                }
            })
        } else {
            setSnack({
                open: true,
                message: check
            })
            resolve()
        }
    }

       const addCodewordRowNew = (event) => {

        event.preventDefault()
        var data = {
            id: props.match.params.id,
            codeword: state.newCodeword.trim().toLowerCase(),
        }
        const headers = {
            'token': sessionStorage.getItem('token')
        };

        var check = checkCodeword(data.codeword)
        if (check === 'true') {
            API.post('dashboard/addcodeword', data, { headers: headers }).then(response => {
                console.log(response.data)
                if (response.data.code == 200) {
                    setSnack({
                        message: response.data.message,
                        open: true
                    })
                    const data = [...table.data];
                    data.push(state.newCodeword);
                    setTable({ ...table, data });
                    console.log('render' + render)
                  //  setRender(!render)

                } else {
                    setSnack({
                        message: response.data.message,
                        open: true
                    })

                }
            })
        } else {
            setSnack({
                open: true,
                message: check
            })

        }
    }

        
