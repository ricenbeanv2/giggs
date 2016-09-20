const router = require('express').Router();
const applicantController = require('../applicant/applicantCtrl');
const categoryController = require('../category/categoryCtrl');
const jobController = require('../job/jobCtrl');
const userController = require('../user/userCtrl');

router.get('/applicant', applicantController.helloWorld);

router.get('/category', categoryController.helloWorld);

router.get('/db/jobs/create', jobController.helloWorld);
router.get('/db/jobs/getAll', jobController.helloWorld);

router.post('/auth/signup', userController.createUser);
router.get('/auth/signin', userController.authUser);

module.exports = router;
