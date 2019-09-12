import Typography from '@material-ui/core/Typography';
import React, { useState, Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { green, lightGreen, red, grey } from '@material-ui/core/colors';
import {
    Paper, Grid, Button, FormControl, InputLabel,
    MenuItem, OutlinedInput, Select, Box, Snackbar, IconButton
} from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import API from '../../utils/API'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';
import { flexbox } from '@material-ui/system';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

//Add style here

export default function EditCourse(props) {



    return (
        <Container component="main" maxWidth="xs">
             <div className={classes.paper}>
                <form enctype="multipart/form-data" onSubmit={handleSubmit} className={classes.form} >
                <TextField className={classes.textField}
                        variant="outlined"
                        required
                        fullWidth
                        id="courseName"
                        label="Course Name"
                        name="courseName"
                        autoComplete="courseName"
                        autoFocus
                        margin="dense"
                        onChange={handleChange('courseName')}
                        value={course.courseName}
                    />
                    <input
                        accept=".csv"
                        className={classes.input}
                        id="text-button-file"
                        multiple
                        type="file"
                        ref={fileLabel}
                        onChange={handleFileChange}
                    /> 



                </form>
            </div>
    </Container>
    );
}