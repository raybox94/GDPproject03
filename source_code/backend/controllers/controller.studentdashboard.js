const _ = require('lodash');
var { mongoose } = require('./../config/database')
var { CourseStudentModel } = require('../model/model.coursestudent');
var express = require('express');
var { CourseModel } = require('../model/model.course');

let getstudentDetails = (req, res) => {
    console.log("hhjkhjkhjkhjkh " + req.params.emailID);


    CourseStudentModel.find({ EmailKey: req.params.emailID }, function (err, course) {
        if (err) {

            res.send(err)
        }

        return res.send(course);
    });
}