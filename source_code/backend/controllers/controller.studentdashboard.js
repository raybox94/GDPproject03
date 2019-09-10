const _ = require('lodash');
var { mongoose } = require('./../config/database')
var { CourseStudentModel } = require('../model/model.coursestudent');
var express = require('express');
var { CourseModel } = require('../model/model.course');