const router = require('express').Router();
const authPolicy = require('../policies/authPolicy');
const controller = require('../controller/authController');

router.put('/login', controller.login);

router.put('/signup', authPolicy,  controller.signup);

// router.put('/login', controller.login);

module.exports = router;    