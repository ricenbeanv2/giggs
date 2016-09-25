const router = require('express').Router();
const applicantController = require('../applicant/applicantCtrl');
const categoryController = require('../category/categoryCtrl');
const jobController = require('../job/jobCtrl');
const userController = require('../user/userCtrl');
const checkEmail = require('../config/middleware').checkEmail;
const checkUsername = require('../config/middleware').checkUsername;

router.post('/applicant/apply', applicantController.applyJob);
router.post('/applicant/cancel', applicantController.cancelApplied);
router.post('/applicant/updateBid', applicantController.updateBid);
router.get('/applicant/', applicantController.getApplicants);

//router.post('/category/create', categoryController.propagateCategories);
router.get('/category/getAll', categoryController.getAllCategories);
router.get('/category/query', categoryController.queryCategory);

router.post('/jobs/create', jobController.createJob);
router.get('/jobs/getAll', jobController.getAllJobs);
router.get('/jobs/query', jobController.queryJob);

router.get('/users/:id', userController.getUserInfo);
router.post('/users/update', checkEmail, checkUsername, userController.updateUser);

module.exports = router;
