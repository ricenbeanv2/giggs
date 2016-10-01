const router = require('express').Router();
const applicantController = require('../applicant/applicantCtrl');
const categoryController = require('../category/categoryCtrl');
const jobController = require('../job/jobCtrl');
const userController = require('../user/userCtrl');
const reviewsController = require('../review/reviewCtrl');
const checkEmail = require('../config/middleware').checkEmail;
const checkUsername = require('../config/middleware').checkUsername;
const helper = require('../config/helpers');

router.post('/applicant/apply', helper, applicantController.applyJob);
router.post('/applicant/cancel', helper, applicantController.cancelApplied);
router.post('/applicant/updateBid', helper, applicantController.updateBid);
router.get('/applicant/', applicantController.getApplicants);
router.get('/applicant/getJobs', applicantController.getJobsApplied);
router.get('/applicant/changeStatus', helper, applicantController.statusChange);
<<<<<<< HEAD
router.get('/applicant/getAll', applicantController.getAllApplicants);
=======
router.get('/applicant/queryEntry', helper, applicantController.queryEntry);
>>>>>>> feat/single-job

//router.post('/category/create', helper, categoryController.propagateCategories);
router.get('/category/getAll', categoryController.getAllCategories);
router.get('/category/query', categoryController.queryCategory);
router.get('/category/getParents', categoryController.getParentCategories);

router.post('/jobs/create', helper, jobController.createJob);
router.get('/jobs/getAll', jobController.getAllJobs);
router.get('/jobs/query', jobController.queryJob);

/********** MIND NAMES OF MODELS Employee VS Employer **********/
router.post('/reviews/create', reviewsController.createReview);
router.get('/reviews/getAll', reviewsController.getReviews);
router.get('/reviews/query', reviewsController.queryReview);

router.get('/users/query', helper, userController.getUsers);
router.get('/users/:id', helper, userController.getUserInfo);
router.post('/users/update', helper, checkEmail, checkUsername, userController.updateUser);

module.exports = router;
