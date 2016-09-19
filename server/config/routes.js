var router = require('express').Router();
var applicantController = require('../applicant/applicantCtrl.js');
var categoryController = require('../category/categoryCtrl.js');
var jobController = require('../job/jobCtrl.js');
var userController = require('../user/userCtrl.js');

router.get('/applicant', applicantController.helloWorld);

router.get('/category', categoryController.helloWorld);

router.get('/db/jobs/create', jobController.helloWorld);
router.get('/db/jobs/getAll', jobController.helloWorld);

router.get('/user', userController.helloWorld);

module.exports = router;