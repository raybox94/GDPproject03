const _ = require('lodash');
var { CourseModel } = require('../model/model.course');
const multer = require('multer')
const csv = require('csvtojson')

var uploadFile = multer(
    {
        storage: multer.memoryStorage(),
    })
    .single('file');

const saveCourseData = (students, req, res) => {
    var body = _.pick(req.body, ['courseNameKey',
        'codeWordSetName', 'startDate', 'endDate', 'preSurveyURL', 'postSurveyURL', 'codewords']);
    //var body = req.
    console.log(body)


    var courseModel = new CourseModel({
        courseNameKey: body.courseNameKey,
        students: students,
        codewordSet: 
        { codewordSetName: body.codeWordSetName,
          codewords: body.codewords
        }, 
        Startdate: body.startDate,
        Startdate: body.startDate,
        isAssigned: false,
        createdBy: req.session.email,
        Enddate: body.endDate,
        PreSurveyURL: body.preSurveyURL,
        PostSurveyURL: body.postSurveyURL
    });
    courseModel.save().then((user) => {
        if (user)
            return res.status(200).json({ message: "Course created successfully." });
    }).catch((error) => {
        console.log(error)
        console.log(error.name + ' ' + error.code)
        if (error.name == 'MongoError' && error.code == 11000) {
            console.log('working')
            return res.status(403).json({ message: 'There was a duplicate course error' });
        }
        return res.status(403).json({ message: error.message });
    })
}

let addCourse = (req, res) => {

    uploadFile(req, res, error => {
        if (error instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (error) {
            // An unknown error occurred when uploading.
        }

        var studentList = req.file;
        console.log(studentList)
        if (studentList) {
            var data = studentList.buffer.toString();

            csv({
                noheader: true,
                output: "csv"
            })
                .fromString(data)
                .then((jsonObj) => {
                    console.log(jsonObj)

                    var students = jsonObj.map((data) => {
                        return {
                            email: data[0],
                            isRevealed: false,
                            codeword: ''
                        }
                    })
                    console.log(students)
                    saveCourseData(students, req, res)
                })

        } else {
            console.log(req.body)
            saveCourseData([], req, res)
        }

    })

}
module.exports.addCourse = addCourse;