const router = require('express').Router();
const applicantController = require('../applicant/applicantCtrl');
const categoryController = require('../category/categoryCtrl');
const jobController = require('../job/jobCtrl');
const userController = require('../user/userCtrl');
const checkUsername = require('./middleware').checkUsername;
const checkEmail = require('./middleware').checkEmail;

router.get('/applicant', applicantController.helloWorld);

router.get('/category', categoryController.createDummyCategories);

router.post('/db/jobs/create', jobController.createJob);
router.get('/db/jobs/getAll', jobController.getAllJobs);
router.get('/db/jobs/query', jobController.queryJobs);

router.post('/auth/signup', checkUsername, checkEmail, userController.signup);
router.get('/auth/signin', userController.signin);

router.get('/db/users/:id', userController.getUserInfo);
router.post('/db/users/update', userController.updateUser);

module.exports = router;
