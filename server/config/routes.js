const router = require('express').Router();
const applicantController = require('../applicant/applicantCtrl');
const categoryController = require('../category/categoryCtrl');
const jobController = require('../job/jobCtrl');
const userController = require('../user/userCtrl');
const checkEmail = require('../config/middleware').checkEmail;
const checkUsername = require('../config/middleware').checkUsername;
const helper = require('../config/helpers');

router.post('/applicant/apply', helper, applicantController.applyJob);
router.post('/applicant/cancel', helper, applicantController.cancelApplied);
router.post('/applicant/updateBid', helper, applicantController.updateBid);
router.get('/applicant/', helper, applicantController.getApplicants);

//router.post('/category/create', helper, categoryController.propagateCategories);
router.get('/category/getAll', categoryController.getAllCategories);
router.get('/category/query', categoryController.queryCategory);

router.post('/jobs/create', helper, jobController.createJob);
router.get('/jobs/getAll', jobController.getAllJobs);
router.get('/jobs/query', jobController.queryJob);

router.get('/users/:id', helper, userController.getUserInfo);
router.post('/users/update', helper, checkEmail, checkUsername, userController.updateUser);

module.exports = router;
