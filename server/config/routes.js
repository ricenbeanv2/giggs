const router = require('express').Router();
const applicantController = require('../applicant/applicantCtrl');
const categoryController = require('../category/categoryCtrl');
const jobController = require('../job/jobCtrl');
const userController = require('../user/userCtrl');
const checkEmail = require('../config/middleware').checkEmail;
const checkUsername = require('../config/middleware').checkUsername;

router.post('/db/applicant/apply', applicantController.applyJob);
router.post('/db/applicant/cancel', applicantController.cancelApplied);
router.post('/db/applicant/updateBid', applicantController.updateBid);
router.get('/db/applicant/', applicantController.getApplicants);

//router.post('/db/category/create', categoryController.propagateCategories);
router.get('/db/category/getAll', categoryController.getAllCategories);
router.get('/db/category/query', categoryController.queryCategory);

router.post('/db/jobs/create', jobController.createJob);
router.get('/db/jobs/getAll', jobController.getAllJobs);
router.get('/db/jobs/query', jobController.queryJob);

router.get('/db/users/:id', userController.getUserInfo);
router.post('/db/users/update', checkEmail, checkUsername, userController.updateUser);

module.exports = router;
