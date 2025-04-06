const express = require('express');

const router = express.Router();

const StudentHttpHandler = require('../handlers/students');
const StudentServiceFactory = require('../db/factory');
const StudentController = require('../controllers/student');

const studentService = StudentServiceFactory.create('fake');
const studentController = new StudentController(studentService);

const studentHandler = new StudentHttpHandler(studentController);

router.get('/', studentHandler.getAllStudents.bind(studentHandler));

module.exports = router;
