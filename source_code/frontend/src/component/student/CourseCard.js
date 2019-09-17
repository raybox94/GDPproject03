import Typography from '@material-ui/core/Typography';
import React, { useState, Component, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { green, lightGreen, grey } from '@material-ui/core/colors';
import { Paper, Grid, Button, Zoom, IconButton, Tooltip, Box, Link} from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import API from '../../utils/API'
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Redirect } from "react-router-dom";
import FileCopyIcon from '@material-ui/icons/FileCopy';


const useStyles = makeStyles(theme => ({
    root: {
        margin: 30,
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        borderRadius: 5,
        background: green[600]
    },
    paper: {
        borderRadius: 5,
        paddingBottom: 20,
        maxWidth: 300,
        minWidth: 200
    },
    paper2: {
        padding: 10,
        margin: 10,
        background: grey[200]
    },
    survey:{
        marginLeft: 10,
        marginRight: 10,
        padding:10
    },
    title: {
        padding: theme.spacing(1)
    },
    revealButton: {
        margin: theme.spacing(1)
    },
    codeword: {
        margin: theme.spacing(1)
    }

}))
    }